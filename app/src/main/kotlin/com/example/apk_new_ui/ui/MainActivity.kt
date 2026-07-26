package com.example.apk_new_ui.ui

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate
import androidx.fragment.app.Fragment
import com.example.apk_new_ui.R
import com.example.apk_new_ui.databinding.ActivityMainBinding
import com.example.apk_new_ui.ui.fragments.JokeFragment

/**
 * Main Activity - App entry point
 * Hosts fragments and bottom navigation
 */
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Enable Material Design
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM)

        // Setup view binding
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Setup toolbar
        setSupportActionBar(binding.toolbar)
        supportActionBar?.title = getString(R.string.app_name)

        // Setup bottom navigation
        setupBottomNavigation()

        // Load default fragment
        if (savedInstanceState == null) {
            loadFragment(JokeFragment())
        }
    }

    private fun setupBottomNavigation() {
        binding.bottomNav.setOnItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.nav_deposit -> {
                    // TODO: Load deposit fragment
                    true
                }
                R.id.nav_withdrawal -> {
                    // TODO: Load withdrawal fragment
                    true
                }
                R.id.nav_tips -> {
                    // TODO: Load tips fragment
                    true
                }
                R.id.nav_support -> {
                    loadFragment(JokeFragment())
                    true
                }
                else -> false
            }
        }
    }

    private fun loadFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.nav_host_fragment, fragment)
            .commit()
    }
}
