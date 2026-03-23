import { useState } from 'react';
import { chats, contacts } from '@/data/mockData';
import Icon from '@/components/ui/icon';

export default function SearchPanel() {
  const [query, setQuery] = useState('');

  const filteredChats = query.trim()
    ? chats.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    : [];
  const filteredContacts = query.trim()
    ? contacts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const hasResults = filteredChats.length > 0 || filteredContacts.length > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4">
        <h2 className="text-lg font-semibold text-gray-900">Поиск</h2>
      </div>

      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5">
          <Icon name="Search" size={16} className="text-gray-400 flex-shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Люди, сообщения, файлы..."
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
              <Icon name="X" size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {!query && (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <Icon name="Search" size={36} className="text-gray-200 mb-3" />
            <p className="text-sm text-gray-400">Введите имя или ключевое слово</p>
          </div>
        )}

        {query && !hasResults && (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <Icon name="SearchX" size={36} className="text-gray-200 mb-3" />
            <p className="text-sm text-gray-400">Ничего не найдено</p>
          </div>
        )}

        {filteredChats.length > 0 && (
          <div className="mb-4">
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">Чаты</p>
            {filteredChats.map((chat) => (
              <div key={chat.id} className="flex items-center gap-3 py-2.5 border-b border-gray-50 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
                  {chat.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{chat.name}</p>
                  <p className="text-xs text-gray-400 truncate">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredContacts.length > 0 && (
          <div>
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">Контакты</p>
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="flex items-center gap-3 py-2.5 border-b border-gray-50 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                  <p className="text-xs text-gray-400">{contact.phone}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
