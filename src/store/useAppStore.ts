import { create } from 'zustand';

export type Screen =
'Splash' |
'Onboarding' |
'Auth' |
'Home' |
'SOSActive' |
'LiveTracking' |
'AIThreat' |
'Contacts' |
'Settings' |
'Profile' |
'History' |
'FakeCall';

export type Tab = 'Home' | 'Map' | 'AI' | 'Contacts' | 'Profile';

export interface Contact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  avatar: string;
}

interface AppState {
  currentScreen: Screen;
  currentTab: Tab;
  isAuthenticated: boolean;
  isSOSActive: boolean;
  threatLevel: number; // 0 to 100
  contacts: Contact[];

  setScreen: (screen: Screen) => void;
  setTab: (tab: Tab) => void;
  setAuthenticated: (status: boolean) => void;
  setSOSActive: (status: boolean) => void;
  setThreatLevel: (level: number) => void;
  triggerVoiceSOS: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentScreen: 'Splash',
  currentTab: 'Home',
  isAuthenticated: false,
  isSOSActive: false,
  threatLevel: 12,
  contacts: [
  {
    id: '1',
    name: 'Mom',
    relation: 'Family',
    phone: '+1 (555) 123-4567',
    avatar: 'https://i.pravatar.cc/150?u=mom'
  },
  {
    id: '2',
    name: 'David',
    relation: 'Brother',
    phone: '+1 (555) 987-6543',
    avatar: 'https://i.pravatar.cc/150?u=david'
  },
  {
    id: '3',
    name: 'Emma',
    relation: 'Roommate',
    phone: '+1 (555) 456-7890',
    avatar: 'https://i.pravatar.cc/150?u=emma'
  }],


  setScreen: (screen) => set({ currentScreen: screen }),
  setTab: (tab) => set({ currentTab: tab }),
  setAuthenticated: (status) => set({ isAuthenticated: status }),
  setSOSActive: (status) => set({ isSOSActive: status }),
  setThreatLevel: (level) => set({ threatLevel: level }),
  triggerVoiceSOS: () => set({ currentScreen: 'SOSActive', isSOSActive: true })
}));