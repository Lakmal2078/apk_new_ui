# Admin Manual & Cashier Operations Guide

This manual serves as an operational handbook for 1XBet Cashier agents, platform administrators, and finance personnel managing Sri Lankan bank deposits and payouts through **Fast 1XBet Cashier**.

---

## 🔑 Accessing Admin Control Center

1. Open the application.
2. Tap the **Settings** tab in the navigation bar.
3. Locate **Admin Mode** switch or access code toggle.
4. Input the security PIN (Default: `9482`).
5. Once authenticated, the **Admin Center** tab will unlock in the main bottom navigation bar.

---

## 💵 Managing Player Deposit Slips

When a player transfers funds via online banking (BOC, Sampath, Commercial Bank, HNB, People's, LOLC, iPay) and submits a deposit request:

1. Navigate to **Admin Center > Pending Deposits**.
2. Review the submitted details:
   * **1XBet Player ID**
   * **Bank Name & Sender Name**
   * **Transfer Amount (LKR)**
   * **Bank Reference Number** / **Uploaded Receipt Slip**
3. Verify the incoming transfer on your agent bank account portal or SMS notification.
4. **Approve Deposit**:
   * Click **APPROVE**.
   * The deposit status changes to `APPROVED`.
   * A local push notification `"Deposit Approved! ✅"` is sent to the user.
5. **Reject Deposit**:
   * Click **REJECT**.
   * Enter reason (e.g., *"Reference number invalid"*, *"Funds not received on bank statement"*).
   * The player receives a notification with the rejection reason.

---

## 💸 Processing Player Withdrawals & Payouts

When a player requests a cash withdrawal from their 1XBet account to their local bank:

1. Navigate to **Admin Center > Pending Withdrawals**.
2. Verify the payout request fields:
   * **1XBet Player ID**
   * **Requested Amount (LKR)** (Minimum: 1,000 LKR)
   * **Bank Account Number & Account Holder Name**
   * **Secret Code** (e.g., `1XBET-SEC-9482`)
3. Execute the online bank transfer to the player's account number.
4. **Mark Paid & Approved**:
   * Click **APPROVE / PAY**.
   * Enter the Bank Transaction / Payout Reference Number.
   * Click Confirm.
   * The status changes to `APPROVED`, recording the payout ref.
   * A push notification `"Withdrawal Paid Out! 💰"` alerts the user.
5. **Reject Payout**:
   * Click **REJECT**.
   * Provide explanation (e.g., *"Secret Code invalid"*, *"Bank account name mismatch"*).

---

## 📋 Audit Logging & CSV Reports

* Every approval, rejection, and deposit submission is written to the `admin_logs` table.
* To export records for daily accounting, navigate to **History**, filter by date or type, and tap **EXPORT CSV**.
