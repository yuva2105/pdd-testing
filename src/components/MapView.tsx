import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
export function MapView() {
  return (
    <div className="relative w-full h-full bg-[#1A1A24] overflow-hidden rounded-3xl border border-white/10">
      {/* Simulated Map Background (SVG Pattern) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg">
        
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse">
            
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.5" />
            
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Simulated Roads */}
        <path
          d="M -50 100 Q 150 150 200 300 T 400 400"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.5" />
        
        <path
          d="M 100 -50 Q 120 200 300 250 T 500 100"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3" />
        
        <path
          d="M 0 400 Q 200 350 250 200 T 400 0"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.4" />
        

        {/* Route Line */}
        <motion.path
          d="M 200 300 Q 220 250 250 200"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="10 10"
          initial={{
            strokeDashoffset: 100
          }}
          animate={{
            strokeDashoffset: 0
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }} />
        
      </svg>

      {/* Safe Zone Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-cyan/10 rounded-full border border-brand-cyan/30 animate-pulse-slow"></div>

      {/* User Location Pin */}
      <div className="absolute top-[200px] left-[250px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-cyan rounded-full animate-ping opacity-50"></div>
          <div className="w-6 h-6 bg-brand-cyan rounded-full border-2 border-white shadow-[0_0_15px_rgba(0,240,255,0.6)] flex items-center justify-center z-10 relative">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Destination Pin */}
      <div className="absolute top-[300px] left-[200px] -translate-x-1/2 -translate-y-1/2 text-brand-red">
        <MapPin size={32} fill="#FF2D55" className="drop-shadow-lg" />
      </div>

      {/* Compass/Recenter */}
      <button className="absolute top-4 right-4 w-10 h-10 bg-brand-dark/80 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white/80 shadow-lg">
        <Navigation size={20} className="transform rotate-45" />
      </button>
    </div>);

}