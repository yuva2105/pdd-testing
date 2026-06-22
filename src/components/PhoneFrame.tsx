import React, { useEffect, useState } from 'react';
import { Battery, Wifi, Signal } from 'lucide-react';
interface PhoneFrameProps {
  children: ReactNode;
}
export function PhoneFrame({ children }: PhoneFrameProps) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4 sm:p-8">
      {/* Phone Hardware Wrapper */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-brand-dark rounded-[55px] shadow-[0_0_0_1px_#333,0_0_0_12px_#111,0_0_0_14px_#333,0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
        {/* Hardware Buttons (Simulated) */}
        <div className="absolute -left-[14px] top-[120px] w-[3px] h-[30px] bg-[#222] rounded-l-md"></div>
        <div className="absolute -left-[14px] top-[170px] w-[3px] h-[60px] bg-[#222] rounded-l-md"></div>
        <div className="absolute -left-[14px] top-[240px] w-[3px] h-[60px] bg-[#222] rounded-l-md"></div>
        <div className="absolute -right-[14px] top-[200px] w-[3px] h-[90px] bg-[#222] rounded-r-md"></div>

        {/* Dynamic Island / Notch Area */}
        <div className="absolute top-0 inset-x-0 h-8 flex justify-center z-50 pointer-events-none">
          <div className="w-[120px] h-[30px] bg-black rounded-b-3xl mt-2 flex items-center justify-between px-3 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-[#111] border border-[#222]"></div>
            <div className="w-2 h-2 rounded-full bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]"></div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="absolute top-0 inset-x-0 h-12 flex justify-between items-center px-6 z-40 pointer-events-none text-white">
          <div className="text-[14px] font-semibold tracking-tight w-16 pt-1">
            {time.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })}
          </div>
          <div className="flex items-center gap-1.5 pt-1 w-16 justify-end">
            <Signal size={14} strokeWidth={2.5} />
            <Wifi size={14} strokeWidth={2.5} />
            <Battery size={16} strokeWidth={2} className="opacity-90" />
          </div>
        </div>

        {/* App Content Area */}
        <div className="flex-1 relative overflow-hidden bg-brand-dark">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-0 inset-x-0 h-8 flex justify-center items-end pb-2 z-50 pointer-events-none">
          <div className="w-[134px] h-[5px] bg-white/40 rounded-full"></div>
        </div>
      </div>
    </div>);

}