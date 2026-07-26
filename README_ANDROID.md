# APK New UI - Android App

Deposit, Withdrawal, Registration, Tips සහ සම්පූර්ණ AI-powered support

## Project Structure

```
apk_new_ui/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── kotlin/
│   │   │   │   └── com/example/apk_new_ui/
│   │   │   │       ├── ui/          # UI Activities and Fragments
│   │   │   │       ├── data/        # Data models and API calls
│   │   │   │       ├── viewmodel/   # ViewModel classes
│   │   │   │       └── utils/       # Utility classes
│   │   │   ├── res/
│   │   │   │   ├── layout/          # Layout XML files
│   │   │   │   ├── drawable/        # Drawable resources
│   │   │   │   ├── values/          # String and color resources
│   │   │   │   └── menu/            # Menu resources
│   │   │   └── AndroidManifest.xml
│   │   └── test/                    # Unit tests
│   ├── build.gradle                 # App-level Gradle configuration
│   └── proguard-rules.pro           # ProGuard configuration
├── build.gradle                     # Project-level Gradle configuration
├── settings.gradle                  # Gradle settings
└── gradle.properties                # Gradle properties
```

## Setup

### Prerequisites
- Android Studio 2023.1 or later
- JDK 11 or later
- Android SDK 34

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Lakmal2078/apk_new_ui.git
cd apk_new_ui
```

2. **Open in Android Studio:**
   - Open Android Studio
   - Select "Open an existing Android Studio project"
   - Navigate to the project folder

3. **Sync Gradle:**
   - Android Studio will automatically sync the project
   - Wait for the Gradle build to complete

4. **Configure Local Properties:**
```bash
cp .env.example .env
# Edit .env with your API endpoints if needed
```

5. **Run the app:**
   - Select a device or emulator
   - Click "Run" or press Shift+F10

## Features

- 💳 **Deposit** - Easy money deposit functionality
- 💸 **Withdrawal** - Simple withdrawal process
- 📝 **Registration** - User registration system
- 💡 **Tips** - Helpful tips and guidance
- 🤖 **AI Support** - AI-powered customer support

## Architecture

This project uses:
- **MVVM** - Model-View-ViewModel architecture
- **Coroutines** - For asynchronous operations
- **Room** - For local database
- **Retrofit** - For API calls
- **Material Design 3** - For UI

## Build Variants

- **Debug** - Development builds with logging enabled
- **Release** - Production builds with ProGuard obfuscation

## Dependencies

### Core Android
- androidx.appcompat:appcompat
- androidx.constraintlayout:constraintlayout
- com.google.android.material:material

### Networking
- com.squareup.retrofit2:retrofit
- com.squareup.okhttp3:okhttp

### Database
- androidx.room:room-runtime

### Concurrency
- org.jetbrains.kotlinx:kotlinx-coroutines-android

## API Integration

### Base URL
Set your API base URL in the `.env` file or in the API configuration.

### Example API Configuration
```kotlin
object ApiConfig {
    const val BASE_URL = "https://api.example.com/"
    const val TIMEOUT = 30L
}
```

## Testing

### Run Unit Tests
```bash
./gradlew test
```

### Run UI Tests (Instrumented Tests)
```bash
./gradlew connectedAndroidTest
```

## Build APK

### Debug APK
```bash
./gradlew assembleDebug
# Output: app/build/outputs/apk/debug/app-debug.apk
```

### Release APK
```bash
./gradlew assembleRelease
# Output: app/build/outputs/apk/release/app-release.apk
```

## Signing Release APK

Create a keystore file:
```bash
keytool -genkey -v -keystore key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key
```

Add to `build.gradle`:
```gradle
signingConfigs {
    release {
        storeFile file("key.jks")
        storePassword "password"
        keyAlias "key"
        keyPassword "password"
    }
}
```

## Code Style

Follow Kotlin coding conventions and Android best practices:
- Use camelCase for variables and functions
- Use UPPER_CASE for constants
- Keep lines under 120 characters
- Add meaningful comments for complex logic

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add new feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## Troubleshooting

### Gradle Build Issues
```bash
./gradlew clean build
```

### Dependency Issues
```bash
./gradlew --refresh-dependencies
```

### Emulator Issues
- Ensure you have Android SDK tools installed
- Create a new AVD through Android Studio Device Manager
- Allocate sufficient RAM to the emulator

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- 📧 Email: support@example.com
- 💬 AI Support: Available in-app

---

**Made with ❤️ by Lakmal2078**
