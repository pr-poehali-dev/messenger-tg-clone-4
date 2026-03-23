import { useState } from 'react';
import Sidebar from '@/components/messenger/Sidebar';
import ChatList from '@/components/messenger/ChatList';
import ChatWindow from '@/components/messenger/ChatWindow';
import SearchPanel from '@/components/messenger/SearchPanel';
import ContactsPanel from '@/components/messenger/ContactsPanel';
import NotificationsPanel from '@/components/messenger/NotificationsPanel';
import SettingsPanel from '@/components/messenger/SettingsPanel';
import ProfilePanel from '@/components/messenger/ProfilePanel';
import VideoCallModal from '@/components/messenger/VideoCallModal';
import { chats, notifications } from '@/data/mockData';

type Section = 'chats' | 'search' | 'contacts' | 'notifications' | 'settings' | 'profile';

export default function Index() {
  const [section, setSection] = useState<Section>('chats');
  const [activeChatId, setActiveChatId] = useState<string | null>('1');
  const [callModal, setCallModal] = useState<{ mode: 'video' | 'voice'; name: string; avatar: string } | null>(null);

  const activeChat = chats.find((c) => c.id === activeChatId) || null;
  const unreadCount = chats.reduce((acc, c) => acc + c.unread, 0);
  const notifCount = notifications.filter((n) => !n.read).length;

  const handleChatSelect = (id: string) => {
    setActiveChatId(id);
    setSection('chats');
  };

  const openCall = (mode: 'video' | 'voice') => {
    if (!activeChat) return;
    setCallModal({ mode, name: activeChat.name, avatar: activeChat.avatar });
  };

  const renderLeftPanel = () => {
    switch (section) {
      case 'chats':
        return <ChatList chats={chats} activeId={activeChatId} onSelect={handleChatSelect} />;
      case 'search':
        return <SearchPanel />;
      case 'contacts':
        return <ContactsPanel />;
      case 'notifications':
        return <NotificationsPanel />;
      case 'settings':
        return <SettingsPanel />;
      case 'profile':
        return <ProfilePanel />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden font-golos">
      <Sidebar
        active={section}
        onSelect={setSection}
        unreadCount={unreadCount}
        notifCount={notifCount}
      />

      <div className="w-72 flex-shrink-0 h-full bg-white border-r border-gray-100 overflow-hidden">
        {renderLeftPanel()}
      </div>

      <div className="flex-1 h-full overflow-hidden">
        {activeChat && section === 'chats' ? (
          <ChatWindow
            chat={activeChat}
            onVideoCall={() => openCall('video')}
            onVoiceCall={() => openCall('voice')}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center select-none">
            <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mb-4">
              <span className="text-3xl">💬</span>
            </div>
            <h3 className="text-base font-medium text-gray-700">Выберите чат</h3>
            <p className="text-sm text-gray-400 mt-1">Откройте диалог из списка слева</p>
          </div>
        )}
      </div>

      {callModal && (
        <VideoCallModal
          name={callModal.name}
          avatar={callModal.avatar}
          mode={callModal.mode}
          onClose={() => setCallModal(null)}
        />
      )}
    </div>
  );
}
