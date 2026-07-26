# Security Checklist & Best Practices

This document outlines security compliance, data privacy, secret code verification, and permission guardrails for **Fast 1XBet Cashier**.

---

## 🔒 Security Audits & Verification Checklist

- [x] **No Plaintext Banking Credentials**: User online banking passwords/PINs are NEVER requested or stored in the app. Only transaction slip references and account numbers are recorded.
- [x] **Mandatory Withdrawal Secret Code**: All cash payout requests require a Secret Code (`secret_code` field in `WithdrawalEntity`) to prevent unauthorized payout requests.
- [x] **Admin Authentication**: Admin Control Center requires a 4-digit security PIN (`9482`) to prevent unauthorized transaction status modifications.
- [x] **SQL Injection Protection**: Room DB utilizes compiled DAO queries with parameterized bindings, eliminating SQL injection vectors.
- [x] **Permission Minimization**: Only declared permissions are requested:
  * `INTERNET`: Required for external promo link browsing and optional server sync.
  * `POST_NOTIFICATIONS`: Requested dynamically at runtime on Android 13+ (Tiramisu). No dangerous location/camera background permissions forced.
- [x] **Secure Intent Boundaries**: Web browser promo links (`https://reffpa.com/L?tag=d_2481353m_1622c_&site=2481353&ad=1622`) are handled safely via standard Android `Intent.ACTION_VIEW` fallback catches.
- [x] **Prohibited Key Hardcoding**: Sensitive administrative API secrets managed via `.env` and `BuildConfig`.
- [x] **CSV Export Sanitization**: Double-quotes in player input strings are escaped (`""`) during CSV compilation to prevent CSV injection attacks.
