# ProGuard rules for this project

# Keep all public and protected classes and their public and protected members
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep custom application classes
-keep class com.example.apk_new_ui.** { *; }

# Keep model classes
-keep class com.example.apk_new_ui.data.model.** { *; }

# Keep Retrofit serialization classes
-keepclasseswithmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}

# Keep Gson classes
-keep class com.google.gson.** { *; }
-keep interface com.google.gson.** { *; }

# Keep Retrofit classes
-keep class retrofit2.** { *; }
-keep interface retrofit2.** { *; }

# Keep OkHttp classes
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }

# Keep Room classes
-keep class androidx.room.** { *; }
-keep interface androidx.room.** { *; }

# Keep AppCompat classes
-keep class androidx.** { *; }
-keep interface androidx.** { *; }

# Remove logging in release builds
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
}