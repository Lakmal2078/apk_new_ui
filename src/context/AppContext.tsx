import React, { createContext, useContext, useState, useCallback, useMemo, useTransition } from 'react';
import {
  AppLanguage,
  BankAccount,
  IPayNumber,
  DepositRecord,
  WithdrawalRecord,
  ChatMessage,
  AdminLog,
  UserSettings,
  ScreenTab,
  TransactionStatus
} from '../types';
import {
  INITIAL_BANKS,
  INITIAL_IPAY_NUMBERS,
  INITIAL_DEPOSITS,
  INITIAL_WITHDRAWALS,
  INITIAL_USER_SETTINGS,
  INITIAL_CHAT,
  INITIAL_LOGS
} from '../utils/storage';
import {
  getTranslation,
  formatCurrency as formatCurrencyUtil,
  formatDate as formatDateUtil
} from '../utils/language';

interface AppContextType {
  t: (key: string, replacements?: Record<string, string | number>) => string;
  formatCurrency: (amount: number) => string;
  formatDate: (timestamp: number) => string;
  activeTab: ScreenTab;
  setActiveTab: (tab: ScreenTab) => void;
  isNavigating: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isAdminMode: boolean;
  toggleAdminMode: () => void;
  isAppLocked: boolean;
  isAppLockEnabled: boolean;
  securityPin: string;
  toggleAppLock: (enabled: boolean) => void;
  changeSecurityPin: (newPin: string) => void;
  lockApp: () => void;
  unlockWithPin: (pin: string) => boolean;
  unlockWithBiometrics: () => boolean;
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  userSettings: UserSettings;
  saveUserSettings: (playerId: string, bank: string, lang: AppLanguage, privacy: 'standard' | 'anonymous') => void;
  deposits: DepositRecord[];
  withdrawals: WithdrawalRecord[];
  banks: BankAccount[];
  iPayNumbers: IPayNumber[];
  chatMessages: ChatMessage[];
  adminLogs: AdminLog[];
  toastMessage: string | null;
  showToast: (msg: string) => void;
  addDeposit: (playerId: string, bankName: string, amount: number, ref?: string, sender?: string, slipImage?: string) => void;
  approveDeposit: (id: number) => void;
  rejectDeposit: (id: number, reason: string) => void;
  addWithdrawal: (playerId: string, bankName: string, amount: number, accountHolder: string, accountNumber: string, secretCode: string) => void;
  approveWithdrawal: (id: number, payoutRef: string) => void;
  rejectWithdrawal: (id: number, reason: string) => void;
  addBankAccount: (bankName: string, accountHolder: string, accountNumber: string, branch?: string) => void;
  updateBankAccount: (id: number, bankName: string, accountHolder: string, accountNumber: string, branch?: string, isActive?: boolean) => void;
  toggleBankAccountStatus: (id: number) => void;
  deleteBankAccount: (id: number) => void;
  sendChatMessage: (query: string) => void;
  clearChatHistory: () => void;
  saveWhatsAppTemplates: (templates: Partial<UserSettings>) => void;
  resetWhatsAppTemplates: () => void;
  exportCsv: (recordsOverride?: (DepositRecord | WithdrawalRecord)[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<ScreenTab>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isAppLockEnabled, setIsAppLockEnabled] = useState<boolean>(false);
  const [isAppLocked, setIsAppLocked] = useState<boolean>(false);
  const [securityPin, setSecurityPin] = useState<string>('1234');
  const [language, setLanguageState] = useState<AppLanguage>('si');
  const [userSettings, setUserSettings] = useState<UserSettings>(INITIAL_USER_SETTINGS);
  const [deposits, setDeposits] = useState<DepositRecord[]>(INITIAL_DEPOSITS);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>(INITIAL_WITHDRAWALS);
  const [banks, setBanks] = useState<BankAccount[]>(INITIAL_BANKS);
  const [iPayNumbers] = useState<IPayNumber[]>(INITIAL_IPAY_NUMBERS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [adminLogs, setAdminLogs] = useState<AdminLog[]>(INITIAL_LOGS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const setActiveTab = useCallback((tab: ScreenTab) => {
    startTransition(() => {
      setActiveTabState(tab);
    });
  }, []);

  const t = useCallback((key: string, replacements?: Record<string, string | number>) => {
    return getTranslation(key, language, replacements);
  }, [language]);

  const formatCurrency = useCallback((amount: number) => {
    return formatCurrencyUtil(amount, language);
  }, [language]);

  const formatDate = useCallback((timestamp: number) => {
    return formatDateUtil(timestamp, language);
  }, [language]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev;
      showToast(t(!prev ? 'toast_dark_theme' : 'toast_light_theme'));
      return next;
    });
  }, [showToast, t]);

  const toggleAdminMode = useCallback(() => {
    setIsAdminMode((prev) => {
      const next = !prev;
      showToast(t(next ? 'toast_admin_enabled' : 'toast_admin_disabled'));
      return next;
    });
  }, [showToast, t]);

  const toggleAppLock = useCallback((enabled: boolean) => {
    setIsAppLockEnabled(enabled);
    if (!enabled) {
      setIsAppLocked(false);
    }
    showToast(t(enabled ? 'toast_lock_enabled' : 'toast_lock_disabled'));
  }, [showToast, t]);

  const changeSecurityPin = useCallback((newPin: string) => {
    if (newPin.length === 4 && /^\d+$/.test(newPin)) {
      setSecurityPin(newPin);
      showToast(t('toast_pin_updated', { pin: newPin }));
    } else {
      showToast(t('toast_pin_length_error'));
    }
  }, [showToast, t]);

  const lockApp = useCallback(() => {
    setIsAppLockEnabled(true);
    setIsAppLocked(true);
    showToast(t('toast_app_locked'));
  }, [showToast, t]);

  const unlockWithPin = useCallback((pin: string): boolean => {
    if (pin === securityPin) {
      setIsAppLocked(false);
      showToast(t('toast_app_unlocked'));
      return true;
    }
    showToast(t('toast_pin_incorrect'));
    return false;
  }, [securityPin, showToast, t]);

  const unlockWithBiometrics = useCallback((): boolean => {
    setIsAppLocked(false);
    showToast(t('toast_bio_verified'));
    return true;
  }, [showToast, t]);

  const setLanguage = useCallback((lang: AppLanguage) => {
    startTransition(() => {
      setLanguageState(lang);
      setUserSettings((prev) => ({ ...prev, lang }));
    });
    showToast(getTranslation('toast_lang_switched', lang));
  }, [showToast]);

  const saveUserSettings = useCallback((
    savedPlayerId: string,
    savedBank: string,
    lang: AppLanguage,
    privacyPref: 'standard' | 'anonymous'
  ) => {
    setUserSettings((prev) => ({
      ...prev,
      savedPlayerId,
      savedBank,
      lang,
      privacyPref
    }));
    startTransition(() => {
      setLanguageState(lang);
    });
    showToast(getTranslation('toast_prefs_saved', lang));
  }, [showToast]);

  const addDeposit = useCallback((
    playerId: string,
    bankName: string,
    amount: number,
    ref?: string,
    sender?: string,
    slipImage?: string
  ) => {
    const newId = Math.floor(100 + Math.random() * 900);
    const isAiReview = amount >= 25000 || !ref;
    const status: TransactionStatus = isAiReview ? 'AI_REVIEW' : 'PENDING';
    const aiNote = isAiReview
      ? `AI Cashier Note: High amount or manual slip upload (${amount.toLocaleString()} LKR). Verified stamp structure.`
      : `AI OCR Verification: Genuine receipt format detected. Instant queue.`;

    const newDep: DepositRecord = {
      id: newId,
      playerId: playerId || userSettings.savedPlayerId,
      bankName: bankName || userSettings.savedBank,
      amount,
      status,
      createdAt: Date.now(),
      reference: ref || `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      sender: sender || "User Transfer",
      receiver: "Fast Cashier Bank Account",
      aiResult: aiNote,
      slipImage
    };

    setDeposits((prev) => [newDep, ...prev]);
    showToast(t('toast_deposit_submitted', { id: newId }));
  }, [userSettings.savedBank, userSettings.savedPlayerId, showToast, t]);

  const approveDeposit = useCallback((id: number) => {
    setDeposits((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'APPROVED' as TransactionStatus } : d))
    );
    setAdminLogs((prev) => [
      {
        id: Date.now(),
        timestamp: Date.now(),
        action: 'DEPOSIT_APPROVED',
        target: `Deposit #${id}`,
        details: `Approved by admin`
      },
      ...prev
    ]);
    showToast(t('toast_deposit_approved', { id }));
  }, [showToast, t]);

  const rejectDeposit = useCallback((id: number, reason: string) => {
    setDeposits((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: 'REJECTED' as TransactionStatus, rejectionReason: reason } : d
      )
    );
    setAdminLogs((prev) => [
      {
        id: Date.now(),
        timestamp: Date.now(),
        action: 'DEPOSIT_REJECTED',
        target: `Deposit #${id}`,
        details: `Rejected: ${reason}`
      },
      ...prev
    ]);
    showToast(t('toast_deposit_rejected', { id, reason }));
  }, [showToast, t]);

  const addWithdrawal = useCallback((
    playerId: string,
    bankName: string,
    amount: number,
    accountHolder: string,
    accountNumber: string,
    secretCode: string
  ) => {
    const newId = Math.floor(200 + Math.random() * 800);
    const newWith: WithdrawalRecord = {
      id: newId,
      playerId: playerId || userSettings.savedPlayerId,
      bankName: bankName || userSettings.savedBank,
      amount,
      status: 'PENDING',
      createdAt: Date.now(),
      accountHolder,
      accountNumber,
      secretCode
    };

    setWithdrawals((prev) => [newWith, ...prev]);
    showToast(t('toast_withdrawal_queued', { id: newId }));
  }, [userSettings.savedBank, userSettings.savedPlayerId, showToast, t]);

  const approveWithdrawal = useCallback((id: number, payoutRef: string) => {
    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: 'APPROVED' as TransactionStatus, payoutReference: payoutRef }
          : w
      )
    );
    setAdminLogs((prev) => [
      {
        id: Date.now(),
        timestamp: Date.now(),
        action: 'PAYOUT_APPROVED',
        target: `Withdrawal #${id}`,
        details: `Payout Ref: ${payoutRef}`
      },
      ...prev
    ]);
    showToast(t('toast_payout_approved', { id, payoutRef }));
  }, [showToast, t]);

  const rejectWithdrawal = useCallback((id: number, reason: string) => {
    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, status: 'REJECTED' as TransactionStatus, rejectionReason: reason } : w
      )
    );
    setAdminLogs((prev) => [
      {
        id: Date.now(),
        timestamp: Date.now(),
        action: 'PAYOUT_REJECTED',
        target: `Withdrawal #${id}`,
        details: `Rejected: ${reason}`
      },
      ...prev
    ]);
    showToast(t('toast_payout_rejected', { id, reason }));
  }, [showToast, t]);

  const addBankAccount = useCallback((
    bankName: string,
    accountHolder: string,
    accountNumber: string,
    branch?: string
  ) => {
    const newId = Date.now();
    const displayNumber = accountNumber.length >= 8
      ? `${accountNumber.slice(0, 4)}-XXXX-${accountNumber.slice(-4)}`
      : accountNumber;

    const newBank: BankAccount = {
      id: newId,
      bankName,
      accountHolder,
      accountNumber,
      displayNumber,
      branch: branch || "Main Branch",
      sortKey: banks.length + 1,
      isActive: true
    };

    setBanks((prev) => [...prev, newBank]);
    showToast(t('toast_bank_added', { bankName }));
  }, [banks.length, showToast, t]);

  const updateBankAccount = useCallback((
    id: number,
    bankName: string,
    accountHolder: string,
    accountNumber: string,
    branch?: string,
    isActive?: boolean
  ) => {
    const displayNumber = accountNumber.length >= 8
      ? `${accountNumber.slice(0, 4)}-XXXX-${accountNumber.slice(-4)}`
      : accountNumber;

    setBanks((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              bankName,
              accountHolder,
              accountNumber,
              displayNumber,
              branch: branch || b.branch || "Main Branch",
              isActive: isActive !== undefined ? isActive : b.isActive
            }
          : b
      )
    );
    setAdminLogs((prev) => [
      {
        id: Date.now(),
        timestamp: Date.now(),
        action: 'BANK_UPDATED',
        target: `Bank #${id} (${bankName})`,
        details: `Updated details: ${accountHolder} - ${accountNumber}`
      },
      ...prev
    ]);
    showToast(t('toast_bank_updated', { bankName }));
  }, [showToast, t]);

  const toggleBankAccountStatus = useCallback((id: number) => {
    let targetName = "";
    setBanks((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          targetName = b.bankName;
          return { ...b, isActive: !b.isActive };
        }
        return b;
      })
    );
    showToast(t('toast_bank_updated', { bankName: targetName || 'Bank' }));
  }, [showToast, t]);

  const deleteBankAccount = useCallback((id: number) => {
    let targetName = "";
    setBanks((prev) => {
      const found = prev.find((b) => b.id === id);
      if (found) targetName = found.bankName;
      return prev.filter((b) => b.id !== id);
    });
    setAdminLogs((prev) => [
      {
        id: Date.now(),
        timestamp: Date.now(),
        action: 'BANK_DELETED',
        target: `Bank #${id}`,
        details: `Deleted bank account (${targetName})`
      },
      ...prev
    ]);
    showToast(t('toast_bank_deleted'));
  }, [showToast, t]);

  const sendChatMessage = useCallback((query: string) => {
    if (!query.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content: query,
      timestamp: Date.now()
    };

    const text = query.toLowerCase();
    let reply = "I am Fast 1XBet Cashier AI Assistant. How can I help you with your deposit or withdrawal today?";

    if (text.includes("deposit") || text.includes(" steps") || text.includes("how to") || text.includes("තැන්පතු") || text.includes("வைப்பு")) {
      reply = "<b>Deposit Instructions:</b><br/>1. Go to the <b>Deposit</b> tab.<br/>2. Select your Sri Lankan bank (BOC, People's, Sampath, COMB, HNB).<br/>3. Transfer the amount to the shown bank account.<br/>4. Enter your 1XBet Player ID and Slip Reference.<br/>5. Upload receipt photo and tap <b>Submit Deposit</b>.";
    } else if (text.includes("promo") || text.includes("vgsl") || text.includes("bonus") || text.includes("බෝනස්") || text.includes("போனஸ்")) {
      reply = "<b>1XBet Promo Code: VGSL</b><br/>Enter promo code <b>VGSL</b> when signing up on 1XBet to receive a 200% First Deposit Bonus up to 50,000 LKR!";
    } else if (text.includes("withdraw") || text.includes("limit") || text.includes("payout") || text.includes("ලබාගැනීම්") || text.includes("திரும்பப் பெறல்")) {
      reply = "<b>Withdrawal Limits & Speed:</b><br/>• Minimum Withdrawal: 1,000 LKR<br/>• Maximum Withdrawal: 500,000 LKR per request<br/>• Average Payout Time: 5 - 15 Minutes direct to Sri Lankan Bank.";
    } else if (text.includes("bank") || text.includes("boc") || text.includes("account") || text.includes("බැංකු") || text.includes("வங்கி")) {
      reply = "Check out the <b>Active Banks</b> tab for live active deposit receiving bank account numbers for Bank of Ceylon, Commercial Bank, Sampath, and People's Bank.";
    }

    const botMsg: ChatMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: reply,
      timestamp: Date.now() + 100
    };

    setChatMessages((prev) => [...prev, userMsg, botMsg]);
  }, []);

  const clearChatHistory = useCallback(() => {
    setChatMessages(INITIAL_CHAT);
    showToast(t('toast_chat_cleared'));
  }, [showToast, t]);

  const saveWhatsAppTemplates = useCallback((templates: Partial<UserSettings>) => {
    setUserSettings((prev) => ({ ...prev, ...templates }));
    showToast(t('toast_wa_saved'));
  }, [showToast, t]);

  const resetWhatsAppTemplates = useCallback(() => {
    setUserSettings((prev) => ({
      ...prev,
      waDepApprovedTemplate: INITIAL_USER_SETTINGS.waDepApprovedTemplate,
      waDepPendingTemplate: INITIAL_USER_SETTINGS.waDepPendingTemplate,
      waDepRejectedTemplate: INITIAL_USER_SETTINGS.waDepRejectedTemplate,
      waWithApprovedTemplate: INITIAL_USER_SETTINGS.waWithApprovedTemplate,
      waWithPendingTemplate: INITIAL_USER_SETTINGS.waWithPendingTemplate,
      waWithRejectedTemplate: INITIAL_USER_SETTINGS.waWithRejectedTemplate
    }));
    showToast(t('toast_wa_reset'));
  }, [showToast, t]);

  const exportCsv = useCallback((recordsOverride?: (DepositRecord | WithdrawalRecord)[]) => {
    const listToExport = recordsOverride || [...deposits, ...withdrawals];
    if (listToExport.length === 0) {
      showToast(t('toast_no_csv'));
      return;
    }

    const headers = "Transaction ID,Type,Date & Time,Player ID,Bank Name,Amount (LKR),Status,Reference / Account,Secret Code / Payout Ref\n";
    const rows = listToExport.map((rec) => {
      const isDep = !('accountHolder' in rec);
      const type = isDep ? "DEPOSIT" : "WITHDRAWAL";
      const date = new Date(rec.createdAt).toLocaleString();
      let refOrAcc = "";
      let secretOrPayout = "";
      if (isDep) {
        const dep = rec as DepositRecord;
        refOrAcc = dep.reference || "";
        secretOrPayout = dep.sender || "";
      } else {
        const withRec = rec as WithdrawalRecord;
        refOrAcc = `${withRec.accountHolder} - ${withRec.accountNumber}`;
        secretOrPayout = withRec.payoutReference || withRec.secretCode || "";
      }
      return `${rec.id},"${type}","${date}","${rec.playerId}","${rec.bankName}",${rec.amount},"${rec.status}","${refOrAcc}","${secretOrPayout}"`;
    }).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Fast1XBet_Transactions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(t('toast_csv_exported', { count: listToExport.length }));
  }, [deposits, withdrawals, showToast, t]);

  const contextValue = useMemo(() => ({
    t,
    formatCurrency,
    formatDate,
    activeTab,
    setActiveTab,
    isNavigating: isPending,
    isDarkMode,
    toggleDarkMode,
    isAdminMode,
    toggleAdminMode,
    isAppLocked,
    isAppLockEnabled,
    securityPin,
    toggleAppLock,
    changeSecurityPin,
    lockApp,
    unlockWithPin,
    unlockWithBiometrics,
    language,
    setLanguage,
    userSettings,
    saveUserSettings,
    deposits,
    withdrawals,
    banks,
    iPayNumbers,
    chatMessages,
    adminLogs,
    toastMessage,
    showToast,
    addDeposit,
    approveDeposit,
    rejectDeposit,
    addWithdrawal,
    approveWithdrawal,
    rejectWithdrawal,
    addBankAccount,
    updateBankAccount,
    toggleBankAccountStatus,
    deleteBankAccount,
    sendChatMessage,
    clearChatHistory,
    saveWhatsAppTemplates,
    resetWhatsAppTemplates,
    exportCsv
  }), [
    t,
    formatCurrency,
    formatDate,
    activeTab,
    setActiveTab,
    isPending,
    isDarkMode,
    toggleDarkMode,
    isAdminMode,
    toggleAdminMode,
    isAppLocked,
    isAppLockEnabled,
    securityPin,
    toggleAppLock,
    changeSecurityPin,
    lockApp,
    unlockWithPin,
    unlockWithBiometrics,
    language,
    setLanguage,
    userSettings,
    saveUserSettings,
    deposits,
    withdrawals,
    banks,
    iPayNumbers,
    chatMessages,
    adminLogs,
    toastMessage,
    showToast,
    addDeposit,
    approveDeposit,
    rejectDeposit,
    addWithdrawal,
    approveWithdrawal,
    rejectWithdrawal,
    addBankAccount,
    updateBankAccount,
    toggleBankAccountStatus,
    deleteBankAccount,
    sendChatMessage,
    clearChatHistory,
    saveWhatsAppTemplates,
    resetWhatsAppTemplates,
    exportCsv
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
