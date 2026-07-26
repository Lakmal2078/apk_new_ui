import React, { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { TransactionDetailModal } from '../components/TransactionDetailModal';
import { DepositRecord, WithdrawalRecord } from '../types';
import { motion } from 'motion/react';
import {
  History,
  Search,
  RefreshCw,
  Download,
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronLeft,
  ChevronRight,
  Receipt
} from 'lucide-react';

interface TransactionRecordRowProps {
  record: DepositRecord | WithdrawalRecord;
  onSelect: (record: DepositRecord | WithdrawalRecord) => void;
}

const TransactionRecordRow: React.FC<TransactionRecordRowProps> = memo(({ record, onSelect }) => {
  const { t, formatCurrency, formatDate } = useApp();
  const isDep = 'reference' in record;
  const dateStr = formatDate(record.createdAt);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={() => onSelect(record)}
      className="glass-panel p-4 cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-slate-800/80 hover:border-cyan-500/40"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${isDep ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'}`}>
          {isDep ? <ArrowDownCircle className="w-5 h-5" /> : <ArrowUpCircle className="w-5 h-5" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-black text-slate-100">
              {isDep ? t('tx_deposit_item', { id: record.id }) : t('tx_payout_item', { id: record.id })}
            </span>
            <span className="text-xs text-slate-400 font-medium">• {record.bankName}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
            {t('home_player_id')}: <span className="text-slate-200 font-bold">{record.playerId}</span> | {dateStr}
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60 gap-1">
        <span className={`text-sm sm:text-base font-black ${isDep ? 'text-cyan-300' : 'text-amber-300'}`}>
          {isDep ? '+' : '-'}{formatCurrency(record.amount)}
        </span>
        <StatusBadge status={record.status} />
      </div>
    </motion.div>
  );
});

TransactionRecordRow.displayName = 'TransactionRecordRow';

export const TransactionHistoryScreen: React.FC = memo(() => {
  const { t, formatCurrency, deposits, withdrawals, isAdminMode, exportCsv, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'DEPOSIT' | 'WITHDRAWAL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<DepositRecord | WithdrawalRecord | null>(null);

  // Unified list sorted descending by timestamp
  const allRecords = useMemo(() => {
    const combined: (DepositRecord | WithdrawalRecord)[] = [];
    deposits.forEach((d) => combined.push(d));
    withdrawals.forEach((w) => combined.push(w));
    return combined.sort((a, b) => b.createdAt - a.createdAt);
  }, [deposits, withdrawals]);

  // Apply Search & Filters
  const filteredRecords = useMemo(() => {
    return allRecords.filter((rec) => {
      const isDep = 'reference' in rec;

      // Type Filter
      if (typeFilter === 'DEPOSIT' && !isDep) return false;
      if (typeFilter === 'WITHDRAWAL' && isDep) return false;

      // Status Filter
      if (statusFilter !== 'ALL' && rec.status !== statusFilter) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchesPlayer = rec.playerId.toLowerCase().includes(q);
        const matchesBank = rec.bankName.toLowerCase().includes(q);
        const matchesId = rec.id.toString().includes(q);

        let matchesRef = false;
        if (isDep) {
          const dep = rec as DepositRecord;
          matchesRef = Boolean((dep.reference && dep.reference.toLowerCase().includes(q)) ||
                               (dep.sender && dep.sender.toLowerCase().includes(q)));
        } else {
          const withRec = rec as WithdrawalRecord;
          matchesRef = Boolean(withRec.accountNumber.toLowerCase().includes(q) ||
                               withRec.accountHolder.toLowerCase().includes(q) ||
                               (withRec.payoutReference && withRec.payoutReference.toLowerCase().includes(q)));
        }

        return matchesPlayer || matchesBank || matchesId || matchesRef;
      }

      return true;
    });
  }, [allRecords, typeFilter, statusFilter, searchQuery]);

  // Pagination Calculation
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedRecords = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, safeCurrentPage, itemsPerPage]);

  // High level totals for filtered subset wrapped in useMemo
  const filteredVolume = useMemo(() => filteredRecords.reduce((sum, r) => sum + r.amount, 0), [filteredRecords]);
  const approvedCount = useMemo(() => filteredRecords.filter((r) => r.status === 'APPROVED').length, [filteredRecords]);
  const successRatePct = useMemo(() => filteredRecords.length > 0 ? Math.round((approvedCount * 100) / filteredRecords.length) : 100, [filteredRecords.length, approvedCount]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Transaction history refreshed!");
    }, 600);
  }, [showToast]);

  const handleExport = useCallback(() => {
    exportCsv(filteredRecords);
  }, [exportCsv, filteredRecords]);

  const handleSelectRecord = useCallback((record: DepositRecord | WithdrawalRecord) => {
    setSelectedRecord(record);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedRecord(null);
  }, []);

  return (
    <div className="space-y-4 pb-8">
      {/* Header & Export CSV */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 glass-panel p-4 sm:p-5">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base sm:text-lg font-black text-slate-100 tracking-tight">{t('history_screen_title')}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">
            {isAdminMode ? t('history_screen_sub_admin') : t('history_screen_sub_user')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-slate-800 transition-all cursor-pointer"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExport}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer glow-cyan"
          >
            <Download className="w-4 h-4" />
            <span>{t('history_export_csv')}</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-panel p-4">
          <span className="text-xs text-slate-400 block font-medium">{t('history_filtered_vol')}</span>
          <div className="text-base sm:text-lg font-black text-cyan-300 truncate tracking-tight">
            {formatCurrency(filteredVolume)}
          </div>
          <span className="text-[10px] text-slate-500 font-medium">{t('history_tx_count', { count: filteredRecords.length })}</span>
        </div>

        <div className="glass-panel p-4">
          <span className="text-xs text-slate-400 block font-medium">{t('metric_success_rate')}</span>
          <div className="text-base sm:text-lg font-black text-amber-300 tracking-tight">
            {successRatePct}%
          </div>
          <span className="text-[10px] text-slate-500 font-medium">{t('metric_approved_count', { count: approvedCount })}</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          placeholder={t('history_search_placeholder')}
          className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all font-medium"
        />
        <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      </div>

      {/* Type & Status Filters */}
      <div className="glass-panel p-4 space-y-3.5">
        {/* Type Chips */}
        <div>
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">
            {t('history_type_filter')}
          </span>
          <div className="flex items-center gap-2">
            {[
              { id: 'ALL', labelKey: 'history_type_all' },
              { id: 'DEPOSIT', labelKey: 'history_type_deposits', icon: ArrowDownCircle },
              { id: 'WITHDRAWAL', labelKey: 'history_type_payouts', icon: ArrowUpCircle }
            ].map((item) => {
              const IconComponent = item.icon;
              const isSelected = typeFilter === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setTypeFilter(item.id as any);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 glow-cyan'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
                  <span>{t(item.labelKey)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Chips */}
        <div>
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">
            {t('history_status_filter')}
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'ALL', labelKey: 'history_status_all' },
              { id: 'APPROVED', labelKey: 'status_approved' },
              { id: 'PENDING', labelKey: 'status_pending' },
              { id: 'AI_REVIEW', labelKey: 'status_ai_review' },
              { id: 'REJECTED', labelKey: 'status_rejected' }
            ].map((st) => {
              const isSelected = statusFilter === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    setStatusFilter(st.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 glow-cyan'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t(st.labelKey)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pagination Controls Header Bar */}
      <div className="glass-panel px-4 py-3 flex items-center justify-between text-xs text-slate-300">
        <div className="font-medium">
          {t('history_page_info', { current: safeCurrentPage, total: totalPages, count: filteredRecords.length })}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[11px]">
            <span className="text-slate-400 hidden sm:inline font-medium">{t('history_show')}:</span>
            {[5, 10, 20].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setItemsPerPage(num);
                  setCurrentPage(1);
                }}
                className={`px-2 py-0.5 rounded-lg font-black transition-all cursor-pointer ${
                  itemsPerPage === num
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage <= 1}
              className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-800 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage >= totalPages}
              className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-800 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Record Cards List */}
      {paginatedRecords.length === 0 ? (
        <div className="glass-panel p-8 text-center text-slate-400 space-y-2">
          <Receipt className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-bold">{t('history_no_matches')}</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {paginatedRecords.map((rec) => {
            const isDep = 'reference' in rec;
            return (
              <TransactionRecordRow
                key={`${isDep ? 'dep' : 'with'}_${rec.id}`}
                record={rec}
                onSelect={handleSelectRecord}
              />
            );
          })}
        </div>
      )}

      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        record={selectedRecord}
        onClose={handleCloseModal}
      />
    </div>
  );
});

TransactionHistoryScreen.displayName = 'TransactionHistoryScreen';

