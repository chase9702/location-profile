package com.carrotins.backend.service.location

import com.carrotins.backend.repository.location.LocationAddressBoundaryData
import com.carrotins.backend.repository.location.LocationAddressH3Data
import com.carrotins.backend.repository.location.LocationAddressRepository
import com.uber.h3core.H3Core
import org.springframework.stereotype.Service


@Service
class LocationProfileAddressService(
    private val locationAddressRepository: LocationAddressRepository
) {
    fun makeQueryParam(sd: String?, ln: String?, lt: String?): String {
        return if (sd == null) {1717
            val h3AddressData = H3Core.newInstance()
            val h3 = h3AddressData.latLngToCellAddress(lt!!.toDouble(), ln!!.toDouble(), 10)
            "h3_10='$h3'"
        } else {
            "sd='$sd'"
        }
    }

    //127.542024931  37.639708
    fun getBoundaryLocationAddress(sd: String?, ln: String?, lt: String?): List<LocationAddressBoundaryData> {
        if(sd == null)
            return listOf()
        return locationAddressRepository.getBoundaryAddressData(sd)
    }

    fun getH3LocationAddress(sd: String?, ln: String?, lt: String?): List<LocationAddressH3Data> {
        return locationAddressRepository.getH3AddressData(makeQueryParam(sd, ln, lt))
    }
}