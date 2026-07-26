import React, { Suspense, lazy } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNavigation } from './components/BottomNavigation';
import { LockScreenModal } from './components/LockScreenModal';
import { Bell, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Lazy loading screens for code splitting and bundle size optimization
const HomeScreen = lazy(() => import('./screens/HomeScreen').then(m => ({ default: m.HomeScreen })));
const DepositScreen = lazy(() => import('./screens/DepositScreen').then(m => ({ default: m.DepositScreen })));
const WithdrawScreen = lazy(() => import('./screens/WithdrawScreen').then(m => ({ default: m.WithdrawScreen })));
const TransactionHistoryScreen = lazy(() => import('./screens/TransactionHistoryScreen').then(m => ({ default: m.TransactionHistoryScreen })));
const BanksScreen = lazy(() => import('./screens/BanksScreen').then(m => ({ default: m.BanksScreen })));
const AIChatScreen = lazy(() => import('./screens/AIChatScreen').then(m => ({ default: m.AIChatScreen })));
const AdminCenterScreen = lazy(() => import('./screens/AdminCenterScreen').then(m => ({ default: m.AdminCenterScreen })));
const SettingsScreen = lazy(() => import('./screens/SettingsScreen').then(m => ({ default: m.SettingsScreen })));

// Loading Skeleton Component
const ScreenLoader: React.FC = () => (
  <div className="w-full space-y-4 py-8 animate-pulse max-w-4xl mx-auto">
    <div className="h-32 rounded-3xl skeleton-shimmer border border-slate-800/80" />
    <div className="grid grid-cols-2 gap-3">
      <div className="h-24 rounded-2xl skeleton-shimmer border border-slate-800/80" />
      <div className="h-24 rounded-2xl skeleton-shimmer border border-slate-800/80" />
    </div>
    <div className="h-48 rounded-3xl skeleton-shimmer border border-slate-800/80" />
    <div className="flex items-center justify-center pt-4 text-cyan-400 gap-2">
      <Loader2 className="w-5 h-5 animate-spin" />
      <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Loading Cashier Engine...</span>
    </div>
  </div>
);

const MainContent: React.FC = () => {
  const { activeTab, toastMessage } = useApp();

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'deposit':
        return <DepositScreen />;
      case 'withdraw':
        return <WithdrawScreen />;
      case 'history':
        return <TransactionHistoryScreen />;
      case 'banks':
        return <BanksScreen />;
      case 'aichat':
        return <AIChatScreen />;
      case 'admin':
        return <AdminCenterScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Ambient background glow elements for luxury fintech atmosphere */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-[120px] pointer-events-none z-0 rounded-full" />
      <div className="fixed -bottom-20 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[140px] pointer-events-none z-0 rounded-full" />

      {/* Top App Bar */}
      <Navbar />

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 w-full max-w-sm"
          >
            <div className="bg-slate-900/90 text-cyan-300 px-4 py-3 rounded-2xl shadow-2xl font-bold text-xs flex items-center gap-3 border border-cyan-500/40 backdrop-blur-xl glow-cyan">
              <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
                <Bell className="w-4 h-4 animate-bounce" />
              </div>
              <span className="truncate">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Screen View with Motion & Suspense */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-4 pb-24 z-10">
        <Suspense fallback={<ScreenLoader />}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {renderScreen()}
          </motion.div>
        </Suspense>
      </main>

      {/* Lock Screen Overlay */}
      <LockScreenModal />

      {/* Floating Bottom Navigation Bar */}
      <BottomNavigation />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;

