import React, { memo } from 'react';
import { TransactionStatus } from '../types';
import { useApp } from '../context/AppContext';

interface StatusBadgeProps {
  status: TransactionStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = memo(({ status }) => {
  const { t } = useApp();

  switch (status) {
    case 'APPROVED':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm glow-emerald">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t('status_approved')}</span>
        </span>
      );
    case 'PENDING':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-black bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm glow-amber">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>{t('status_pending')}</span>
        </span>
      );
    case 'AI_REVIEW':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-black bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm glow-cyan">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>{t('status_ai_review')}</span>
        </span>
      );
    case 'REJECTED':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-black bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span>{t('status_rejected')}</span>
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
          {status}
        </span>
      );
  }
});

StatusBadge.displayName = 'StatusBadge';

