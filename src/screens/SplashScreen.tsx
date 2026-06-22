import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
export function SplashScreen() {
  const setScreen = useAppStore((state) => state.setScreen);
  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('Onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [setScreen]);
  return (
    <div
      id="splash-screen"
      onClick={() => setScreen('Onboarding')}
      className="w-full h-full flex flex-col items-center justify-center bg-brand-dark relative overflow-hidden cursor-pointer">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-red/20 rounded-full blur-[80px]"></div>

      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0
        }}
        animate={{
          scale: 1,
          opacity: 1
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}
        className="relative z-10 flex flex-col items-center">
        
        <div className="relative mb-6">
          <motion.div
            animate={{
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 bg-brand-red/30 rounded-full blur-xl" />
          
          <div className="w-24 h-24 bg-gradient-to-br from-brand-red to-brand-redDark rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(255,45,85,0.4)] relative z-10">
            <Shield size={48} className="text-white" strokeWidth={2} />
          </div>
        </div>

        <motion.h1
          initial={{
            y: 20,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 0.4,
            duration: 0.6
          }}
          className="text-4xl font-bold tracking-tight text-white mb-2">
          
          Astra<span className="text-brand-red">Safe</span>
        </motion.h1>

        <motion.p
          initial={{
            y: 20,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 0.6,
            duration: 0.6
          }}
          className="text-white/60 font-medium tracking-wide">
          
          AI-Powered Personal Safety
        </motion.p>
      </motion.div>
    </div>);

}