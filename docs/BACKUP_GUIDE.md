# Backup, Database Migration & Disaster Recovery Guide

This guide outlines database backup policies, Room database schema versioning, and disaster recovery steps for **Fast 1XBet Cashier**.

---

## 🗄️ Room Database Storage & Schema

* **Database File Name**: `fast1xbet_cashier.db`
* **Current Schema Version**: `4`
* **Location on Android Device**: `/data/data/com.example.fastxbetcash/databases/fast1xbet_cashier.db`

### Schema Evolution History
* **Version 1**: Initial release with `deposits` and `admin_logs` tables.
* **Version 2**: Added `withdrawals` table.
* **Version 3**: Added `chat_history` table for AI Cashier assistant chats.
* **Version 4**: Added `secret_code` column to `withdrawals` table.

---

## 💾 Local Backup Procedures

### Method 1: Export CSV Backup (Recommended for Agents)
1. In the app, navigate to **History**.
2. Clear any filter to include all transaction records.
3. Tap **EXPORT CSV**.
4. Save the generated `.csv` file to external storage, Google Drive, or send via Telegram/Email.

### Method 2: Device File Backup via ADB (For Developers / Admins)
To back up the raw SQLite database directly from a connected device:
```bash
# Pull main database file
adb pull /data/data/com.example.fastxbetcash/databases/fast1xbet_cashier.db ./backups/fast1xbet_cashier_$(date +%Y%m%d).db

# Pull write-ahead log (WAL) and shared memory files if present
adb pull /data/data/com.example.fastxbetcash/databases/fast1xbet_cashier.db-wal ./backups/
adb pull /data/data/com.example.fastxbetcash/databases/fast1xbet_cashier.db-shm ./backups/
```

---

## 🔄 Disaster Recovery Procedure

If a device is lost or corrupted:

1. Install **Fast 1XBet Cashier** on the replacement Android device.
2. If restoring database file via ADB:
   ```bash
   adb push ./backups/fast1xbet_cashier_20260725.db /data/data/com.example.fastxbetcash/databases/fast1xbet_cashier.db
   ```
3. Restart the app. Room will automatically inspect the schema version and verify data integrity.
