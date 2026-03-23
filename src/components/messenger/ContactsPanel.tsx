import { contacts } from '@/data/mockData';
import Icon from '@/components/ui/icon';

export default function ContactsPanel() {
  const grouped = contacts.reduce<Record<string, typeof contacts>>((acc, c) => {
    const letter = c.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(c);
    return acc;
  }, {});

  const letters = Object.keys(grouped).sort();
  const onlineCount = contacts.filter((c) => c.online).length;

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4">
        <h2 className="text-lg font-semibold text-gray-900">Контакты</h2>
        <p className="text-xs text-gray-400 mt-0.5">{onlineCount} в сети · {contacts.length} всего</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {letters.map((letter) => (
          <div key={letter} className="mb-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-1 mb-1">{letter}</p>
            {grouped[letter].map((contact) => (
              <div
                key={contact.id}
                className="flex items-center gap-3 py-2.5 px-2 -mx-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                  <p className="text-xs text-gray-400">
                    {contact.online ? 'В сети' : contact.lastSeen || 'Давно не был'}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                    <Icon name="Phone" size={15} />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                    <Icon name="MessageCircle" size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
          <Icon name="UserPlus" size={15} />
          Добавить контакт
        </button>
      </div>
    </div>
  );
}
