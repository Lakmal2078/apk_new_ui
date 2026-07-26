import React, { memo } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGE_OPTIONS } from '../utils/language';
import { Sun, Moon, Lock, ShieldAlert, Globe, CircleDot } from 'lucide-react';

export const Navbar: React.FC = memo(() => {
  const {
    t,
    language,
    setLanguage,
    isDarkMode,
    toggleDarkMode,
    isAdminMode,
    toggleAdminMode,
    lockApp,
    isAppLockEnabled
  } = useApp();

  return (
    <header className="sticky top-0 z-30 border-b border-cyan-500/20 bg-[#020617]/80 backdrop-blur-xl px-3 sm:px-6 py-2.5 text-slate-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-indigo-600/20 border border-cyan-400/40 text-cyan-300 font-black shadow-lg shadow-cyan-500/10">
            <span className="text-lg tracking-tighter">1X</span>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-base font-black tracking-tight bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-300 bg-clip-text text-transparent">
                {t('app_name')}
              </h1>
              {isAdminMode && (
                <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 glow-amber">
                  {t('admin_mode_badge')}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1.5">
              <CircleDot className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>{t('app_tagline')}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Language Selector */}
          <div className="relative group">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="appearance-none bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-xs text-slate-200 font-bold px-2.5 py-1.5 pr-6 rounded-xl cursor-pointer transition-all outline-none"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code} className="bg-slate-900 text-slate-100">
                  {opt.flag} {opt.name}
                </option>
              ))}
            </select>
            <Globe className="w-3.5 h-3.5 text-cyan-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch Theme" : "Switch Theme"}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Security Lock App Button */}
          <button
            onClick={lockApp}
            title="Lock Cashier App"
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isAppLockEnabled
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/20 glow-cyan'
                : 'bg-slate-900/90 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Admin Toggle Shortcut */}
          <button
            onClick={toggleAdminMode}
            title="Toggle Admin Control Center"
            className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 cursor-pointer ${
              isAdminMode
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 glow-amber'
                : 'bg-slate-900/90 border-slate-700/80 text-slate-300 hover:border-cyan-500/50'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAdminMode ? t('admin_on') : t('admin_off')}</span>
          </button>
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

