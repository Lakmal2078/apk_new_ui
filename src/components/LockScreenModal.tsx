import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Fingerprint, Delete } from 'lucide-react';

export const LockScreenModal: React.FC = React.memo(() => {
  const { t, isAppLocked, unlockWithPin, unlockWithBiometrics, securityPin } = useApp();
  const [pinState, setPinState] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  if (!isAppLocked) return null;

  const handleKeyClick = (key: string) => {
    if (key === 'DEL') {
      if (pinState.length > 0) {
        setPinState(pinState.slice(0, -1));
        setIsError(false);
      }
    } else if (key === 'BIO') {
      unlockWithBiometrics();
      setPinState('');
      setIsError(false);
    } else {
      if (pinState.length < 4) {
        const updated = pinState + key;
        setPinState(updated);
        if (updated.length === 4) {
          setTimeout(() => {
            const success = unlockWithPin(updated);
            if (!success) {
              setIsError(true);
              setTimeout(() => {
                setPinState('');
                setIsError(false);
              }, 600);
            } else {
              setPinState('');
            }
          }, 150);
        }
      }
    }
  };

  const keypad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['BIO', '0', 'DEL']
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#020617]/95 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center justify-center text-center p-6 rounded-3xl bg-[#081226]/80 border border-cyan-500/30 shadow-2xl glow-cyan">
        {/* Shield Icon */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-indigo-600/20 border-2 border-cyan-400/50 flex items-center justify-center mb-5 shadow-xl shadow-cyan-500/10">
          <Shield className="w-10 h-10 text-cyan-300 animate-pulse" />
        </div>

        <h2 className="text-xl font-black text-slate-100 mb-1 tracking-tight">{t('lock_modal_title')}</h2>
        <p className={`text-xs mb-6 font-medium ${isError ? 'text-rose-400 font-extrabold' : 'text-slate-400'}`}>
          {isError ? t('lock_modal_err') : t('lock_modal_prompt')}
        </p>

        {/* 4-Dot PIN Indicator */}
        <div className="flex items-center gap-4 mb-8">
          {[0, 1, 2, 3].map((index) => {
            const isFilled = index < pinState.length;
            return (
              <div
                key={index}
                className={`w-5 h-5 rounded-full transition-all duration-200 ${
                  isError
                    ? 'bg-rose-500 scale-110 shadow-md shadow-rose-500/50'
                    : isFilled
                    ? 'bg-cyan-400 shadow-md shadow-cyan-400/80 scale-110'
                    : 'bg-slate-900 border border-slate-700'
                }`}
              />
            );
          })}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3.5 w-full max-w-[260px] mb-6">
          {keypad.flat().map((key) => {
            if (key === 'DEL') {
              return (
                <button
                  key={key}
                  onClick={() => handleKeyClick(key)}
                  className="w-16 h-16 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 flex items-center justify-center mx-auto transition-all active:scale-95 border border-slate-800 cursor-pointer"
                >
                  <Delete className="w-5 h-5 text-slate-400" />
                </button>
              );
            }
            if (key === 'BIO') {
              return (
                <button
                  key={key}
                  onClick={() => handleKeyClick(key)}
                  className="w-16 h-16 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 flex items-center justify-center mx-auto transition-all active:scale-95 cursor-pointer glow-cyan"
                >
                  <Fingerprint className="w-6 h-6" />
                </button>
              );
            }
            return (
              <button
                key={key}
                onClick={() => handleKeyClick(key)}
                className="w-16 h-16 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-100 text-xl font-black flex items-center justify-center mx-auto transition-all active:scale-95 shadow-md cursor-pointer"
              >
                {key}
              </button>
            );
          })}
        </div>

        {/* Quick Biometrics Button */}
        <button
          onClick={() => unlockWithBiometrics()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-4 transition-all cursor-pointer"
        >
          <Fingerprint className="w-4 h-4 text-cyan-400" />
          <span>{t('lock_modal_bio_btn')}</span>
        </button>

        {/* Tip Badge */}
        <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 font-mono">
          {t('lock_modal_tip', { pin: securityPin })}
        </div>
      </div>
    </div>
  );
});

LockScreenModal.displayName = 'LockScreenModal';

