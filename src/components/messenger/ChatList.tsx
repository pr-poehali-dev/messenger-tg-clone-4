import { Chat } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface ChatListProps {
  chats: Chat[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function ChatList({ chats, activeId, onSelect }: ChatListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4">
        <h2 className="text-lg font-semibold text-gray-900">Чаты</h2>
        <p className="text-xs text-gray-400 mt-0.5">{chats.length} диалогов</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-all text-left border-b border-gray-50
              ${activeId === chat.id ? 'bg-gray-50' : 'hover:bg-gray-50/70'}`}
          >
            <div className="relative flex-shrink-0">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold
                ${activeId === chat.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {chat.avatar}
              </div>
              {chat.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 truncate">{chat.name}</span>
                <span className="text-[11px] text-gray-400 ml-2 flex-shrink-0">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs text-gray-400 truncate flex items-center gap-1">
                  {chat.messages[chat.messages.length - 1]?.type === 'voice' && (
                    <Icon name="Mic" size={11} />
                  )}
                  {chat.lastMessage || 'Голосовое сообщение'}
                </span>
                {chat.unread > 0 && (
                  <span className="ml-2 w-5 h-5 bg-gray-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors">
          <Icon name="Plus" size={16} />
          Новый чат
        </button>
      </div>
    </div>
  );
}
