# Fast 1XBet Cashier (Sri Lanka Cashier Mobile App)

![Fast 1XBet Cashier](https://img.shields.io/badge/Platform-Android-green.svg) ![Kotlin](https://img.shields.io/badge/Language-Kotlin-blue.svg) ![Jetpack Compose](https://img.shields.io/badge/UI-Jetpack%20Compose-navy.svg) ![Room](https://img.shields.io/badge/Database-Room%20KSP-orange.svg)

**Fast 1XBet Cashier** is a high-performance Android mobile cashier application tailored for Sri Lankan 1XBet players and agents. It streamlines deposit verification, automated payout requests with Secret Code protection, real-time push notification updates, AI assistant guidance, and CSV audit exporting.

---

## 🌟 Key Features

* **Instant Bank Deposits**: Supports direct Sri Lankan bank transfers (Bank of Ceylon, Commercial Bank, Hatton National Bank, Sampath Bank, People's Bank, LOLC, iPay). Upload transaction slip images or enter slip reference numbers for automated AI cashier audit.
* **1XBet Payout Request System**: Fast 1XBet account withdrawals specifying player ID, bank account details, and mandatory **Secret Code** verification.
* **Official Promo Code Integration**:
  * **Promo Code**: `VGSL`
  * **Registration Link**: `https://reffpa.com/L?tag=d_2481353m_1622c_&site=2481353&ad=1622`
  * Offers 200% Welcome Bonus on initial registration.
* **Local Push Notifications**: Real-time Android status bar alerts when deposits or withdrawals are submitted, approved, or rejected.
* **Transaction History & CSV Export**: Comprehensive record log with filtering, searching, detail dialogs, and 1-click **CSV Export** to device storage and sharing apps.
* **Admin Control Center**: Built-in agent command center to approve/reject deposit slips, input bank payout reference codes, and view real-time audit logs.
* **AI Cashier Assistant**: Instant chat bot answering queries regarding promo code `VGSL`, deposit procedures, minimum limits, and payout timelines.

---

## 📚 Complete Project Documentation

For detailed operational, administrative, and engineering guides, see the `/docs` directory:

| Document | Description |
| :--- | :--- |
| [Installation Guide](docs/INSTALLATION.md) | Step-by-step developer setup and APK installation guide |
| [Deployment Guide](docs/DEPLOYMENT.md) | Building APK/AAB releases and Google Play Store deployment |
| [Environment Variables](docs/ENVIRONMENT_VARIABLES.md) | Secrets configuration and `.env` setup |
| [API Documentation](docs/API_DOCUMENTATION.md) | Room Database DAOs, ViewModel endpoints, and data contracts |
| [Admin Manual](docs/ADMIN_MANUAL.md) | Operational guidelines for 1XBet agents and transaction admins |
| [User Manual](docs/USER_MANUAL.md) | Step-by-step end-user guide for players requesting deposits/withdrawals |
| [Backup Guide](docs/BACKUP_GUIDE.md) | Database backup, migration, and disaster recovery procedures |
| [Security Checklist](docs/SECURITY_CHECKLIST.md) | Security audit standards, Secret Code compliance, and privacy rules |
| [Testing Checklist](docs/TESTING_CHECKLIST.md) | Quality assurance checklist for builds, notifications, and Room DB |
| [Production Checklist](docs/PRODUCTION_CHECKLIST.md) | Pre-flight launch validation checklist for production release |

---

## 📱 Quick Tech Stack

* **Language**: Kotlin 2.0+
* **UI Framework**: Jetpack Compose with Material Design 3 (M3)
* **Architecture**: MVVM with Kotlin Flow & StateFlow
* **Database**: Room DB with KSP (Version 4 with auto-migrations)
* **Notifications**: Android `NotificationCompat` & Notification Channels (`POST_NOTIFICATIONS`)
* **Export**: Standard CSV file generator with Android File/Sharing Intent

---

## 📄 License
Internal proprietary release for 1XBet Cashier operations in Sri Lanka. All rights reserved.
