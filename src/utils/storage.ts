import { BankAccount, IPayNumber, DepositRecord, WithdrawalRecord, ChatMessage, AdminLog, UserSettings } from '../types';

export const SRI_LANKAN_BANKS = [
  "Bank of Ceylon (BOC)",
  "People's Bank",
  "Commercial Bank of Ceylon",
  "Sampath Bank",
  "Hatton National Bank (HNB)",
  "National Savings Bank (NSB)",
  "Seylan Bank",
  "Nations Trust Bank (NTB)",
  "DFCC Bank",
  "NDB Bank (National Development)",
  "Pan Asia Banking Corporation",
  "Union Bank of Colombo",
  "LOLC Finance / LOLC Bank",
  "Amana Bank",
  "Cargills Bank",
  "Regional Development Bank (RDB)",
  "SDB Bank (Sanasa)",
  "HSBC Sri Lanka",
  "Standard Chartered Bank",
  "iPay / Digital Wallet",
  "eZ Cash / mCash",
  "Frimi / Genie / Koko",
  "Other Bank / වෙනත් බැංකුවක්"
];

export const INITIAL_BANKS: BankAccount[] = [
  { id: 1, bankName: "LOLC Bank", accountHolder: "VGS LAKMAL", accountNumber: "01210012722", displayNumber: "01210012722", branch: "Kaluthara", sortKey: 1, isActive: true },
  { id: 2, bankName: "Peoples Bank", accountHolder: "VGS LAKMAL", accountNumber: "120200380030196", displayNumber: "120200380030196", branch: "Walasmulla", sortKey: 2, isActive: true },
  { id: 3, bankName: "Sampath Bank", accountHolder: "NKS OSHADHI", accountNumber: "105456146706", displayNumber: "105456146706", branch: "Neluwa", sortKey: 3, isActive: true },
  { id: 4, bankName: "BOC Bank", accountHolder: "VGS LAKMAL", accountNumber: "95645895", displayNumber: "95645895", branch: "Walasmulla", sortKey: 4, isActive: true }
];

export const INITIAL_IPAY_NUMBERS: IPayNumber[] = [
  { id: 1, phone: "076 5865387", name: "Lakmal" },
  { id: 2, phone: "071 1230791", name: "Mahesh" }
];

export const INITIAL_DEPOSITS: DepositRecord[] = [
  {
    id: 101,
    playerId: "98234156",
    bankName: "Bank of Ceylon (BOC)",
    amount: 15000,
    status: "APPROVED",
    createdAt: Date.now() - 3600000 * 2,
    reference: "BOC20260725X89",
    sender: "K. Perera",
    receiver: "8839201923",
    aiResult: "AI OCR Slip Verified: Legitimate Bank Transfer Stamp Detected (Confidence: 98%)"
  },
  {
    id: 102,
    playerId: "77412980",
    bankName: "Commercial Bank",
    amount: 50000,
    status: "APPROVED",
    createdAt: Date.now() - 3600000 * 6,
    reference: "COMB20260725M11",
    sender: "S. Fernando",
    receiver: "9876543210",
    aiResult: "AI OCR Slip Verified: Genuine Electronic Receipt"
  },
  {
    id: 103,
    playerId: "98234156",
    bankName: "People's Bank",
    amount: 5000,
    status: "PENDING",
    createdAt: Date.now() - 1800000,
    reference: "PEOP20260726Z01",
    sender: "K. Perera",
    receiver: "0192837465",
    aiResult: "AI Reviewing Slip Image Quality and Stamp Signature..."
  },
  {
    id: 104,
    playerId: "55819234",
    bankName: "Sampath Bank",
    amount: 25000,
    status: "AI_REVIEW",
    createdAt: Date.now() - 900000,
    reference: "SAMP20260726Q99",
    sender: "R. Jayasinghe",
    receiver: "1234567890",
    aiResult: "AI Warning: Blurred transaction reference number detected. Manual admin review needed."
  }
];

export const INITIAL_WITHDRAWALS: WithdrawalRecord[] = [
  {
    id: 201,
    playerId: "98234156",
    bankName: "Bank of Ceylon (BOC)",
    amount: 12000,
    status: "APPROVED",
    createdAt: Date.now() - 3600000 * 12,
    accountHolder: "K. Perera",
    accountNumber: "8839201923",
    secretCode: "998214",
    payoutReference: "PAY-BOC-99214"
  },
  {
    id: 202,
    playerId: "98234156",
    bankName: "Commercial Bank",
    amount: 30000,
    status: "PENDING",
    createdAt: Date.now() - 1200000,
    accountHolder: "K. Perera",
    accountNumber: "9876543210",
    secretCode: "441209"
  }
];

export const INITIAL_USER_SETTINGS: UserSettings = {
  savedPlayerId: "98234156",
  savedBank: "Bank of Ceylon (BOC)",
  lang: "si",
  privacyPref: "standard",
  waDepApprovedTemplate: "✅ *FAST 1XBET DEPOSIT APPROVED*\n\nHello {PLAYER_ID},\nYour deposit of *{AMOUNT} LKR* via {BANK} has been successfully credited!\nRef: {REF}",
  waDepPendingTemplate: "⏳ *DEPOSIT UNDER REVIEW*\n\nHello {PLAYER_ID},\nYour deposit slip for *{AMOUNT} LKR* ({BANK}) is under review by Fast Cashier AI. Please allow 2-5 minutes.",
  waDepRejectedTemplate: "❌ *DEPOSIT REJECTED*\n\nHello {PLAYER_ID},\nYour deposit for *{AMOUNT} LKR* was rejected.\nReason: {REASON}\nPlease verify your slip and try again.",
  waWithApprovedTemplate: "💸 *1XBET PAYOUT PROCESSED*\n\nHello {PLAYER_ID},\nYour payout of *{AMOUNT} LKR* to {BANK} ({ACCOUNT_NO}) has been sent!\nBank Payout Ref: {PAYOUT_REF}",
  waWithPendingTemplate: "⏳ *PAYOUT PROCESSING*\n\nHello {PLAYER_ID},\nYour withdrawal request for *{AMOUNT} LKR* is queued and processing.",
  waWithRejectedTemplate: "❌ *PAYOUT REJECTED*\n\nHello {PLAYER_ID},\nYour withdrawal request for *{AMOUNT} LKR* was rejected.\nReason: {REASON}"
};

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    content: "<b>Hello! Welcome to 1XBet Sri Lanka Cashier Support.</b><br/>I can assist you with instant bank deposits, withdrawal limits, promo code <b>VGSL</b> (200% bonus), and deposit verification.",
    timestamp: Date.now() - 3600000
  }
];

export const INITIAL_LOGS: AdminLog[] = [
  { id: 1, timestamp: Date.now() - 3600000 * 2, action: "DEPOSIT_APPROVED", target: "Deposit #101", details: "Approved LKR 15,000 for Player 98234156" },
  { id: 2, timestamp: Date.now() - 3600000 * 12, action: "PAYOUT_APPROVED", target: "Withdrawal #201", details: "Paid LKR 12,000 to BOC 8839201923" }
];
