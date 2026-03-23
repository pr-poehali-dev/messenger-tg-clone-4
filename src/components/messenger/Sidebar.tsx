import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';

type Section = 'chats' | 'search' | 'contacts' | 'notifications' | 'settings' | 'profile';

interface SidebarProps {
  active: Section;
  onSelect: (s: Section) => void;
  unreadCount: number;
  notifCount: number;
}

const navItems: { id: Section; icon: string; label: string }[] = [
  { id: 'chats', icon: 'MessageCircle', label: 'Чаты' },
  { id: 'search', icon: 'Search', label: 'Поиск' },
  { id: 'contacts', icon: 'Users', label: 'Контакты' },
  { id: 'notifications', icon: 'Bell', label: 'Уведомления' },
  { id: 'settings', icon: 'Settings', label: 'Настройки' },
];

export default function Sidebar({ active, onSelect, unreadCount, notifCount }: SidebarProps) {
  const { user } = useAuth();
  return (
    <aside className="flex flex-col items-center w-16 h-full bg-white border-r border-gray-100 py-5 gap-1">
      <button
        onClick={() => onSelect('profile')}
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-4 transition-all
          ${active === 'profile' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
      >
        {user?.avatar || 'ЮП'}
      </button>

      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          title={item.label}
          className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all group
            ${active === item.id
              ? 'bg-gray-900 text-white shadow-sm'
              : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'
            }`}
        >
          <Icon name={item.icon} size={20} />
          {item.id === 'chats' && unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          {item.id === 'notifications' && notifCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-400 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {notifCount}
            </span>
          )}
        </button>
      ))}
    </aside>
  );
}