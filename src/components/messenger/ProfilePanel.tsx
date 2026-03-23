import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePanel() {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || 'Доступен для звонков');
  const phone = user?.phone || '';

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Профиль</h2>
        <button
          onClick={() => setEditing(!editing)}
          className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
        >
          <Icon name={editing ? 'Check' : 'Pencil'} size={14} />
          {editing ? 'Готово' : 'Изменить'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {/* Avatar */}
        <div className="flex flex-col items-center py-6 mb-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center text-3xl font-semibold text-white shadow-lg">
              ЮП
            </div>
            {editing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                <Icon name="Camera" size={14} className="text-gray-600" />
              </button>
            )}
          </div>

          {editing ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-4 text-center text-lg font-semibold text-gray-900 bg-gray-100 rounded-xl px-3 py-1.5 outline-none focus:bg-gray-200/70 transition-colors"
            />
          ) : (
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{name}</h3>
          )}

          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-gray-400">В сети</span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-4 py-3.5">
              <p className="text-[11px] font-medium text-gray-400 mb-1">О себе</p>
              {editing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full text-sm text-gray-900 bg-gray-100 rounded-lg px-3 py-2 outline-none resize-none"
                  rows={2}
                />
              ) : (
                <p className="text-sm text-gray-700">{bio}</p>
              )}
            </div>
            <div className="px-4 py-3.5 border-t border-gray-50">
              <p className="text-[11px] font-medium text-gray-400 mb-1">Телефон</p>
              <p className="text-sm text-gray-700">{phone}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Чатов', value: '5' },
              { label: 'Контактов', value: '8' },
              { label: 'В сети', value: '4' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 px-3 py-4 text-center">
                <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {[
              { icon: 'Bell', label: 'Мои уведомления' },
              { icon: 'Shield', label: 'Конфиденциальность' },
              { icon: 'Palette', label: 'Внешний вид' },
            ].map((item, i) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors text-left
                  ${i > 0 ? 'border-t border-gray-50' : ''}`}
              >
                <Icon name={item.icon} size={16} className="text-gray-400" />
                <span className="text-sm text-gray-700">{item.label}</span>
                <Icon name="ChevronRight" size={14} className="text-gray-300 ml-auto" />
              </button>
            ))}
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-red-100 text-red-400 text-sm hover:bg-red-50 transition-colors"
          >
            <Icon name="LogOut" size={15} />
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
}