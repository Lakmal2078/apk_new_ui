# API & Data Architecture Documentation

This document covers the Room Database layer, Data Access Objects (DAOs), Repository calls, and ViewModel interfaces for **Fast 1XBet Cashier**.

---

## 🗄️ Database Architecture (Room DB - Version 4)

The application uses an offline-first **Room Database** (`AppDatabase`) compiled with Google KSP.

### Entities Overview

1. **`DepositEntity`** (`deposits` table)
   * `id`: Int (Auto-generated Primary Key)
   * `playerId`: String (1XBet Account ID)
   * `bankName`: String (e.g., "Bank of Ceylon (BOC)")
   * `amount`: Double
   * `reference`: String (Slip reference / Ref No)
   * `senderName`: String
   * `receiverAccount`: String
   * `status`: String ("PENDING", "APPROVED", "REJECTED")
   * `rejectionReason`: String?
   * `timestamp`: Long
   * `verifiedBy`: String?

2. **`WithdrawalEntity`** (`withdrawals` table)
   * `id`: Int (Auto-generated Primary Key)
   * `playerId`: String (1XBet Account ID)
   * `amount`: Double
   * `bankName`: String
   * `accountNumber`: String
   * `accountHolder`: String
   * `secretCode`: String (**1XBet Payout Secret Code**)
   * `status`: String ("PENDING", "APPROVED", "REJECTED")
   * `payoutReference`: String?
   * `rejectionReason`: String?
   * `timestamp`: Long
   * `processedBy`: String?

3. **`AdminLogEntity`** (`admin_logs` table)
   * Audit log entity recording all admin decisions, status overrides, and system actions.

4. **`ChatHistoryEntity`** (`chat_history` table)
   * Stores user chat queries and AI Cashier bot responses.

---

## 🔑 Data Access Objects (DAOs)

### `DepositDao`
* `fun getAllDeposits(): Flow<List<DepositEntity>>`
* `fun getDepositsForPlayer(playerId: String): Flow<List<DepositEntity>>`
* `suspend fun insertDeposit(deposit: DepositEntity): Long`
* `suspend fun updateStatus(id: Int, status: String, reason: String?, verifiedBy: String)`

### `WithdrawalDao`
* `fun getAllWithdrawals(): Flow<List<WithdrawalEntity>>`
* `fun getWithdrawalsForPlayer(playerId: String): Flow<List<WithdrawalEntity>>`
* `suspend fun insertWithdrawal(withdrawal: WithdrawalEntity): Long`
* `suspend fun updateStatus(id: Int, status: String, payoutRef: String?, reason: String?, processedBy: String)`

---

## 🔄 ViewModel Methods (`MainViewModel`)

### Deposit Management
* `submitDeposit(playerId, bankName, amount, reference, sender, receiver, onSuccess)`
  * Validates inputs, saves to DB, emits local push notification, logs admin event.
* `approveDeposit(depositId)`
  * Updates status to `APPROVED`, posts notification.
* `rejectDeposit(depositId, reason)`
  * Updates status to `REJECTED`, posts notification.

### Withdrawal Management
* `submitWithdrawal(playerId, amount, bankName, accountNumber, accountHolder, secretCode, onSuccess)`
  * Validates fields & Secret Code, inserts payout record, triggers notification.
* `approveWithdrawal(withdrawalId, payoutRef)`
  * Sets status to `APPROVED`, records bank payout ref, triggers payout notification.
* `rejectWithdrawal(withdrawalId, reason)`
  * Marks status `REJECTED`, triggers rejection notification.

---

## 📊 CSV Export Interface

Implemented via `exportTransactionsCsv(context, records)` in `TransactionHistoryScreen.kt`:
* Exports filtered transaction list (`HistoryRecord.Deposit` & `HistoryRecord.Withdrawal`) into formatted CSV syntax.
* Writes CSV file to `getExternalFilesDir` / `filesDir`.
* Launches native `ACTION_SEND` intent for direct sharing to WhatsApp, Email, Drive, or Telegram.
