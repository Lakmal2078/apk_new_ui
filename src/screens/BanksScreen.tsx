import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { Building2, Copy, Smartphone, Check } from 'lucide-react';

export const BanksScreen: React.FC = () => {
  const { t, banks, iPayNumbers, showToast } = useApp();
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    showToast(`${label} copied! (${text})`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-8">
      {/* Header */}
      <div className="glass-panel p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0 glow-cyan">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-100 tracking-tight flex items-center gap-2">
              <span>🏦</span> {t('banks_screen_title')}
            </h2>
            <p className="text-xs text-slate-400 font-medium">{t('banks_screen_sub')}</p>
          </div>
        </div>
      </div>

      {/* Bank List */}
      <div className="space-y-3.5">
        {banks.map((bank) => (
          <motion.div
            whileHover={{ y: -2 }}
            key={bank.id}
            className="glass-panel p-4 sm:p-5 space-y-3.5 group border-slate-800 hover:border-cyan-500/40"
          >
            {/* Bank Header Name, Branch & Active Badge */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">🏛️</span>
                <h3 className="text-base sm:text-lg font-black text-cyan-300 tracking-tight truncate group-hover:text-cyan-200 transition-colors">
                  {bank.bankName}
                </h3>
                {bank.branch && (
                  <span className="text-xs sm:text-sm font-medium text-slate-400 shrink-0">
                    ({bank.branch})
                  </span>
                )}
              </div>

              {/* Active / Inactive Badge */}
              <div className="shrink-0">
                {bank.isActive ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm animate-pulse glow-cyan">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping" />
                    <span>Active</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>Inactive</span>
                  </span>
                )}
              </div>
            </div>

            {/* Account Details Rows */}
            <div className="space-y-2.5 text-xs sm:text-sm">
              {/* Account Number Row */}
              <div className="flex items-center justify-between gap-2 bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-slate-400 font-bold shrink-0 w-12 sm:w-14">
                    ගිණුම
                  </span>
                  <span className="font-mono font-black text-slate-100 text-sm sm:text-base tracking-wider truncate">
                    {bank.accountNumber}
                  </span>
                </div>
                <button
                  onClick={() => handleCopyText(bank.accountNumber, "Account Number")}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 text-xs font-black flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
                >
                  {copiedKey === bank.accountNumber ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Account Holder Name Row */}
              <div className="flex items-center justify-between gap-2 bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-slate-400 font-bold shrink-0 w-12 sm:w-14">
                    නම
                  </span>
                  <span className="font-black text-slate-100 text-sm sm:text-base tracking-wider truncate">
                    {bank.accountHolder}
                  </span>
                </div>
                <button
                  onClick={() => handleCopyText(bank.accountHolder, "Account Holder Name")}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 text-xs font-black flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
                >
                  {copiedKey === bank.accountHolder ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* iPay Numbers Section */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-3">
          <Smartphone className="w-4 h-4 text-amber-300" />
          <h3 className="text-sm sm:text-base font-black text-amber-300 tracking-tight flex items-center gap-1.5">
            <span>📱</span> iPay Numbers
          </h3>
        </div>

        <div className="space-y-2.5">
          {iPayNumbers.map((ipay) => (
            <motion.div
              whileHover={{ y: -2 }}
              key={ipay.id}
              className="glass-panel p-3.5 sm:p-4 flex items-center justify-between gap-3 border-slate-800 hover:border-amber-500/40"
            >
              <div>
                <div className="font-mono font-black text-slate-100 text-sm sm:text-base tracking-wider">
                  {ipay.phone}
                </div>
                <div className="text-xs text-slate-400 font-bold mt-0.5">
                  {ipay.name}
                </div>
              </div>

              <button
                onClick={() => handleCopyText(ipay.phone, "iPay Number")}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 text-xs font-black flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
              >
                {copiedKey === ipay.phone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};


