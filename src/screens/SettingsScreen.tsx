import React, { useState } from 'react';
import {
  ChevronLeft,
  Bell,
  Lock,
  Mic,
  Moon,
  LogOut,
  ChevronRight } from
'lucide-react';
import { useAppStore } from '../store/useAppStore';
export function SettingsScreen() {
  const { setScreen, setAuthenticated } = useAppStore();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [nightMode, setNightMode] = useState(false);
  const handleLogout = () => {
    setAuthenticated(false);
    setScreen('Auth');
  };
  const Toggle = ({
    enabled,
    onChange



  }: {enabled: boolean;onChange: (v: boolean) => void;}) =>
  <button
    onClick={() => onChange(!enabled)}
    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${enabled ? 'bg-brand-cyan' : 'bg-white/20'}`}>
    
      <div
      className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ease-in-out ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
    
    </button>;

  const SettingRow = ({ icon: Icon, label, value, onClick, toggle }: any) =>
  <div
    className="flex items-center justify-between py-4 border-b border-white/5"
    onClick={onClick}>
    
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
          <Icon size={16} className="text-white/70" />
        </div>
        <span className="text-white font-medium">{label}</span>
      </div>
      {toggle ?
    <Toggle enabled={toggle.value} onChange={toggle.onChange} /> :

    <div className="flex items-center gap-2 text-white/40">
          {value && <span className="text-sm">{value}</span>}
          <ChevronRight size={16} />
        </div>
    }
    </div>;

  return (
    <div className="w-full h-full bg-brand-dark overflow-y-auto hide-scrollbar pb-10 pt-14 px-5">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setScreen('Profile')}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white">
          
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </div>

      <div className="mb-8">
        <h2 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2 px-2">
          Preferences
        </h2>
        <div className="bg-white/[0.02] rounded-3xl px-4 border border-white/5">
          <SettingRow
            icon={Mic}
            label="Voice Triggers"
            toggle={{
              value: voiceEnabled,
              onChange: setVoiceEnabled
            }} />
          
          <SettingRow
            icon={Moon}
            label="Night Travel Mode"
            toggle={{
              value: nightMode,
              onChange: setNightMode
            }} />
          
          <SettingRow icon={Bell} label="Notifications" value="Enabled" />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2 px-2">
          Account & Security
        </h2>
        <div className="bg-white/[0.02] rounded-3xl px-4 border border-white/5">
          <SettingRow icon={Lock} label="Privacy & Data" />
          <SettingRow icon={Lock} label="Change Password" />
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full h-14 bg-white/5 hover:bg-white/10 text-brand-red rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors border border-white/5">
        
        <LogOut size={20} />
        Log Out
      </button>
    </div>);

}