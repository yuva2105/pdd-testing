import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
export function SOSButton() {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const controls = useAnimation();
  const { setScreen, setSOSActive } = useAppStore();
  const HOLD_DURATION = 2000; // 2 seconds to activate
  const startPress = () => {
    setIsPressing(true);
    controls.start({
      scale: 0.95
    });
    let currentProgress = 0;
    progressInterval.current = setInterval(() => {
      currentProgress += 50;
      setProgress(Math.min(currentProgress / HOLD_DURATION * 100, 100));
    }, 50);
    pressTimer.current = setTimeout(() => {
      triggerSOS();
    }, HOLD_DURATION);
  };
  const endPress = () => {
    setIsPressing(false);
    setProgress(0);
    controls.start({
      scale: 1
    });
    if (pressTimer.current) clearTimeout(pressTimer.current);
    if (progressInterval.current) clearInterval(progressInterval.current);
  };
  const triggerSOS = () => {
    endPress();
    setSOSActive(true);
    setScreen('SOSActive');
  };
  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto my-8">
      {/* Pulsing Background Rings */}
      <div className="absolute inset-0 rounded-full bg-brand-red/20 animate-ping-slow"></div>
      <div className="absolute inset-4 rounded-full bg-brand-red/30 animate-pulse-slow"></div>

      {/* Progress Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
        <circle
          cx="128"
          cy="128"
          r="124"
          fill="none"
          stroke="rgba(255, 45, 85, 0.2)"
          strokeWidth="8" />
        
        <motion.circle
          cx="128"
          cy="128"
          r="124"
          fill="none"
          stroke="#FF2D55"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 124}
          strokeDashoffset={2 * Math.PI * 124 * (1 - progress / 100)}
          className="transition-all duration-75 ease-linear" />
        
      </svg>

      {/* Main Button */}
      <motion.button
        id="btn-sos"
        animate={controls}
        onPointerDown={startPress}
        onPointerUp={endPress}
        onPointerLeave={endPress}
        className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-b from-[#FF4B6B] to-brand-red shadow-[0_0_40px_rgba(255,45,85,0.6),inset_0_4px_10px_rgba(255,255,255,0.3)] flex flex-col items-center justify-center gap-2 select-none touch-none">
        
        <AlertTriangle
          size={48}
          className="text-white drop-shadow-md"
          strokeWidth={2.5} />
        
        <span className="text-white font-bold text-3xl tracking-wider drop-shadow-md">
          SOS
        </span>
        <span className="text-white/80 text-xs font-medium uppercase tracking-widest mt-1">
          {isPressing ? 'Keep Holding...' : 'Hold to Activate'}
        </span>
      </motion.button>
    </div>);

}