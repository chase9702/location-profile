package com.carrotins.backend.repository.location

data class LocationAddressData(
    val address: String,
    val h3: String,
    val geometry: String,
)