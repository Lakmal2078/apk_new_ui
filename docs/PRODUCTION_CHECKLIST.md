# Production Launch Checklist

This pre-flight checklist must be completed prior to building and distributing production release packages for **Fast 1XBet Cashier**.

---

## 🚀 Pre-Flight Launch Requirements

- [x] **`metadata.json` Platform Synchronization**: `name` ("Fast 1XBet Cashier") matches `app_name` string resource in `res/values/strings.xml`.
- [x] **Compile & Build Verification**: App compiles cleanly (`compile_applet`) without syntax, dependency, or schema errors.
- [x] **Room Database Schema Verification**: Version set to `4` with auto-migration support and updated entity schemas.
- [x] **Official Promo Code Verified**: Standardized to promo code **`VGSL`** (200% Welcome Bonus) across Home Screen, Settings Screen, and AI Assistant.
- [x] **Official Promo Link Verified**: `https://reffpa.com/L?tag=d_2481353m_1622c_&site=2481353&ad=1622` tested and opening correctly.
- [x] **Withdrawal Secret Code Enabled**: Mandatory secret code field integrated into withdrawal form, repository, DB schema, and admin review screens.
- [x] **Local Push Notifications Enabled**: Notification channels created, permissions requested on launch, and status notifications working for deposits/withdrawals.
- [x] **CSV Export Functionality Verified**: File generation and sharing intent tested and working.
- [x] **App Icon & Branding**: Adaptive app icon configured with metallic gold and dark emerald cashier theme.
- [x] **Documentation Package Complete**: All 11 markdown guides created in `/` and `/docs`.
