import { useState } from 'react';
import { notifications as initialNotifs, Notification } from '@/data/mockData';
import Icon from '@/components/ui/icon';

const typeIcon: Record<Notification['type'], string> = {
  message: 'MessageCircle',
  call: 'Phone',
  mention: 'AtSign',
};

const typeColor: Record<Notification['type'], string> = {
  message: 'text-blue-500',
  call: 'text-green-500',
  mention: 'text-orange-500',
};

export default function NotificationsPanel() {
  const [notifs, setNotifs] = useState(initialNotifs);
  const unread = notifs.filter((n) => !n.read).length;

  const markAll = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const markOne = (id: string) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Уведомления</h2>
          {unread > 0 && <p className="text-xs text-gray-400 mt-0.5">{unread} непрочитанных</p>}
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="text-xs text-gray-400 hover:text-gray-700 transition-colors mt-1">
            Отметить все
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {notifs.map((notif) => (
          <div
            key={notif.id}
            onClick={() => markOne(notif.id)}
            className={`flex items-start gap-3 px-4 py-3.5 border-b border-gray-50 cursor-pointer transition-colors hover:bg-gray-50/70
              ${!notif.read ? 'bg-blue-50/40' : ''}`}
          >
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
                {notif.avatar}
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm`}>
                <Icon name={typeIcon[notif.type]} size={11} className={typeColor[notif.type]} />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{notif.from}</p>
                <span className="text-[11px] text-gray-400">{notif.time}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{notif.text}</p>
            </div>

            {!notif.read && (
              <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
