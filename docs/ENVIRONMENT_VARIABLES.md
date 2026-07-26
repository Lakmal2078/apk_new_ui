# Environment Variables & Configuration

This document specifies all runtime environment variables, Gradle build configuration fields, and application secrets managed via `.env` and `BuildConfig`.

---

## 🔒 Secrets Management via Secrets Gradle Plugin

Sensible keys and operational parameters are managed using the Secrets Gradle Plugin and read from `.env` or injected during build time. **Never commit sensitive API keys or passwords directly to git repositories.**

---

## 📄 `.env.example` Specification

```env
# Fast 1XBet Cashier Environment Secrets
APP_ENVIRONMENT=production
PROMO_CODE=VGSL
PROMO_URL=https://reffpa.com/L?tag=d_2481353m_1622c_&site=2481353&ad=1622

# Operational Admin Default Passcodes
ADMIN_DEFAULT_PIN=9482

# Optional External API Endpoint (if connecting to remote server)
API_BASE_URL=https://api.fast1xbetcashier.com/v1/
API_KEY=your_production_api_key_here
```

---

## 🛠️ BuildConfig Access Pattern

In Kotlin source code, parameters configured via Gradle or `.env` are safely accessed via `BuildConfig`:

```kotlin
// Example checking configured base URL or keys safely
val environment = BuildConfig.BUILD_TYPE
val isDebug = BuildConfig.DEBUG
```

### Key Values Hardcoded vs Configurable

| Parameter | Current Value | Access Point | Notes |
| :--- | :--- | :--- | :--- |
| **Promo Code** | `VGSL` | `HomeScreen`, `SettingsScreen`, `AIChatScreen` | Gives 200% Welcome Bonus |
| **Promo Registration Link** | `https://reffpa.com/L?tag=d_2481353m_1622c_&site=2481353&ad=1622` | `HomeScreen`, `SettingsScreen` | Redirects to 1XBet Registration |
| **Withdrawal Secret Code Default** | `1XBET-SEC-9482` | `WithdrawScreen` | Secret validation code for payouts |
| **Minimum Deposit** | 500 LKR | `DepositScreen` | Minimum limit for slip submit |
| **Minimum Withdrawal** | 1,000 LKR | `WithdrawScreen` | Minimum cash payout limit |
