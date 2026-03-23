CREATE TABLE t_p6059485_messenger_tg_clone_4.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    bio VARCHAR(200) DEFAULT 'Доступен для звонков',
    avatar VARCHAR(4) DEFAULT '',
    online BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    last_seen TIMESTAMP DEFAULT NOW()
);

CREATE TABLE t_p6059485_messenger_tg_clone_4.sessions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES t_p6059485_messenger_tg_clone_4.users(id),
    token VARCHAR(64) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '30 days'
);
