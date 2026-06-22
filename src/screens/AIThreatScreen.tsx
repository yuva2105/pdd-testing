import React from 'react';
import { ThreatMeter } from '../components/ThreatMeter';
import { GlassCard } from '../components/GlassCard';
import { Mic, Activity, Smartphone, Info } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
export function AIThreatScreen() {
  const threatLevel = useAppStore((state) => state.threatLevel);
  const signals = [
  {
    icon: Mic,
    label: 'Voice Analysis',
    status: 'Normal',
    color: 'text-brand-success'
  },
  {
    icon: Activity,
    label: 'Motion Pattern',
    status: 'Stable',
    color: 'text-brand-success'
  },
  {
    icon: Smartphone,
    label: 'Device Handling',
    status: 'Slight Tremor',
    color: 'text-brand-warning'
  }];

  return (
    <div className="w-full h-full bg-brand-dark overflow-y-auto hide-scrollbar pb-28 pt-14 px-5">
      <h1 className="text-2xl font-bold text-white mb-6">AI Shield Analysis</h1>

      <GlassCard className="mb-6 flex justify-center py-8">
        <ThreatMeter level={threatLevel} />
      </GlassCard>

      <h2 className="text-white/80 font-semibold text-sm mb-4">
        Active Sensors
      </h2>
      <div className="flex flex-col gap-3 mb-8">
        {signals.map((signal, idx) => {
          const Icon = signal.icon;
          return (
            <GlassCard
              key={idx}
              className="flex items-center justify-between p-4">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <Icon size={20} className="text-white/70" />
                </div>
                <span className="text-white font-medium">{signal.label}</span>
              </div>
              <span className={`text-sm font-semibold ${signal.color}`}>
                {signal.status}
              </span>
            </GlassCard>);

        })}
      </div>

      <GlassCard className="bg-brand-cyan/5 border-brand-cyan/20">
        <div className="flex items-start gap-3">
          <Info size={20} className="text-brand-cyan mt-0.5 shrink-0" />
          <div>
            <h3 className="text-white font-medium mb-1">How AI Shield Works</h3>
            <p className="text-white/60 text-xs leading-relaxed">
              AstraSafe continuously monitors your environment using on-device
              machine learning. Audio and motion data never leave your phone
              unless an SOS is triggered.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>);

}