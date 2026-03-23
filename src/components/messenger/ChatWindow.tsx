import { useState, useRef, useEffect } from 'react';
import { Chat, Message } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface ChatWindowProps {
  chat: Chat;
  onVideoCall: () => void;
  onVoiceCall: () => void;
}

function VoiceMessage({ duration }: { duration?: string }) {
  const [playing, setPlaying] = useState(false);
  const bars = [3, 5, 8, 6, 4, 7, 5, 3, 6, 8, 4, 5, 7, 3, 6];

  return (
    <div className="flex items-center gap-2 py-1 px-1">
      <button
        onClick={() => setPlaying(!playing)}
        className="w-8 h-8 rounded-full bg-current/10 flex items-center justify-center flex-shrink-0 hover:bg-current/20 transition-colors"
      >
        <Icon name={playing ? 'Pause' : 'Play'} size={14} />
      </button>
      <div className="flex items-end gap-0.5 h-6">
        {bars.map((h, i) => (
          <div
            key={i}
            style={{ height: `${h * 2}px` }}
            className={`w-0.5 rounded-full transition-all ${playing ? 'bg-blue-400' : 'bg-current/30'}`}
          />
        ))}
      </div>
      <span className="text-[11px] text-current/50 font-mono">{duration || '0:00'}</span>
    </div>
  );
}

export default function ChatWindow({ chat, onVideoCall, onVoiceCall }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat.id, chat.messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      text: input,
      time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      type: 'text',
      read: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendVoice = () => {
    if (isRecording) {
      const newMsg: Message = {
        id: Date.now().toString(),
        text: '',
        time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        type: 'voice',
        duration: '0:05',
        read: false,
      };
      setMessages((prev) => [...prev, newMsg]);
      setIsRecording(false);
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 bg-white">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
            {chat.avatar}
          </div>
          {chat.online && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">{chat.name}</p>
          <p className="text-xs text-gray-400">{chat.online ? 'В сети' : 'Не в сети'}</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onVoiceCall}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
            title="Голосовой звонок"
          >
            <Icon name="Phone" size={18} />
          </button>
          <button
            onClick={onVideoCall}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
            title="Видеозвонок"
          >
            <Icon name="Video" size={18} />
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all">
            <Icon name="MoreVertical" size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
        {messages.map((msg, i) => {
          const showDate = i === 0;
          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex justify-center mb-3">
                  <span className="text-[11px] text-gray-400 bg-gray-50 px-3 py-1 rounded-full">Сегодня</span>
                </div>
              )}
              <div className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                    ${msg.isOwn
                      ? 'bg-gray-900 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}
                >
                  {msg.type === 'voice' ? (
                    <VoiceMessage duration={msg.duration} />
                  ) : (
                    <p>{msg.text}</p>
                  )}
                  <div className={`flex items-center gap-1 mt-1 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <span className={`text-[10px] ${msg.isOwn ? 'text-gray-400' : 'text-gray-400'}`}>
                      {msg.time}
                    </span>
                    {msg.isOwn && (
                      <Icon name={msg.read ? 'CheckCheck' : 'Check'} size={12} className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-5 py-4 border-t border-gray-100 bg-white">
        {isRecording && (
          <div className="flex items-center gap-2 mb-2 text-red-500 text-xs font-medium animate-pulse">
            <Icon name="Mic" size={13} />
            Идёт запись...
          </div>
        )}
        <div className="flex items-end gap-2">
          <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 flex-shrink-0 transition-colors">
            <Icon name="Paperclip" size={18} />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Написать сообщение..."
              rows={1}
              className="w-full resize-none bg-gray-100 rounded-2xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:bg-gray-200/60 transition-colors max-h-32 leading-relaxed"
              style={{ height: 'auto' }}
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = 'auto';
                t.style.height = Math.min(t.scrollHeight, 128) + 'px';
              }}
            />
          </div>
          <button
            onClick={sendVoice}
            className={`w-9 h-9 flex items-center justify-center flex-shrink-0 rounded-xl transition-all
              ${isRecording ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Icon name="Mic" size={18} />
          </button>
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center flex-shrink-0 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Icon name="Send" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
