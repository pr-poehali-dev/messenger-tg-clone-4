import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface ToggleItem {
  id: string;
  label: string;
  description: string;
  value: boolean;
}

export default function SettingsPanel() {
  const [toggles, setToggles] = useState<ToggleItem[]>([
    { id: 'notif', label: 'Push-уведомления', description: 'Получать уведомления о новых сообщениях', value: true },
    { id: 'sound', label: 'Звук сообщений', description: 'Воспроизводить звук при получении', value: true },
    { id: 'readReceipts', label: 'Отчёты о прочтении', description: 'Показывать когда вы прочитали сообщение', value: true },
    { id: 'onlineStatus', label: 'Статус в сети', description: 'Показывать когда вы онлайн', value: false },
    { id: 'autoDownload', label: 'Авто-загрузка медиа', description: 'Загружать фото и видео автоматически', value: false },
  ]);

  const toggle = (id: string) =>
    setToggles((prev) => prev.map((t) => t.id === id ? { ...t, value: !t.value } : t));

  const sections = [
    {
      title: 'Конфиденциальность',
      items: ['notif', 'readReceipts', 'onlineStatus'],
    },
    {
      title: 'Медиа и звук',
      items: ['sound', 'autoDownload'],
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4">
        <h2 className="text-lg font-semibold text-gray-900">Настройки</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-5">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
              {section.title}
            </p>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {section.items.map((id, i) => {
                const item = toggles.find((t) => t.id === id)!;
                return (
                  <div
                    key={id}
                    className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? 'border-t border-gray-50' : ''}`}
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                    </div>
                    <button
                      onClick={() => toggle(id)}
                      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0
                        ${item.value ? 'bg-gray-900' : 'bg-gray-200'}`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform
                          ${item.value ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">Аккаунт</p>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {[
              { icon: 'Lock', label: 'Сменить пароль' },
              { icon: 'Smartphone', label: 'Связанные устройства' },
              { icon: 'Download', label: 'Экспорт данных' },
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
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-red-100 text-red-400 text-sm hover:bg-red-50 transition-colors">
          <Icon name="LogOut" size={15} />
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
