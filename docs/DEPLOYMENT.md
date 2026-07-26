# Deployment Guide

This guide outlines the procedures for building production-ready APKs and Android App Bundles (AAB), signing releases, and distributing updates for **Fast 1XBet Cashier**.

---

## 🔑 Keystore & Signing Configuration

To deploy signed production release builds:

1. Generate a production keystore (if not using an existing release key):
   ```bash
   keytool -genkey -v -keystore release.keystore -alias fast1xbet-alias -keyalg RSA -keysize 2048 -validity 10000
   ```
2. Store `release.keystore` securely.
3. Configure keystore variables in `gradle.properties` or environment variables:
   ```properties
   RELEASE_STORE_FILE=../release.keystore
   RELEASE_STORE_PASSWORD=YourStorePassword
   RELEASE_KEY_ALIAS=fast1xbet-alias
   RELEASE_KEY_PASSWORD=YourKeyPassword
   ```

---

## 🏗️ Building Production Release Artifacts

### 1. Build Universal Signed APK
Run the following Gradle command to generate the release APK:
```bash
./gradlew assembleRelease
```
Output path:
`app/build/outputs/apk/release/app-release.apk`

### 2. Build Android App Bundle (AAB for Google Play)
Run:
```bash
./gradlew bundleRelease
```
Output path:
`app/build/outputs/bundle/release/app-release.aab`

---

## 🚀 Distribution Channels

### Direct APK Distribution
* Upload `app-release.apk` to the official Fast 1XBet Cashier website or Telegram bot channel.
* Provide MD5/SHA256 checksums to verify package integrity:
  ```bash
  sha256sum app/build/outputs/apk/release/app-release.apk
  ```

### Google Play Console Deployment
1. Log into Google Play Console.
2. Select **Fast 1XBet Cashier** app listing.
3. Navigate to **Production > Create new release**.
4. Upload `app-release.aab`.
5. Enter release notes:
   * Updated promo code `VGSL` with 200% bonus integration.
   * Added mandatory Secret Code for withdrawal validation.
   * CSV transaction export support.
   * Local push notifications for payout approvals.
6. Submit for review.
