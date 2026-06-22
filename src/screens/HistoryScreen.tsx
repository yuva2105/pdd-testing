import React from 'react';
import { ChevronLeft, MapPin, PhoneCall, ShieldAlert } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
export function HistoryScreen() {
  const setScreen = useAppStore((state) => state.setScreen);
  const events = [
  {
    id: 1,
    type: 'safe',
    title: 'Arrived Home Safely',
    time: 'Today, 8:45 PM',
    location: 'Downtown Route',
    icon: MapPin,
    color: 'text-brand-success',
    bg: 'bg-brand-success/10'
  },
  {
    id: 2,
    type: 'fake_call',
    title: 'Fake Call Activated',
    time: 'Yesterday, 11:20 PM',
    location: 'Subway Station',
    icon: PhoneCall,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  },
  {
    id: 3,
    type: 'threat',
    title: 'Elevated Threat Detected',
    time: 'Oct 12, 10:15 PM',
    location: 'Main St. Alley',
    icon: ShieldAlert,
    color: 'text-brand-warning',
    bg: 'bg-brand-warning/10'
  }];

  return (
    <div className="w-full h-full bg-brand-dark overflow-y-auto hide-scrollbar pb-10 pt-14 px-5">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setScreen('Profile')}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white">
          
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-white">Safety History</h1>
      </div>

      <div className="relative border-l-2 border-white/10 ml-5 pl-6 flex flex-col gap-8">
        {events.map((event) => {
          const Icon = event.icon;
          return (
            <div key={event.id} className="relative">
              {/* Timeline Dot */}
              <div
                className={`absolute -left-[35px] top-1 w-4 h-4 rounded-full ${event.bg} border-2 border-brand-dark flex items-center justify-center`}>
                
                <div
                  className={`w-2 h-2 rounded-full bg-current ${event.color}`}>
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-semibold text-sm">
                    {event.title}
                  </h3>
                  <Icon size={16} className={event.color} />
                </div>
                <p className="text-white/50 text-xs mb-1">{event.time}</p>
                <p className="text-white/40 text-xs flex items-center gap-1">
                  <MapPin size={10} /> {event.location}
                </p>
              </div>
            </div>);

        })}
      </div>
    </div>);

}