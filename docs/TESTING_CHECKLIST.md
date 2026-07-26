# Testing & Quality Assurance Checklist

This checklist is used by QA engineers and developers before issuing a build for **Fast 1XBet Cashier**.

---

## 🧪 Functional Test Cases

### 1. Promo Code & Link Integration
- [ ] Tap **Copy Promo Code** on Home Screen: Toast displays `"Promo Code 'VGSL' copied!"`.
- [ ] Tap **REGISTER** button on Home Screen: Opens browser to `https://reffpa.com/L?tag=d_2481353m_1622c_&site=2481353&ad=1622`.
- [ ] Ask AI Chat Assistant *"What is the promo code?"*: Assistant responds with promo code `VGSL` and 200% bonus registration details.

### 2. Deposit Flow
- [ ] Submit valid deposit (Amount >= 500 LKR, valid 1XBet Player ID, bank selection, slip reference): Toast `"Deposit submitted!"` appears.
- [ ] Local push notification `"Deposit Submitted ⏳"` appears in Android status bar.
- [ ] Deposit record displays with status `PENDING` under **History**.
- [ ] Try submitting deposit with amount < 500 LKR: Validation warning toast appears.

### 3. Withdrawal Flow
- [ ] Submit withdrawal (Amount >= 1,000 LKR, bank account number, account holder name, and Secret Code `1XBET-SEC-9482`): Toast `"Withdrawal request submitted!"` appears.
- [ ] Push notification `"Withdrawal Submitted ⏳"` is posted.
- [ ] Secret code is displayed in detail view in History and Admin Center.

### 4. Admin Center Flow
- [ ] Open Settings > Enter Admin PIN `9482` > Admin Center tab unlocks.
- [ ] In Admin Center > Pending Deposits, tap **APPROVE** for deposit: Status updates to `APPROVED`.
- [ ] Push notification `"Deposit Approved! ✅"` is received.
- [ ] In Pending Withdrawals, tap **APPROVE & PAY** > Enter Bank Payout Ref: Status updates to `APPROVED`.
- [ ] Push notification `"Withdrawal Paid Out! 💰"` is received.

### 5. CSV Export Flow
- [ ] Navigate to **History** > Tap **EXPORT CSV**.
- [ ] File `Fast1XBet_History_<timestamp>.csv` is saved to device.
- [ ] Toast displays CSV export path and native share chooser opens.
- [ ] Verify CSV contents contain correct headers and double-quoted escaped player data.

---

## 📱 UI & Layout Checks
- [ ] Test on Dark Mode & Light Mode: Text contrast remains crisp and legible.
- [ ] Test on Compact Phone screens & Tablet wide screens: Layout scales gracefully without clipping.
- [ ] All interactive elements (buttons, text fields, menu items) have `testTag` modifiers for automated testing.
