export type AppLanguage = 'si' | 'en' | 'ta';

export interface LanguageOption {
  code: AppLanguage;
  name: string;
  flag: string;
}

export type TransactionStatus = 'APPROVED' | 'PENDING' | 'REJECTED' | 'AI_REVIEW';

export interface DepositRecord {
  id: number;
  playerId: string;
  bankName: string;
  amount: number;
  status: TransactionStatus;
  createdAt: number;
  reference?: string;
  sender?: string;
  receiver?: string;
  aiResult?: string;
  rejectionReason?: string;
  slipImage?: string;
}

export interface WithdrawalRecord {
  id: number;
  playerId: string;
  bankName: string;
  amount: number;
  status: TransactionStatus;
  createdAt: number;
  accountHolder: string;
  accountNumber: string;
  secretCode: string;
  payoutReference?: string;
  rejectionReason?: string;
}

export interface IPayNumber {
  id: number;
  phone: string;
  name: string;
}

export interface BankAccount {
  id: number;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  displayNumber: string;
  branch?: string;
  sortKey: number;
  isActive: boolean;
}

export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AdminLog {
  id: number;
  timestamp: number;
  action: string;
  target?: string;
  details?: string;
}

export interface UserSettings {
  savedPlayerId: string;
  savedBank: string;
  lang: AppLanguage;
  privacyPref: 'standard' | 'anonymous';
  waDepApprovedTemplate: string;
  waDepPendingTemplate: string;
  waDepRejectedTemplate: string;
  waWithApprovedTemplate: string;
  waWithPendingTemplate: string;
  waWithRejectedTemplate: string;
}

export type ScreenTab = 'home' | 'deposit' | 'withdraw' | 'history' | 'banks' | 'aichat' | 'admin' | 'settings';
