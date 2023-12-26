package com.carrotins.backend.repository.location

data class LocationAddressBoundaryData(
    val address: String,
    val h3: String,
    val sd: String,
)

data class LocationAddressH3Data(
    val h3: String,
    val address: String,
)