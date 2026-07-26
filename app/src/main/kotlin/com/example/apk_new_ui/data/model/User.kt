package com.example.apk_new_ui.data.model

import com.google.gson.annotations.SerializedName

data class User(
    @SerializedName("id")
    val id: String,
    @SerializedName("username")
    val username: String,
    @SerializedName("email")
    val email: String,
    @SerializedName("balance")
    val balance: Double = 0.0,
    @SerializedName("createdAt")
    val createdAt: String = ""
)