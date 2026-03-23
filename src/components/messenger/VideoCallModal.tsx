import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface VideoCallModalProps {
  name: string;
  avatar: string;
  onClose: () => void;
  mode: 'video' | 'voice';
}

export default function VideoCallModal({ name, avatar, onClose, mode }: VideoCallModalProps) {
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [status, setStatus] = useState<'calling' | 'connected'>('calling');

  useEffect(() => {
    const t = setTimeout(() => setStatus('connected'), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (status !== 'connected') return;
    const interval = setInterval(() => setDuration((d) => d + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-gray-950 rounded-3xl overflow-hidden shadow-2xl">
        {/* Video area */}
        <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center relative">
          {mode === 'video' && !videoOff ? (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-gray-600 text-xs flex flex-col items-center gap-2">
                <Icon name="VideoOff" size={32} className="text-gray-600" />
                <span>Предпросмотр камеры</span>
              </div>
            </div>
          ) : null}

          <div className="z-10 flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-semibold text-white shadow-xl">
              {avatar}
            </div>
            <p className="text-white text-xl font-medium">{name}</p>
            <p className="text-gray-400 text-sm">
              {status === 'calling' ? (
                <span className="animate-pulse">Вызов...</span>
              ) : (
                formatDuration(duration)
              )}
            </p>
          </div>

          {/* Self-preview for video */}
          {mode === 'video' && status === 'connected' && (
            <div className="absolute bottom-3 right-3 w-24 aspect-[3/4] bg-gray-700 rounded-xl border border-gray-600 flex items-center justify-center">
              <span className="text-gray-500 text-xs">Вы</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-gray-900 px-6 py-5 flex items-center justify-center gap-4">
          <button
            onClick={() => setMuted(!muted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all
              ${muted ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            <Icon name={muted ? 'MicOff' : 'Mic'} size={20} />
          </button>

          {mode === 'video' && (
            <button
              onClick={() => setVideoOff(!videoOff)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all
                ${videoOff ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              <Icon name={videoOff ? 'VideoOff' : 'Video'} size={20} />
            </button>
          )}

          <button
            onClick={onClose}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-lg shadow-red-500/30"
          >
            <Icon name="PhoneOff" size={22} />
          </button>

          <button className="w-12 h-12 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 flex items-center justify-center transition-all">
            <Icon name="Volume2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
