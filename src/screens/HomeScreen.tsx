import React from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  ShieldCheck,
  PhoneCall,
  Timer,
  Car,
  Moon,
  Mic } from
'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { SOSButton } from '../components/SOSButton';
export function HomeScreen() {
  const { contacts, triggerVoiceSOS, setScreen, setTab } = useAppStore();
  const quickActions = [
  {
    icon: PhoneCall,
    label: 'Fake Call',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    action: () => setScreen('FakeCall')
  },
  {
    icon: Timer,
    label: 'Safety Timer',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    action: () => {}
  },
  {
    icon: Car,
    label: 'Track Ride',
    color: 'text-brand-cyan',
    bg: 'bg-brand-cyan/10',
    action: () => {
      setTab('Map');
      setScreen('LiveTracking');
    }
  },
  {
    icon: Moon,
    label: 'Night Mode',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    action: () => {}
  }];

  return (
    <div className="w-full h-full bg-brand-dark overflow-y-auto hide-scrollbar pb-28 pt-14 px-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-violet to-brand-cyan p-[2px]">
            <img
              src="https://i.pravatar.cc/150?u=sarah"
              alt="Profile"
              className="w-full h-full rounded-full border-2 border-brand-dark object-cover" />
            
          </div>
          <div>
            <p className="text-white/50 text-xs font-medium">Good evening,</p>
            <h2 className="text-white font-bold text-lg">Sarah Jenkins</h2>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
          <Bell size={20} className="text-white/80" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-brand-red rounded-full border border-brand-dark"></span>
        </button>
      </div>

      {/* Status Card */}
      <GlassCard className="mb-8 flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-success/20 flex items-center justify-center">
            <ShieldCheck size={20} className="text-brand-success" />
          </div>
          <div>
            <h3 className="text-white font-semibold">You're Safe</h3>
            <p className="text-white/50 text-xs">AI Confidence: 98%</p>
          </div>
        </div>
        <button
          onClick={triggerVoiceSOS}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors">
          
          <Mic size={14} className="text-brand-red" />
          Test Voice
        </button>
      </GlassCard>

      {/* Hero SOS Button */}
      <SOSButton />

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-white/80 font-semibold text-sm mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                onClick={action.action}
                className="flex flex-col items-center gap-2">
                
                <div
                  className={`w-14 h-14 rounded-2xl ${action.bg} flex items-center justify-center border border-white/5`}>
                  
                  <Icon size={24} className={action.color} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-medium text-white/60 text-center leading-tight">
                  {action.label}
                </span>
              </button>);

          })}
        </div>
      </div>

      {/* Emergency Contacts Mini */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white/80 font-semibold text-sm">
            Emergency Contacts
          </h3>
          <button
            onClick={() => {
              setTab('Contacts');
              setScreen('Contacts');
            }}
            className="text-brand-cyan text-xs font-medium">
            
            View All
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {contacts.map((contact) =>
          <div
            key={contact.id}
            className="flex flex-col items-center gap-2 min-w-[70px]">
            
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 p-1">
                <img
                src={contact.avatar}
                alt={contact.name}
                className="w-full h-full rounded-full object-cover" />
              
              </div>
              <span className="text-xs font-medium text-white">
                {contact.name}
              </span>
            </div>
          )}
          <button className="flex flex-col items-center gap-2 min-w-[70px]">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 border-dashed flex items-center justify-center">
              <span className="text-white/40 text-2xl font-light">+</span>
            </div>
            <span className="text-xs font-medium text-white/40">Add</span>
          </button>
        </div>
      </div>
    </div>);

}