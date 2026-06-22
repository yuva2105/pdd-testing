import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
interface ThreatMeterProps {
  level: number; // 0 to 100
}
export function ThreatMeter({ level }: ThreatMeterProps) {
  const isHighThreat = level > 60;
  const isMediumThreat = level > 30 && level <= 60;
  const getColor = () => {
    if (isHighThreat) return '#FF2D55'; // Red
    if (isMediumThreat) return '#FF9500'; // Orange
    return '#34C759'; // Green
  };
  const getLabel = () => {
    if (isHighThreat) return 'High Threat Detected';
    if (isMediumThreat) return 'Elevated Risk';
    return 'Environment Safe';
  };
  const color = getColor();
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-24 overflow-hidden mb-4">
        {/* Background Arc */}
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[16px] border-white/10 border-b-transparent border-r-transparent -rotate-45"></div>

        {/* Active Arc */}
        <motion.div
          className="absolute top-0 left-0 w-48 h-48 rounded-full border-[16px] border-b-transparent border-r-transparent -rotate-45"
          style={{
            borderColor: color,
            borderBottomColor: 'transparent',
            borderRightColor: 'transparent'
          }}
          initial={{
            rotate: -225
          }}
          animate={{
            rotate: -225 + level / 100 * 180
          }}
          transition={{
            type: 'spring',
            duration: 1.5,
            bounce: 0.2
          }} />
        

        {/* Center Content */}
        <div className="absolute bottom-0 inset-x-0 flex flex-col items-center justify-end pb-2">
          {isHighThreat ?
          <ShieldAlert
            size={28}
            color={color}
            className="mb-1 animate-pulse" /> :


          <ShieldCheck size={28} color={color} className="mb-1" />
          }
          <span
            className="text-3xl font-bold"
            style={{
              color
            }}>
            
            {level}%
          </span>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">{getLabel()}</h3>
        <p className="text-sm text-white/50 mt-1">AI Confidence Score</p>
      </div>
    </div>);

}