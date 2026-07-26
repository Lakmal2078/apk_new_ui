import React, { memo, useCallback } from 'react';
import { DepositRecord, WithdrawalRecord } from '../types';
import { StatusBadge } from './StatusBadge';
import { X, Copy, CheckCircle2, ShieldAlert, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

interface TransactionDetailModalProps {
  record: DepositRecord | WithdrawalRecord | null;
  onClose: () => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = memo(({ record, onClose }) => {
  const { t, showToast, formatCurrency, formatDate } = useApp();
  
  const handleCopy = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(t('toast_copied', { label }));
  }, [showToast, t]);

  if (!record) return null;

  const isDeposit = 'reference' in record;
  const dateStr = formatDate(record.createdAt);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="bg-[#020617]/95 border border-cyan-500/30 rounded-3xl w-full max-w-lg p-5 sm:p-6 text-slate-100 shadow-2xl shadow-cyan-950/50 relative glow-cyan"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80 mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-cyan-300">
                {isDeposit ? t('tx_deposit_slip', { id: record.id }) : t('tx_payout_request', { id: record.id })}
              </h3>
              <StatusBadge status={record.status} />
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all border border-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content Body */}
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400 font-medium">{t('tx_tx_id')}</span>
              <span className="font-mono font-bold text-slate-200">#{record.id}</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400 font-medium">{t('tx_player_id')}</span>
              <div className="flex items-center gap-1.5 font-bold text-cyan-400">
                <span>{record.playerId}</span>
                <button
                  onClick={() => handleCopy(record.playerId, 'Player ID')}
                  className="p-1 hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-cyan-300" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400 font-medium">{t('tx_amount')}</span>
              <span className={`text-base font-black ${isDeposit ? 'text-emerald-400' : 'text-amber-300'}`}>
                {formatCurrency(record.amount)}
              </span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400 font-medium">{t('tx_bank_name')}</span>
              <span className="font-semibold text-slate-200">{record.bankName}</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400 font-medium">{t('tx_date_time')}</span>
              <span className="text-slate-300 font-medium">{dateStr}</span>
            </div>

            {isDeposit ? (
              <>
                {(record as DepositRecord).reference && (
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400 font-medium">{t('tx_slip_ref')}</span>
                    <div className="flex items-center gap-1.5 font-mono font-bold text-slate-100">
                      <span>{(record as DepositRecord).reference}</span>
                      <button
                        onClick={() => handleCopy((record as DepositRecord).reference!, 'Reference')}
                        className="p-1 hover:bg-slate-800 rounded-lg cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-cyan-300" />
                      </button>
                    </div>
                  </div>
                )}

                {(record as DepositRecord).sender && (
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400 font-medium">{t('tx_sender_name')}</span>
                    <span className="text-slate-200 font-medium">{(record as DepositRecord).sender}</span>
                  </div>
                )}

                {(record as DepositRecord).aiResult && (
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300">
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>{t('tx_ai_ocr_analysis')}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed font-normal">{(record as DepositRecord).aiResult}</p>
                  </div>
                )}

                {(record as DepositRecord).slipImage && (
                  <div className="mt-2">
                    <p className="text-slate-400 text-xs mb-1.5 font-bold flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5 text-cyan-400" /> {t('tx_uploaded_slip')}
                    </p>
                    <img
                      src={(record as DepositRecord).slipImage}
                      alt="Deposit Slip Preview"
                      className="w-full h-40 object-cover rounded-2xl border border-slate-800 shadow-md"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">{t('tx_acc_holder')}</span>
                  <span className="font-semibold text-slate-200">{(record as WithdrawalRecord).accountHolder}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">{t('tx_acc_number')}</span>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-amber-300">
                    <span>{(record as WithdrawalRecord).accountNumber}</span>
                    <button
                      onClick={() => handleCopy((record as WithdrawalRecord).accountNumber, 'Account Number')}
                      className="p-1 hover:bg-slate-800 rounded-lg cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-amber-300" />
                    </button>
                  </div>
                </div>

                {(record as WithdrawalRecord).secretCode && (
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400 font-medium">{t('tx_secret_code')}</span>
                    <span className="font-mono font-bold text-emerald-400">{(record as WithdrawalRecord).secretCode}</span>
                  </div>
                )}

                {(record as WithdrawalRecord).payoutReference && (
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400 font-medium">{t('tx_payout_ref')}</span>
                    <span className="font-mono font-bold text-amber-300">{(record as WithdrawalRecord).payoutReference}</span>
                  </div>
                )}
              </>
            )}

            {record.rejectionReason && (
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">{t('tx_rejection_reason')}</span>
                  <span>{record.rejectionReason}</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-5 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black hover:from-cyan-400 hover:to-blue-500 transition-all text-xs shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              {t('tx_close_details')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});

TransactionDetailModal.displayName = 'TransactionDetailModal';

