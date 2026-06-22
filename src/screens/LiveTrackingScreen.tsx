import React from 'react';
import { MapView } from '../components/MapView';
import { GlassCard } from '../components/GlassCard';
import { Share2, Shield, AlertCircle } from 'lucide-react';
export function LiveTrackingScreen() {
  return (
    <div className="w-full h-full bg-brand-dark flex flex-col relative">
      {/* Full Screen Map */}
      <div className="absolute inset-0 z-0">
        <MapView />
      </div>

      {/* Top Overlay */}
      <div className="relative z-10 pt-14 px-5 flex justify-between items-start pointer-events-none">
        <GlassCard
          strong
          className="py-2 px-4 rounded-full flex items-center gap-2 pointer-events-auto">
          
          <div className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium">Live Tracking</span>
        </GlassCard>

        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center pointer-events-auto">
          <Share2 size={18} className="text-white" />
        </button>
      </div>

      {/* Bottom Overlay Card */}
      <div className="relative z-10 mt-auto px-5 pb-28 pointer-events-none">
        <GlassCard strong className="pointer-events-auto w-full">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-white font-bold text-lg">Heading Home</h3>
              <p className="text-white/60 text-sm">ETA: 14 mins • 2.4 miles</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-brand-cyan/20 flex items-center justify-center border border-brand-cyan/30">
              <Shield size={24} className="text-brand-cyan" />
            </div>
          </div>

          <div className="h-px w-full bg-white/10 mb-4"></div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex -space-x-2">
              <img
                src="https://i.pravatar.cc/150?u=mom"
                className="w-8 h-8 rounded-full border-2 border-[#1A1A24]"
                alt="Mom" />
              
              <img
                src="https://i.pravatar.cc/150?u=david"
                className="w-8 h-8 rounded-full border-2 border-[#1A1A24]"
                alt="David" />
              
            </div>
            <span className="text-white/70 text-xs">Following your route</span>
          </div>

          <button className="w-full h-12 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-white font-medium transition-colors">
            <AlertCircle size={18} className="text-brand-warning" />
            Report Issue
          </button>
        </GlassCard>
      </div>
    </div>);

}