import React, { useState, memo, useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { TransactionDetailModal } from '../components/TransactionDetailModal';
import { FaqSection } from '../components/FaqSection';
import { PrivacyPolicyModal } from '../components/PrivacyPolicyModal';
import { DepositRecord, WithdrawalRecord } from '../types';
import { motion } from 'motion/react';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Building2,
  History,
  Bot,
  ShieldCheck,
  Settings,
  Gift,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Clock,
  Zap
} from 'lucide-react';

interface HomeRecentTxRowProps {
  record: DepositRecord | WithdrawalRecord;
  onSelect: (record: DepositRecord | WithdrawalRecord) => void;
}

const HomeRecentTxRow: React.FC<HomeRecentTxRowProps> = memo(({ record, onSelect }) => {
  const { t, formatCurrency } = useApp();
  const isDep = 'reference' in record;
  const dateStr = new Date(record.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      onClick={() => onSelect(record)}
      className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 cursor-pointer transition-all hover:border-cyan-500/40"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isDep ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'}`}>
          {isDep ? <ArrowDownCircle className="w-5 h-5" /> : <ArrowUpCircle className="w-5 h-5" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-200">
              {isDep ? t('tx_deposit_item', { id: record.id }) : t('tx_payout_item', { id: record.id })}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">• {record.bankName}</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">{t('home_player_id')}: {record.playerId} | {dateStr}</span>
        </div>
      </div>

      <div className="text-right flex flex-col items-end gap-1">
        <div className={`text-xs font-black ${isDep ? 'text-cyan-300' : 'text-amber-300'}`}>
          {isDep ? '+' : '-'}{formatCurrency(record.amount)}
        </div>
        <StatusBadge status={record.status} />
      </div>
    </div>
  );
});

HomeRecentTxRow.displayName = 'HomeRecentTxRow';

export const HomeScreen: React.FC = memo(() => {
  const {
    t,
    formatCurrency,
    deposits,
    withdrawals,
    setActiveTab,
    userSettings,
    showToast
  } = useApp();

  const [selectedRecord, setSelectedRecord] = useState<DepositRecord | WithdrawalRecord | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Memoize high level metrics calculations
  const totalDepositVal = useMemo(() => {
    return deposits
      .filter((d) => d.status === 'APPROVED')
      .reduce((sum, d) => sum + d.amount, 0);
  }, [deposits]);

  const totalWithdrawVal = useMemo(() => {
    return withdrawals
      .filter((w) => w.status === 'APPROVED')
      .reduce((sum, w) => sum + w.amount, 0);
  }, [withdrawals]);

  const allRecords = useMemo(() => {
    return [...deposits, ...withdrawals].sort((a, b) => b.createdAt - a.createdAt);
  }, [deposits, withdrawals]);

  const approvedCount = useMemo(() => {
    return allRecords.filter((r) => r.status === 'APPROVED').length;
  }, [allRecords]);

  const successRatePct = useMemo(() => {
    return allRecords.length > 0 ? Math.round((approvedCount * 100) / allRecords.length) : 100;
  }, [allRecords.length, approvedCount]);

  const promoUrl = "https://reffpa.com/L?tag=d_2481353m_1622c_&site=2481353&ad=1622";

  const handleOpenPromo = useCallback(() => {
    window.open(promoUrl, '_blank');
    showToast("Opening 1XBet Promo Registration Page...");
  }, [showToast]);

  const closeModal = useCallback(() => {
    setSelectedRecord(null);
  }, []);

  return (
    <div className="space-y-5 pb-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#061838]/90 via-[#020617] to-[#0a1e3f]/90 border border-cyan-500/30 p-5 sm:p-6 shadow-2xl shadow-cyan-950/40 glow-cyan"
      >
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 glow-cyan">
                {t('home_badge')}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {t('home_player_id')}: <strong className="text-cyan-300 font-bold">{userSettings.savedPlayerId}</strong>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              {t('home_title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md font-medium leading-relaxed">
              {t('home_sub')}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveTab('deposit')}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs sm:text-sm hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer active:scale-95"
            >
              <ArrowDownCircle className="w-4 h-4" />
              <span>{t('btn_deposit_now')}</span>
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className="px-4 py-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95 glow-amber"
            >
              <ArrowUpCircle className="w-4 h-4" />
              <span>{t('btn_cash_out')}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <motion.div whileHover={{ y: -3 }} className="glass-panel p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400 font-medium">{t('metric_tot_dep')}</span>
            <ArrowDownCircle className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-base sm:text-lg font-black text-cyan-300 truncate tracking-tight">
            {formatCurrency(totalDepositVal)}
          </div>
          <span className="text-[10px] text-slate-500 font-medium">{t('metric_dep_slips', { count: deposits.length })}</span>
        </motion.div>

        <motion.div whileHover={{ y: -3 }} className="glass-panel p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400 font-medium">{t('metric_tot_with')}</span>
            <ArrowUpCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-base sm:text-lg font-black text-amber-300 truncate tracking-tight">
            {formatCurrency(totalWithdrawVal)}
          </div>
          <span className="text-[10px] text-slate-500 font-medium">{t('metric_with_reqs', { count: withdrawals.length })}</span>
        </motion.div>

        <motion.div whileHover={{ y: -3 }} className="glass-panel p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400 font-medium">{t('metric_success_rate')}</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-base sm:text-lg font-black text-emerald-400 tracking-tight">
            {successRatePct}%
          </div>
          <span className="text-[10px] text-slate-500 font-medium">{t('metric_approved_count', { count: approvedCount })}</span>
        </motion.div>

        <motion.div whileHover={{ y: -3 }} className="glass-panel p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400 font-medium">{t('metric_active_banks')}</span>
            <Building2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-base sm:text-lg font-black text-slate-100 tracking-tight">
            {t('metric_banks_count')}
          </div>
          <span className="text-[10px] text-cyan-400 font-bold">{t('metric_online_gateway')}</span>
        </motion.div>
      </div>

      {/* Quick Access Menu Grid */}
      <div className="glass-panel p-4 sm:p-5">
        <div className="flex items-center gap-1.5 mb-3">
          <Zap className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
            {t('quick_actions')}
          </h3>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 text-center">
          {[
            { id: 'deposit', labelKey: 'nav_deposit', icon: ArrowDownCircle, color: 'text-cyan-300 bg-cyan-500/15 border-cyan-500/30' },
            { id: 'withdraw', labelKey: 'nav_withdraw', icon: ArrowUpCircle, color: 'text-amber-300 bg-amber-500/15 border-amber-500/30' },
            { id: 'banks', labelKey: 'nav_banks', icon: Building2, color: 'text-blue-300 bg-blue-500/15 border-blue-500/30' },
            { id: 'history', labelKey: 'nav_history', icon: History, color: 'text-indigo-300 bg-indigo-500/15 border-indigo-500/30' },
            { id: 'aichat', labelKey: 'nav_aichat', icon: Bot, color: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30' },
            { id: 'admin', labelKey: 'nav_admin', icon: ShieldCheck, color: 'text-amber-300 bg-amber-500/15 border-amber-500/30' },
            { id: 'settings', labelKey: 'nav_settings', icon: Settings, color: 'text-purple-300 bg-purple-500/15 border-purple-500/30' },
          ].map((action) => {
            const IconComp = action.icon;
            return (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={action.id}
                onClick={() => setActiveTab(action.id as any)}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 transition-all cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-2xl ${action.color} border flex items-center justify-center mb-1.5 shadow-sm`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-300 truncate w-full">{t(action.labelKey)}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Promo Code Card */}
      <div className="bg-gradient-to-r from-amber-500/15 via-[#020617] to-[#020617] border border-amber-500/30 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 glow-amber">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0 shadow-lg shadow-amber-500/10">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-300 tracking-wide">{t('promo_code')}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950">{t('promo_bonus')}</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 font-medium">
              {t('promo_desc')}
            </p>
          </div>
        </div>
        <button
          onClick={handleOpenPromo}
          className="px-4 py-2.5 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-lg shadow-amber-400/20 active:scale-95"
        >
          <span>{t('btn_claim_bonus')}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Recent Transactions List */}
      <div className="glass-panel p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-extrabold text-cyan-300">{t('recent_tx_title')}</h3>
          </div>
          <button
            onClick={() => setActiveTab('history')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>{t('btn_view_all', { count: allRecords.length })}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {allRecords.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs font-medium">
            {t('no_tx_history')}
          </div>
        ) : (
          <div className="space-y-2">
            {allRecords.slice(0, 5).map((rec) => {
              const isDep = 'reference' in rec;
              const dateStr = new Date(rec.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <div
                  key={`${isDep ? 'dep' : 'with'}_${rec.id}`}
                  onClick={() => setSelectedRecord(rec)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 cursor-pointer transition-all hover:border-cyan-500/40"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isDep ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'}`}>
                      {isDep ? <ArrowDownCircle className="w-5 h-5" /> : <ArrowUpCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-200">
                          {isDep ? t('tx_deposit_item', { id: rec.id }) : t('tx_payout_item', { id: rec.id })}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">• {rec.bankName}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">{t('home_player_id')}: {rec.playerId} | {dateStr}</span>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1">
                    <div className={`text-xs font-black ${isDep ? 'text-cyan-300' : 'text-amber-300'}`}>
                      {isDep ? '+' : '-'}{formatCurrency(rec.amount)}
                    </div>
                    <StatusBadge status={rec.status} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Privacy Policy Footer Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-200">
              {t('privacy_policy_title')}
            </h4>
            <p className="text-[11px] text-slate-400 font-medium">
              {t('privacy_policy_sub')}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsPrivacyOpen(true)}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-cyan-500/30 cursor-pointer transition-all shrink-0"
        >
          {t('privacy_policy_btn')}
        </button>
      </div>

      <TransactionDetailModal
        record={selectedRecord}
        onClose={closeModal}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
});

HomeScreen.displayName = 'HomeScreen';

