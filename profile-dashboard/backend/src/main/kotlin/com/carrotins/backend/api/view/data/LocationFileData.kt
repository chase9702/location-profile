package com.carrotins.backend.api.view.data

import lombok.Getter
import lombok.Setter

/**
 * Created by alvin on 2023/05/24.
 */
@Getter
@Setter
class LocationFileData(columns: List<String>, values: List<List<String>>, private val chartName: String) :
    ProfileFileData(columns, values) {

    override val filename: String
        get() = "location_" + chartName + "_data"
}

