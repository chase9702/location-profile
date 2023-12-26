package com.carrotins.backend.utils

import com.uber.h3core.H3Core
import com.uber.h3core.util.LatLng

/**
 * Created by alvin on 2023/09/20.
 */


fun transformNullToEmptyString(value: String?): String {
    if (value == null) return ""
    return value
}

fun transformCellToBoundary(value: String?): String {
    val h3 = H3Core.newInstance()

    val latLngList = h3.cellToBoundary(value)
    val polygonStringBuilder = StringBuilder("POLYGON((")

    // Add coordinates to the polygon string
    for ((index, latLng) in latLngList.withIndex()) {
        polygonStringBuilder.append("${latLng.lng} ${latLng.lat}")

        if (index < latLngList.size - 1) {
            polygonStringBuilder.append(", ")
        }
    }

    polygonStringBuilder.append("))")
    return polygonStringBuilder.toString()
}