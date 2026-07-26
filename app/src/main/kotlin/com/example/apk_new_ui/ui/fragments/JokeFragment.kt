package com.example.apk_new_ui.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.lifecycleScope
import com.example.apk_new_ui.databinding.FragmentJokeBinding
import com.example.apk_new_ui.viewmodel.JokeViewModel
import kotlinx.coroutines.launch

class JokeFragment : Fragment() {

    private var _binding: FragmentJokeBinding? = null
    private val binding get() = _binding!!
    private val viewModel: JokeViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentJokeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupUI()
        observeViewModel()
        loadRandomJoke()
    }

    private fun setupUI() {
        binding.buttonGetJoke.setOnClickListener {
            loadRandomJoke()
        }
    }

    private fun loadRandomJoke() {
        lifecycleScope.launch {
            viewModel.fetchRandomJoke()
        }
    }

    private fun observeViewModel() {
        lifecycleScope.launch {
            viewModel.joke.collect { joke ->
                if (joke != null) {
                    binding.textJoke.text = joke.setup
                    binding.textPunchline.text = joke.delivery
                    binding.buttonGetJoke.isEnabled = true
                }
            }
        }

        lifecycleScope.launch {
            viewModel.isLoading.collect { isLoading ->
                binding.progressBar.visibility = if (isLoading) View.VISIBLE else View.GONE
                binding.buttonGetJoke.isEnabled = !isLoading
            }
        }

        lifecycleScope.launch {
            viewModel.error.collect { error ->
                if (error != null) {
                    binding.textError.text = error
                    binding.textError.visibility = View.VISIBLE
                } else {
                    binding.textError.visibility = View.GONE
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
