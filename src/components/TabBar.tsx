import React from 'react';
import { Home, Map, ShieldAlert, Users, User } from 'lucide-react';
import { useAppStore, Tab } from '../store/useAppStore';
import { motion } from 'framer-motion';
export function TabBar() {
  const { currentTab, setTab, setScreen } = useAppStore();
  const tabs: {
    id: Tab;
    icon: React.ElementType;
    label: string;
    screen: any;
  }[] = [
  {
    id: 'Home',
    icon: Home,
    label: 'Home',
    screen: 'Home'
  },
  {
    id: 'Map',
    icon: Map,
    label: 'Map',
    screen: 'LiveTracking'
  },
  {
    id: 'AI',
    icon: ShieldAlert,
    label: 'AI Shield',
    screen: 'AIThreat'
  },
  {
    id: 'Contacts',
    icon: Users,
    label: 'Contacts',
    screen: 'Contacts'
  },
  {
    id: 'Profile',
    icon: User,
    label: 'Profile',
    screen: 'Profile'
  }];

  const handleTabPress = (tab: (typeof tabs)[0]) => {
    setTab(tab.id);
    setScreen(tab.screen);
  };
  return (
    <div className="absolute bottom-0 inset-x-0 h-[90px] bg-brand-dark/80 backdrop-blur-2xl border-t border-white/5 px-6 pb-6 pt-2 flex justify-between items-center z-40">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabPress(tab)}
            className="relative flex flex-col items-center justify-center w-12 h-12">
            
            {isActive &&
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white/10 rounded-2xl"
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30
              }} />

            }
            <Icon
              size={22}
              className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-brand-cyan' : 'text-white/40'}`}
              strokeWidth={isActive ? 2.5 : 2} />
            
            <span
              className={`text-[10px] mt-1 font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40'}`}>
              
              {tab.label}
            </span>
          </button>);

      })}
    </div>);

}