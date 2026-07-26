import React, { memo, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ScreenTab } from '../types';
import { motion } from 'motion/react';
import {
  Home,
  ArrowDownCircle,
  ArrowUpCircle,
  History,
  Building2,
  Bot,
  ShieldCheck,
  Settings
} from 'lucide-react';

interface NavItem {
  id: ScreenTab;
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const BottomNavigation: React.FC = memo(() => {
  const { t, activeTab, setActiveTab, deposits, withdrawals } = useApp();

  const totalPending = useMemo(() => {
    const pendingDepositsCount = deposits.filter((d) => d.status === 'PENDING' || d.status === 'AI_REVIEW').length;
    const pendingWithdrawalsCount = withdrawals.filter((w) => w.status === 'PENDING').length;
    return pendingDepositsCount + pendingWithdrawalsCount;
  }, [deposits, withdrawals]);

  const navItems: NavItem[] = useMemo(() => [
    { id: 'home', key: 'nav_home', icon: Home },
    { id: 'deposit', key: 'nav_deposit', icon: ArrowDownCircle },
    { id: 'withdraw', key: 'nav_withdraw', icon: ArrowUpCircle },
    { id: 'history', key: 'nav_history', icon: History },
    { id: 'banks', key: 'nav_banks', icon: Building2 },
    { id: 'aichat', key: 'nav_aichat', icon: Bot },
    { id: 'admin', key: 'nav_admin', icon: ShieldCheck, badge: totalPending },
    { id: 'settings', key: 'nav_settings', icon: Settings }
  ], [totalPending]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pb-2 px-2 sm:px-4 pointer-events-none">
      <nav className="max-w-2xl mx-auto pointer-events-auto bg-[#020617]/90 border border-cyan-500/25 backdrop-blur-2xl rounded-2xl p-1.5 shadow-2xl shadow-cyan-950/40 glow-cyan">
        <div className="flex items-center justify-between gap-1 overflow-x-auto scrollbar-none py-0.5 px-0.5">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex-1 min-w-[58px] sm:min-w-[64px] flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors duration-200 cursor-pointer select-none ${
                  isActive ? 'text-cyan-300 font-extrabold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {/* Motion Animated Active Indicator Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeBottomTab"
                    className="absolute inset-0 bg-gradient-to-b from-cyan-500/25 via-blue-600/20 to-cyan-500/10 border border-cyan-400/40 rounded-xl shadow-inner"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative">
                    <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                      isActive ? 'text-cyan-300 scale-110' : 'text-slate-400'
                    }`} />

                    {item.badge && item.badge > 0 ? (
                      <span className="absolute -top-1.5 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-black text-white shadow-md animate-pulse">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>

                  <span className={`text-[10px] mt-1 tracking-tight truncate max-w-full z-10 ${
                    isActive ? 'text-cyan-300 font-bold' : 'text-slate-400'
                  }`}>
                    {t(item.key)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
});

BottomNavigation.displayName = 'BottomNavigation';

