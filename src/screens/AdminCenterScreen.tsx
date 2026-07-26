import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { VolumeTrendsChart } from '../components/VolumeTrendsChart';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  ArrowDownCircle,
  ArrowUpCircle,
  BarChart3,
  ListOrdered,
  PlusCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Building2,
  Lock,
  Pencil,
  Trash2,
  Power,
  X,
  Check
} from 'lucide-react';
import { BankAccount } from '../types';

export const AdminCenterScreen: React.FC = () => {
  const {
    t,
    formatCurrency,
    formatDate,
    isAdminMode,
    toggleAdminMode,
    deposits,
    withdrawals,
    banks,
    approveDeposit,
    rejectDeposit,
    approveWithdrawal,
    rejectWithdrawal,
    addBankAccount,
    updateBankAccount,
    toggleBankAccountStatus,
    deleteBankAccount,
    adminLogs,
    showToast
  } = useApp();

  const [adminTab, setAdminTab] = useState<'deposits' | 'payouts' | 'analytics' | 'logs' | 'addbank'>('deposits');

  // Input states for approvals/rejections
  const [rejectReasonMap, setRejectReasonMap] = useState<Record<number, string>>({});
  const [payoutRefMap, setPayoutRefMap] = useState<Record<number, string>>({});

  // Add Bank Form
  const [newBankName, setNewBankName] = useState<string>('National Savings Bank (NSB)');
  const [newHolder, setNewHolder] = useState<string>('Fast Cashier Ltd');
  const [newAccNo, setNewAccNo] = useState<string>('7766554433');
  const [newBranch, setNewBranch] = useState<string>('Colombo Fort Branch');

  // Edit Bank Form State
  const [editingBankId, setEditingBankId] = useState<number | null>(null);
  const [editBankName, setEditBankName] = useState<string>('');
  const [editHolder, setEditHolder] = useState<string>('');
  const [editAccNo, setEditAccNo] = useState<string>('');
  const [editBranch, setEditBranch] = useState<string>('');
  const [editIsActive, setEditIsActive] = useState<boolean>(true);

  if (!isAdminMode) {
    return (
      <div className="max-w-md mx-auto text-center py-12 px-4 glass-panel space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 mx-auto glow-amber">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-black text-slate-100 tracking-tight">{t('admin_locked_title')}</h2>
        <p className="text-xs text-slate-400 font-medium">
          {t('admin_locked_desc')}
        </p>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={toggleAdminMode}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 cursor-pointer glow-amber"
        >
          {t('admin_enable_btn')}
        </motion.button>
      </div>
    );
  }

  const pendingDeposits = deposits.filter((d) => d.status === 'PENDING' || d.status === 'AI_REVIEW');
  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'PENDING');

  const handleAddBankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBankName.trim() || !newAccNo.trim()) {
      showToast(t('admin_err_bank_fields') || 'Please fill bank name and account number');
      return;
    }
    addBankAccount(newBankName.trim(), newHolder.trim(), newAccNo.trim(), newBranch.trim());
    setNewBankName('');
    setNewHolder('');
    setNewAccNo('');
    setNewBranch('');
  };

  const startEditBank = (bank: BankAccount) => {
    setEditingBankId(bank.id);
    setEditBankName(bank.bankName);
    setEditHolder(bank.accountHolder);
    setEditAccNo(bank.accountNumber);
    setEditBranch(bank.branch || 'Main Branch');
    setEditIsActive(bank.isActive);
  };

  const handleUpdateBankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBankId === null) return;
    if (!editBankName.trim() || !editAccNo.trim()) {
      showToast('Please fill bank name and account number');
      return;
    }
    updateBankAccount(editingBankId, editBankName.trim(), editHolder.trim(), editAccNo.trim(), editBranch.trim(), editIsActive);
    setEditingBankId(null);
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <div className="glass-panel p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-amber-500/30 glow-amber">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-100 tracking-tight">{t('admin_screen_title')}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider">{t('admin_live_badge')}</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">{t('admin_screen_sub')}</p>
          </div>
        </div>

        <button
          onClick={toggleAdminMode}
          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition-all cursor-pointer"
        >
          {t('admin_exit_btn')}
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'deposits', label: t('admin_tab_deposits', { count: pendingDeposits.length }), icon: ArrowDownCircle },
          { id: 'payouts', label: t('admin_tab_payouts', { count: pendingWithdrawals.length }), icon: ArrowUpCircle },
          { id: 'analytics', label: t('admin_tab_analytics'), icon: BarChart3 },
          { id: 'logs', label: t('admin_tab_logs'), icon: ListOrdered },
          { id: 'addbank', label: t('admin_tab_addbank'), icon: PlusCircle }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap flex items-center gap-2 border transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/20 glow-amber'
                  : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      {adminTab === 'deposits' && (
        <div className="space-y-3">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
            {t('admin_pending_dep_heading')}
          </h3>

          {pendingDeposits.length === 0 ? (
            <div className="glass-panel p-8 text-center text-slate-400 text-xs font-bold">
              {t('admin_no_pending_dep')}
            </div>
          ) : (
            pendingDeposits.map((dep) => (
              <div
                key={dep.id}
                className="glass-panel p-4 space-y-3.5"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-100">{t('tx_deposit_slip', { id: dep.id })}</span>
                      <StatusBadge status={dep.status} />
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">
                      {t('home_player_id')}: <strong className="text-cyan-300">{dep.playerId}</strong> | {dep.bankName}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-cyan-300">{formatCurrency(dep.amount)}</span>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Ref: {dep.reference || "N/A"}
                    </span>
                  </div>
                </div>

                {dep.aiResult && (
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 flex items-start gap-2.5 font-medium">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{dep.aiResult}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => approveDeposit(dep.id)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer glow-cyan"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t('admin_approve_dep_btn')}</span>
                  </motion.button>

                  <div className="flex items-center gap-1.5 w-full sm:flex-1">
                    <input
                      type="text"
                      placeholder={t('admin_reject_reason_ph')}
                      value={rejectReasonMap[dep.id] || ''}
                      onChange={(e) => setRejectReasonMap({ ...rejectReasonMap, [dep.id]: e.target.value })}
                      className="flex-1 bg-slate-950/90 border border-slate-800 focus:border-rose-400 rounded-2xl px-3.5 py-2 text-xs text-slate-100 outline-none font-medium"
                    />
                    <button
                      onClick={() => {
                        const reason = rejectReasonMap[dep.id] || 'Invalid transfer slip or reference number';
                        rejectDeposit(dep.id, reason);
                      }}
                      className="px-3.5 py-2 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 text-xs font-black transition-all flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>{t('admin_reject_btn')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {adminTab === 'payouts' && (
        <div className="space-y-3">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
            {t('admin_pending_payout_heading')}
          </h3>

          {pendingWithdrawals.length === 0 ? (
            <div className="glass-panel p-8 text-center text-slate-400 text-xs font-bold">
              {t('admin_no_pending_payout')}
            </div>
          ) : (
            pendingWithdrawals.map((w) => (
              <div
                key={w.id}
                className="glass-panel p-4 space-y-3.5"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-100">{t('tx_payout_request', { id: w.id })}</span>
                      <StatusBadge status={w.status} />
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">
                      {t('home_player_id')}: <strong className="text-amber-300">{w.playerId}</strong> | {w.bankName}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-amber-300">{formatCurrency(w.amount)}</span>
                    <span className="text-[10px] text-slate-400 font-mono block">Code: {w.secretCode}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-1.5 font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('deposit_acc_holder')}:</span>
                    <strong className="text-slate-200">{w.accountHolder}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('deposit_acc_num')}:</span>
                    <strong className="text-amber-300 font-mono">{w.accountNumber}</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder={t('admin_payout_ref_ph')}
                    value={payoutRefMap[w.id] || ''}
                    onChange={(e) => setPayoutRefMap({ ...payoutRefMap, [w.id]: e.target.value })}
                    className="w-full sm:flex-1 bg-slate-950/90 border border-slate-800 focus:border-amber-400 rounded-2xl px-3.5 py-2 text-xs text-slate-100 font-mono outline-none"
                  />
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      const ref = payoutRefMap[w.id] || `PAY-BANK-${Math.floor(1000 + Math.random() * 9000)}`;
                      approveWithdrawal(w.id, ref);
                    }}
                    className="w-full sm:w-auto px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs hover:from-amber-300 hover:to-amber-400 transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer glow-amber"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t('admin_approve_payout_btn')}</span>
                  </motion.button>
                  <button
                    onClick={() => rejectWithdrawal(w.id, "Invalid withdrawal code or account details")}
                    className="w-full sm:w-auto px-3.5 py-2 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 text-xs font-black transition-all flex items-center justify-center gap-1 shrink-0 cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>{t('admin_reject_btn')}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {adminTab === 'analytics' && (
        <VolumeTrendsChart deposits={deposits} withdrawals={withdrawals} />
      )}

      {adminTab === 'logs' && (
        <div className="glass-panel p-4 sm:p-5 space-y-3">
          <h3 className="text-sm font-black text-slate-100 tracking-tight">{t('admin_audit_trail_title')}</h3>
          <div className="space-y-2">
            {adminLogs.map((log) => (
              <div key={log.id} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs flex items-center justify-between font-medium">
                <div>
                  <span className="font-black text-amber-300 mr-2">[{log.action}]</span>
                  <span className="text-slate-200">{log.target}: {log.details}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{formatDate(log.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {adminTab === 'addbank' && (
        <div className="space-y-5 max-w-2xl mx-auto">
          {/* Add Bank Card */}
          <div className="glass-panel p-4 sm:p-5">
            <h3 className="text-base font-black text-slate-100 mb-4 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-amber-300" />
              <span>{t('admin_add_bank_title')}</span>
            </h3>

            <form onSubmit={handleAddBankSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">{t('admin_bank_name_label') || 'Bank Name'}</label>
                  <input
                    type="text"
                    value={newBankName}
                    onChange={(e) => setNewBankName(e.target.value)}
                    placeholder="e.g. Bank of Ceylon (BOC)"
                    required
                    className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl px-3.5 py-2.5 text-slate-100 font-extrabold outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">{t('deposit_acc_holder') || 'Account Holder Name'}</label>
                  <input
                    type="text"
                    value={newHolder}
                    onChange={(e) => setNewHolder(e.target.value)}
                    placeholder="e.g. Fast Cashier Ltd"
                    required
                    className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl px-3.5 py-2.5 text-slate-100 font-extrabold outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">{t('deposit_acc_num') || 'Account Number'}</label>
                  <input
                    type="text"
                    value={newAccNo}
                    onChange={(e) => setNewAccNo(e.target.value)}
                    placeholder="e.g. 883019284"
                    required
                    className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl px-3.5 py-2.5 text-amber-300 font-mono font-black outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">{t('deposit_branch') || 'Branch'}</label>
                  <input
                    type="text"
                    value={newBranch}
                    onChange={(e) => setNewBranch(e.target.value)}
                    placeholder="e.g. Colombo Fort Branch"
                    className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl px-3.5 py-2.5 text-slate-100 font-bold outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 cursor-pointer glow-amber flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t('admin_save_bank_btn')}</span>
              </motion.button>
            </form>
          </div>

          {/* Existing Banks List Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>{t('admin_tab_banks') || 'Manage Existing Bank Accounts'} ({banks.length})</span>
              </h3>
            </div>

            <div className="space-y-3">
              {banks.map((bank) => (
                <div
                  key={bank.id}
                  className="glass-panel p-4 space-y-3 border-slate-800 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🏛️</span>
                        <h4 className="text-base font-black text-cyan-300">{bank.bankName}</h4>
                        {bank.branch && (
                          <span className="text-xs text-slate-400 font-medium">({bank.branch})</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 font-semibold mt-1">
                        Holder: <span className="text-slate-100">{bank.accountHolder}</span>
                      </p>
                      <p className="text-xs font-mono font-bold text-amber-300 mt-0.5">
                        Acc No: {bank.accountNumber}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {/* Active Status Badge */}
                      {bank.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                          <span>Inactive</span>
                        </span>
                      )}

                      {/* Action Buttons: Edit, Toggle, Delete */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <button
                          onClick={() => startEditBank(bank)}
                          className="px-2.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                          title="Edit Bank Details"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => toggleBankAccountStatus(bank.id)}
                          className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                            bank.isActive
                              ? 'bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border-amber-400/30'
                              : 'bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border-emerald-400/30'
                          }`}
                          title={bank.isActive ? "Deactivate Bank" : "Activate Bank"}
                        >
                          <Power className="w-3.5 h-3.5" />
                          <span>{bank.isActive ? 'Disable' : 'Enable'}</span>
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${bank.bankName}?`)) {
                              deleteBankAccount(bank.id);
                            }
                          }}
                          className="px-2 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 border border-rose-400/30 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                          title="Delete Bank"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Bank Modal Overlay */}
          {editingBankId !== null && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-5 sm:p-6 max-w-lg w-full space-y-4 border-cyan-500/40 glow-cyan relative"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-black text-slate-100 flex items-center gap-2">
                    <Pencil className="w-5 h-5 text-cyan-400" />
                    <span>{t('admin_edit_bank_modal_title') || 'Edit Bank Account Details'}</span>
                  </h3>
                  <button
                    onClick={() => setEditingBankId(null)}
                    className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-slate-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleUpdateBankSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">{t('admin_bank_name_label') || 'Bank Name'}</label>
                    <input
                      type="text"
                      value={editBankName}
                      onChange={(e) => setEditBankName(e.target.value)}
                      required
                      className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-slate-100 font-extrabold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">{t('deposit_acc_holder') || 'Account Holder Name'}</label>
                    <input
                      type="text"
                      value={editHolder}
                      onChange={(e) => setEditHolder(e.target.value)}
                      required
                      className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-slate-100 font-extrabold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">{t('deposit_acc_num') || 'Account Number'}</label>
                    <input
                      type="text"
                      value={editAccNo}
                      onChange={(e) => setEditAccNo(e.target.value)}
                      required
                      className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-amber-300 font-mono font-black outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">{t('deposit_branch') || 'Branch'}</label>
                    <input
                      type="text"
                      value={editBranch}
                      onChange={(e) => setEditBranch(e.target.value)}
                      className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-slate-100 font-bold outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-300 font-bold">Account Active Status:</span>
                    <button
                      type="button"
                      onClick={() => setEditIsActive(!editIsActive)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all ${
                        editIsActive
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>{editIsActive ? 'Active (Enabled)' : 'Inactive (Disabled)'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingBankId(null)}
                      className="flex-1 py-3 rounded-2xl bg-slate-900 text-slate-300 hover:bg-slate-800 font-bold text-xs cursor-pointer border border-slate-800 transition-all"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer glow-cyan flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>{t('admin_update_bank_btn') || 'UPDATE DETAILS'}</span>
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

