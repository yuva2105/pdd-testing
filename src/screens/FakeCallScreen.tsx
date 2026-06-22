import React, { useEffect, useState } from 'react';
import { Phone, MessageCircle, Clock, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
export function FakeCallScreen() {
  const setScreen = useAppStore((state) => state.setScreen);
  const [callState, setCallState] = useState<'incoming' | 'active'>('incoming');
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === 'active') {
      timer = setInterval(() => setDuration((d) => d + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };
  const endCall = () => {
    setScreen('Home');
  };
  return (
    <div className="w-full h-full bg-[#1C1C1E] flex flex-col items-center pt-20 pb-16 px-6 relative overflow-hidden">
      {/* Simulated iOS Call Background Blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2C2C2E] to-[#1C1C1E] opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <h2 className="text-white/70 text-xl mb-2">
          {callState === 'incoming' ? 'mobile' : formatTime(duration)}
        </h2>
        <h1 className="text-white text-4xl font-normal mb-16">Mom</h1>

        {callState === 'incoming' ?
        <div className="w-full flex justify-between px-8 mt-auto absolute bottom-24">
            <button
            onClick={endCall}
            className="flex flex-col items-center gap-2">
            
              <div className="w-[72px] h-[72px] rounded-full bg-[#FF3B30] flex items-center justify-center">
                <Phone
                size={32}
                className="text-white transform rotate-[135deg]"
                fill="currentColor" />
              
              </div>
              <span className="text-white text-sm">Decline</span>
            </button>
            <button
            onClick={() => setCallState('active')}
            className="flex flex-col items-center gap-2">
            
              <div className="w-[72px] h-[72px] rounded-full bg-[#34C759] flex items-center justify-center animate-pulse">
                <Phone size={32} className="text-white" fill="currentColor" />
              </div>
              <span className="text-white text-sm">Accept</span>
            </button>
          </div> :

        <div className="w-full flex flex-col items-center mt-auto absolute bottom-12">
            <div className="grid grid-cols-3 gap-x-8 gap-y-6 mb-12">
              {[
            {
              icon: Mic,
              label: 'mute'
            },
            {
              icon: Clock,
              label: 'keypad'
            },
            {
              icon: MessageCircle,
              label: 'audio'
            },
            {
              icon: Plus,
              label: 'add call'
            },
            {
              icon: Video,
              label: 'FaceTime'
            },
            {
              icon: User,
              label: 'contacts'
            }].
            map((btn, i) =>
            <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white/80 rounded-sm"></div>{' '}
                    {/* Placeholder for icons */}
                  </div>
                  <span className="text-white/80 text-xs">{btn.label}</span>
                </div>
            )}
            </div>
            <button
            onClick={endCall}
            className="w-[72px] h-[72px] rounded-full bg-[#FF3B30] flex items-center justify-center">
            
              <Phone
              size={32}
              className="text-white transform rotate-[135deg]"
              fill="currentColor" />
            
            </button>
          </div>
        }
      </div>
    </div>);

}
// Dummy imports for the grid above
import { Mic, Video, User, Plus } from 'lucide-react';