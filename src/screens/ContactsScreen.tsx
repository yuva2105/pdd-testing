import React from 'react';
import { Plus, Phone, MessageCircle, MoreVertical } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
export function ContactsScreen() {
  const contacts = useAppStore((state) => state.contacts);
  return (
    <div className="w-full h-full bg-brand-dark overflow-y-auto hide-scrollbar pb-28 pt-14 px-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Trusted Contacts</h1>
        <button className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center shadow-[0_0_15px_rgba(255,45,85,0.4)]">
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </div>

      <p className="text-white/50 text-sm mb-6">
        These contacts will be notified instantly with your location and audio
        feed if you trigger an SOS.
      </p>

      <div className="flex flex-col gap-4">
        {contacts.map((contact) =>
        <GlassCard
          key={contact.id}
          className="p-4 flex items-center justify-between">
          
            <div className="flex items-center gap-3">
              <img
              src={contact.avatar}
              alt={contact.name}
              className="w-12 h-12 rounded-full object-cover border border-white/10" />
            
              <div>
                <h3 className="text-white font-semibold">{contact.name}</h3>
                <p className="text-white/50 text-xs">
                  {contact.relation} • {contact.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors">
                <MessageCircle size={14} />
              </button>
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors">
                <Phone size={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-white/40">
                <MoreVertical size={18} />
              </button>
            </div>
          </GlassCard>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-white/80 font-semibold text-sm mb-4">
          Emergency Services
        </h2>
        <GlassCard className="p-4 flex items-center justify-between border-brand-red/30 bg-brand-red/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-red/20 flex items-center justify-center border border-brand-red/30">
              <Phone size={20} className="text-brand-red" />
            </div>
            <div>
              <h3 className="text-brand-red font-bold">911</h3>
              <p className="text-white/50 text-xs">National Emergency Number</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>);

}