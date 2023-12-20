package com.carrotins.backend.service.location

import com.carrotins.backend.repository.location.LocationAddressData
import com.carrotins.backend.repository.location.LocationAddressRepository
import com.uber.h3core.H3Core
import org.springframework.stereotype.Service

@Service
class LocationProfileAddressService (
    private val locationAddressRepository: LocationAddressRepository
) {
    fun getLocationAddress (address: String, ln: String, lt: String) : List<LocationAddressData> {
        var requestParam: String

        if (address == "null") {
            val h3AddressData = H3Core.newInstance()
            val res = 10
            val h3 = h3AddressData.latLngToCellAddress(lt.toDouble(), ln.toDouble(), res)

            requestParam = "h3=$h3"
        } else {
            requestParam = "address=$address"
        }

        println(requestParam)
        return locationAddressRepository.getAddressData(requestParam)
    }
}