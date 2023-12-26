package com.carrotins.backend.service.location

import com.carrotins.backend.repository.location.LocationAddressBoundaryData
import com.carrotins.backend.repository.location.LocationAddressH3Data
import com.carrotins.backend.repository.location.LocationAddressRepository
import com.uber.h3core.H3Core
import com.uber.h3core.util.LatLng
import org.springframework.stereotype.Service


@Service
class LocationProfileAddressService (
    private val locationAddressRepository: LocationAddressRepository
) {
    fun getLocationAddress (sd: String, ln: String, lt: String) : List<LocationAddressBoundaryData> {
        var requestParam: String

        if (sd == "null") {
            val h3AddressData = H3Core.newInstance()
            val res = 10
            val h3 = h3AddressData.latLngToCellAddress(lt.toDouble(), ln.toDouble(), res)

            requestParam = "h3=$h3"
        } else {
            requestParam = "sd='$sd'"
        }

        println(requestParam)
        return locationAddressRepository.getAddressData(requestParam)
    }

    fun getLocationH3Address (sd: String, ln: String, lt: String) : List<LocationAddressH3Data>{
        var requestParam: String

        if (sd == "null") {
            val h3AddressData = H3Core.newInstance()
            val res = 10
            val h3 = h3AddressData.latLngToCellAddress(lt.toDouble(), ln.toDouble(), res)

            requestParam = "h3=$h3"
        } else {
            requestParam = "sd='$sd'"
        }

        return locationAddressRepository.getAddressH3Data(requestParam)
    }
}