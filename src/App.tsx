import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from './store/useAppStore';
import { PhoneFrame } from './components/PhoneFrame';
import { TabBar } from './components/TabBar';
// Screens
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { AuthScreen } from './screens/AuthScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SOSActiveScreen } from './screens/SOSActiveScreen';
import { LiveTrackingScreen } from './screens/LiveTrackingScreen';
import { AIThreatScreen } from './screens/AIThreatScreen';
import { ContactsScreen } from './screens/ContactsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { FakeCallScreen } from './screens/FakeCallScreen';
export function App() {
  const currentScreen = useAppStore((state) => state.currentScreen);
  // Screens that show the bottom tab bar
  const showTabBar = [
  'Home',
  'LiveTracking',
  'AIThreat',
  'Contacts',
  'Profile'].
  includes(currentScreen);
  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen />;
      case 'Onboarding':
        return <OnboardingScreen />;
      case 'Auth':
        return <AuthScreen />;
      case 'Home':
        return <HomeScreen />;
      case 'SOSActive':
        return <SOSActiveScreen />;
      case 'LiveTracking':
        return <LiveTrackingScreen />;
      case 'AIThreat':
        return <AIThreatScreen />;
      case 'Contacts':
        return <ContactsScreen />;
      case 'Settings':
        return <SettingsScreen />;
      case 'Profile':
        return <ProfileScreen />;
      case 'History':
        return <HistoryScreen />;
      case 'FakeCall':
        return <FakeCallScreen />;
      default:
        return <SplashScreen />;
    }
  };
  return (
    <div className="min-h-screen w-full bg-[#050508] flex items-center justify-center font-sans">
      <PhoneFrame>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{
              opacity: 0,
              scale: 0.98
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 1.02
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut'
            }}
            className="w-full h-full">
            
            {renderScreen()}
          </motion.div>
        </AnimatePresence>

        {showTabBar && <TabBar />}
      </PhoneFrame>
    </div>);

}