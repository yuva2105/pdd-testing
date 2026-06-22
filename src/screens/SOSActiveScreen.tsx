import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  X,
  Mic,
  Video,
  MapPin,
  PhoneForwarded } from
'lucide-react';
import { useAppStore } from '../store/useAppStore';
export function SOSActiveScreen() {
  const { setScreen, setSOSActive, contacts } = useAppStore();
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  const cancelSOS = () => {
    setSOSActive(false);
    setScreen('Home');
  };
  return (
    <div className="w-full h-full bg-brand-redDark flex flex-col relative overflow-hidden">
      {/* Intense Pulsing Background */}
      <div className="absolute inset-0 bg-brand-red animate-pulse-slow opacity-50"></div>

      <div className="relative z-10 flex flex-col h-full pt-16 pb-10 px-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
            <span className="text-white text-xs font-bold uppercase tracking-wider">
              Live Broadcast
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
            className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(255,255,255,0.5)]">
            
            <AlertTriangle
              size={64}
              className="text-brand-red"
              strokeWidth={2.5} />
            
          </motion.div>

          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">
            SOS Active
          </h1>

          {countdown > 0 ?
          <p className="text-white/90 text-lg mb-8">
              Alerting contacts in{' '}
              <span className="font-bold text-2xl">{countdown}s</span>
            </p> :

          <p className="text-white/90 text-lg mb-8 font-medium">
              Emergency contacts notified.
            </p>
          }

          {/* Active Actions Grid */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-[280px]">
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center gap-2 border border-white/10">
              <Mic size={24} className="text-white animate-pulse" />
              <span className="text-white text-xs font-medium">
                Recording Audio
              </span>
            </div>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center gap-2 border border-white/10">
              <MapPin size={24} className="text-white animate-pulse" />
              <span className="text-white text-xs font-medium">
                Sharing Location
              </span>
            </div>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center gap-2 border border-white/10 col-span-2">
              <PhoneForwarded size={24} className="text-white" />
              <span className="text-white text-xs font-medium">
                Calling 911 in 10s...
              </span>
            </div>
          </div>
        </div>

        {/* Notified Contacts */}
        <div className="mb-8">
          <p className="text-white/70 text-xs font-medium mb-3 uppercase tracking-wider text-center">
            Notifying
          </p>
          <div className="flex justify-center gap-3">
            {contacts.map((contact) =>
            <div key={contact.id} className="relative">
                <img
                src={contact.avatar}
                alt={contact.name}
                className="w-10 h-10 rounded-full border-2 border-white/50 opacity-80" />
              
                {countdown === 0 &&
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-brand-redDark flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">✓</span>
                  </div>
              }
              </div>
            )}
          </div>
        </div>

        {/* Cancel Button */}
        <button
          id="btn-cancel-sos"
          onClick={cancelSOS}
          className="w-full h-16 bg-white text-brand-redDark rounded-2xl font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-xl">
          
          <X size={24} strokeWidth={3} />
          CANCEL SOS
        </button>
      </div>
    </div>);

}