import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Icon from '@/components/ui/icon';

type Mode = 'login' | 'register';

export default function AuthPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const switchMode = (m: Mode) => {
    setMode(m);
    setError('');
    setName('');
    setPassword('');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const err = mode === 'login'
      ? await login(phone, password)
      : await register(name, phone, password);
    setLoading(false);
    if (err) setError(err);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-golos">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center mb-4 shadow-lg">
            <Icon name="MessageCircle" size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Мессенджер</h1>
          <p className="text-sm text-gray-400 mt-1">Простое и безопасное общение</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          {(['login', 'register'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all
                ${mode === m ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {m === 'login' ? 'Войти' : 'Регистрация'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-3">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Имя и фамилия</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван Иванов"
                required
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Номер телефона</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 900 000-00-00"
              required
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Пароль</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'register' ? 'Минимум 6 символов' : '••••••••'}
                required
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon name={showPass ? 'EyeOff' : 'Eye'} size={16} />
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-500">
              <Icon name="AlertCircle" size={15} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                {mode === 'login' ? 'Входим...' : 'Регистрируем...'}
              </>
            ) : (
              mode === 'login' ? 'Войти' : 'Создать аккаунт'
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          {mode === 'login' ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <button
            onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
            className="text-gray-700 font-medium hover:underline"
          >
            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>
      </div>
    </div>
  );
}
