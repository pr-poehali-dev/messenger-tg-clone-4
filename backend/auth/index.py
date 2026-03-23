"""
Аутентификация пользователей: регистрация, вход, выход, получение профиля.
Роутинг через поле action в теле запроса: register, login, me, logout.
"""
import json
import os
import hashlib
import secrets
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p6059485_messenger_tg_clone_4')
CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
}


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def make_avatar(name: str) -> str:
    parts = name.strip().split()
    if len(parts) >= 2:
        return (parts[0][0] + parts[1][0]).upper()
    return name[:2].upper()


def r(status, data):
    return {'statusCode': status, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    headers = event.get('headers', {}) or {}
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
    body = json.loads(event.get('body') or '{}')
    action = body.get('action', '')

    conn = get_conn()
    cur = conn.cursor()

    try:
        if action == 'register':
            name = body.get('name', '').strip()
            phone = body.get('phone', '').strip()
            password = body.get('password', '')
            if not name or not phone or not password:
                return r(400, {'error': 'Заполните все поля'})
            if len(password) < 6:
                return r(400, {'error': 'Пароль минимум 6 символов'})
            cur.execute(f"SELECT id FROM {SCHEMA}.users WHERE phone = %s", (phone,))
            if cur.fetchone():
                return r(409, {'error': 'Номер телефона уже зарегистрирован'})
            avatar = make_avatar(name)
            cur.execute(
                f"INSERT INTO {SCHEMA}.users (name, phone, password_hash, avatar) VALUES (%s, %s, %s, %s) RETURNING id",
                (name, phone, hash_password(password), avatar)
            )
            user_id = cur.fetchone()[0]
            session_token = secrets.token_hex(32)
            cur.execute(f"INSERT INTO {SCHEMA}.sessions (user_id, token) VALUES (%s, %s)", (user_id, session_token))
            conn.commit()
            return r(201, {'token': session_token, 'user': {'id': user_id, 'name': name, 'phone': phone, 'avatar': avatar, 'bio': 'Доступен для звонков'}})

        if action == 'login':
            phone = body.get('phone', '').strip()
            password = body.get('password', '')
            cur.execute(
                f"SELECT id, name, phone, avatar, bio FROM {SCHEMA}.users WHERE phone = %s AND password_hash = %s",
                (phone, hash_password(password))
            )
            row = cur.fetchone()
            if not row:
                return r(401, {'error': 'Неверный номер или пароль'})
            user_id, name, uphone, avatar, bio = row
            session_token = secrets.token_hex(32)
            cur.execute(f"INSERT INTO {SCHEMA}.sessions (user_id, token) VALUES (%s, %s)", (user_id, session_token))
            cur.execute(f"UPDATE {SCHEMA}.users SET online = TRUE, last_seen = NOW() WHERE id = %s", (user_id,))
            conn.commit()
            return r(200, {'token': session_token, 'user': {'id': user_id, 'name': name, 'phone': uphone, 'avatar': avatar, 'bio': bio}})

        if action == 'me':
            if not token:
                return r(401, {'error': 'Требуется авторизация'})
            cur.execute(
                f"SELECT u.id, u.name, u.phone, u.avatar, u.bio FROM {SCHEMA}.sessions s JOIN {SCHEMA}.users u ON u.id = s.user_id WHERE s.token = %s AND s.expires_at > NOW()",
                (token,)
            )
            row = cur.fetchone()
            if not row:
                return r(401, {'error': 'Сессия не найдена или истекла'})
            uid, name, phone, avatar, bio = row
            return r(200, {'id': uid, 'name': name, 'phone': phone, 'avatar': avatar, 'bio': bio})

        if action == 'logout':
            if token:
                cur.execute(
                    f"UPDATE {SCHEMA}.users SET online = FALSE WHERE id = (SELECT user_id FROM {SCHEMA}.sessions WHERE token = %s)",
                    (token,)
                )
                cur.execute(f"DELETE FROM {SCHEMA}.sessions WHERE token = %s", (token,))
                conn.commit()
            return r(200, {'ok': True})

        return r(400, {'error': 'Неизвестное действие'})

    finally:
        cur.close()
        conn.close()