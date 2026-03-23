import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const AUTH_URL = 'https://functions.poehali.dev/69f59b1f-0974-467f-bb97-2b8b3e330738';
const TOKEN_KEY = 'messenger_token';

interface User {
  id: number;
  name: string;
  phone: string;
  avatar: string;
  bio: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (phone: string, password: string) => Promise<string | null>;
  register: (name: string, phone: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (!saved) { setLoading(false); return; }
    fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Auth-Token': saved },
      body: JSON.stringify({ action: 'me' }),
    })
      .then((r) => r.json())
      .then((data) => {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;
        if (parsed.id) {
          setUser(parsed);
          setToken(saved);
        } else {
          localStorage.removeItem(TOKEN_KEY);
        }
      })
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  const login = async (phone: string, password: string): Promise<string | null> => {
    const res = await fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', phone, password }),
    });
    const raw = await res.json();
    const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!res.ok) return data.error || 'Ошибка входа';
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem(TOKEN_KEY, data.token);
    return null;
  };

  const register = async (name: string, phone: string, password: string): Promise<string | null> => {
    const res = await fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register', name, phone, password }),
    });
    const raw = await res.json();
    const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!res.ok) return data.error || 'Ошибка регистрации';
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem(TOKEN_KEY, data.token);
    return null;
  };

  const logout = async () => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) {
      await fetch(AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Auth-Token': saved },
        body: JSON.stringify({ action: 'logout' }),
      }).catch(() => {});
    }
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
