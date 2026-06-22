import React from 'react';
import { Settings, Edit3, Shield, Clock, HeartPulse } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
export function ProfileScreen() {
  const setScreen = useAppStore((state) => state.setScreen);
  return (
    <div className="w-full h-full bg-brand-dark overflow-y-auto hide-scrollbar pb-28 pt-14 px-5">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <button
          onClick={() => setScreen('Settings')}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white">
          
          <Settings size={20} />
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-violet to-brand-cyan p-1">
            <img
              src="https://i.pravatar.cc/150?u=sarah"
              alt="Profile"
              className="w-full h-full rounded-full border-4 border-brand-dark object-cover" />
            
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-brand-cyan rounded-full flex items-center justify-center border-2 border-brand-dark text-brand-dark">
            <Edit3 size={14} strokeWidth={3} />
          </button>
        </div>
        <h2 className="text-xl font-bold text-white">Sarah Jenkins</h2>
        <p className="text-white/50 text-sm">sarah@example.com</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <GlassCard className="p-4 flex flex-col items-center text-center">
          <Shield size={24} className="text-brand-success mb-2" />
          <span className="text-2xl font-bold text-white mb-1">142</span>
          <span className="text-white/50 text-xs">Days Protected</span>
        </GlassCard>
        <GlassCard
          className="p-4 flex flex-col items-center text-center"
          onClick={() => setScreen('History')}>
          
          <Clock size={24} className="text-brand-cyan mb-2" />
          <span className="text-2xl font-bold text-white mb-1">12</span>
          <span className="text-white/50 text-xs">Safety Events</span>
        </GlassCard>
      </div>

      {/* Medical ID */}
      <h3 className="text-white/80 font-semibold text-sm mb-4">Medical ID</h3>
      <GlassCard className="p-5 border-brand-red/20 bg-gradient-to-br from-white/5 to-brand-red/5">
        <div className="flex items-center gap-3 mb-4">
          <HeartPulse size={20} className="text-brand-red" />
          <span className="text-white font-semibold">Emergency Info</span>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-4">
          <div>
            <p className="text-white/40 text-xs mb-1">Blood Type</p>
            <p className="text-white font-medium">O Positive</p>
          </div>
          <div>
            <p className="text-white/40 text-xs mb-1">Allergies</p>
            <p className="text-white font-medium">Penicillin</p>
          </div>
          <div className="col-span-2">
            <p className="text-white/40 text-xs mb-1">Medical Conditions</p>
            <p className="text-white font-medium">Asthma</p>
          </div>
        </div>
      </GlassCard>
    </div>);

}