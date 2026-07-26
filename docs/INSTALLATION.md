# Installation Guide

This guide covers installing and setting up the **Fast 1XBet Cashier** Android application for development, testing, and end-user installation.

---

## 🛠️ System Requirements

### For Developers / Build Machines
* **Operating System**: macOS 12+, Linux (Ubuntu 22.04+), or Windows 11 (64-bit)
* **JDK**: OpenJDK 17 or JDK 21
* **Android Studio**: Android Studio Ladybug (2024.2.1+) or newer
* **Android SDK**: API Level 34 (Android 14.0) compile SDK, Minimum API Level 24 (Android 7.0)
* **Gradle**: Gradle 8.x with Kotlin Gradle Plugin 2.0+

### For End-User Android Devices
* **Android OS**: Android 7.0 (API Level 24) or higher
* **Permissions Required**: 
  * `INTERNET` (for server communication & promo link browsing)
  * `POST_NOTIFICATIONS` (Android 13+ status bar notifications)
  * File Storage / Sharing access for CSV export

---

## 📦 Developer Installation & Build Setup

### 1. Clone or Download Project
```bash
git clone https://github.com/your-org/fast1xbet-cashier.git
cd fast1xbet-cashier
```

### 2. Environment Variables Configuration
Copy `.env.example` to `.env` in the root directory:
```bash
cp .env.example .env
```
Ensure your `.env` contains optional keys if external API endpoints are configured.

### 3. Open in Android Studio
1. Launch Android Studio.
2. Click **Open** and select the root directory of `fast1xbet-cashier`.
3. Wait for Gradle sync to complete automatically.

### 4. Build and Run on Emulator / Device
1. Connect a physical Android device via USB debugging or start an Android Virtual Device (AVD).
2. Select the `app` run configuration.
3. Click **Run** (or press `Shift + F10`).

---

## 📱 Sideloading APK on Android Device

1. Build the debug or release APK:
   ```bash
   ./gradlew assembleDebug
   ```
2. The output APK file is located at:
   `app/build/outputs/apk/debug/app-debug.apk`
3. Transfer the APK to the target Android phone via USB, Telegram, or cloud storage.
4. On the device:
   * Open **Settings > Security > Install Unknown Apps**.
   * Enable permission for your file manager / browser.
   * Tap `app-debug.apk` and confirm **Install**.
5. Grant Notification permissions when prompted on first launch to receive payout alerts.
