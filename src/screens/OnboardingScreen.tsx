import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, ShieldAlert, MapPin, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
const slides = [
{
  id: 1,
  title: 'Voice-Activated SOS',
  description:
  "Just say 'Help Me' or 'Emergency' to instantly trigger alerts, even if your phone is in your pocket.",
  icon: Mic,
  color: 'from-brand-red to-brand-redDark',
  glow: 'bg-brand-red/20'
},
{
  id: 2,
  title: 'AI Threat Detection',
  description:
  'Smart algorithms detect panic keywords, abnormal motion, and unsafe inactivity in real-time.',
  icon: ShieldAlert,
  color: 'from-brand-cyan to-blue-600',
  glow: 'bg-brand-cyan/20'
},
{
  id: 3,
  title: 'Live Location Tracking',
  description:
  "Share your live route with trusted contacts. We'll alert them if you deviate from your safe path.",
  icon: MapPin,
  color: 'from-brand-violet to-purple-600',
  glow: 'bg-brand-violet/20'
}];

export function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const setScreen = useAppStore((state) => state.setScreen);
  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      setScreen('Auth');
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };
  const slide = slides[currentSlide];
  const Icon = slide.icon;
  return (
    <div className="w-full h-full flex flex-col bg-brand-dark pt-20 pb-10 px-6 relative">
      <button
        onClick={() => setScreen('Auth')}
        className="absolute top-14 right-6 text-white/50 font-medium text-sm">
        
        Skip
      </button>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{
              opacity: 0,
              x: 50
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: -50
            }}
            transition={{
              duration: 0.4
            }}
            className="flex flex-col items-center text-center w-full">
            
            <div className="relative mb-12">
              <div
                className={`absolute inset-0 ${slide.glow} rounded-full blur-3xl scale-150`}>
              </div>
              <div
                className={`w-40 h-40 rounded-full bg-gradient-to-br ${slide.color} flex items-center justify-center shadow-2xl relative z-10`}>
                
                <Icon size={72} className="text-white" strokeWidth={1.5} />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-[280px]">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-8 mt-auto">
        {/* Pagination Dots */}
        <div className="flex gap-2">
          {slides.map((_, index) =>
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/20'}`} />

          )}
        </div>

        <button
          onClick={nextSlide}
          className="w-full h-14 bg-white text-black rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform">
          
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>);

}