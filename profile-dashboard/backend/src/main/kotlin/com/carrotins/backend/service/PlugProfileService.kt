package com.carrotins.backend.service

import com.carrotins.backend.repository.DeviceProductCount
import com.carrotins.backend.repository.ZeroGpsTripInfo
import com.carrotins.backend.repository.InterpolationTripInfo
import com.carrotins.backend.repository.CarProductNameInfo
import com.carrotins.backend.repository.HiveTestRepository
import org.springframework.stereotype.Service
import java.math.BigDecimal


/**
 * Created by alvin on 2023/07/19.
 */
@Service
class PlugProfileService(
    private val hiveTestRepository: HiveTestRepository
) {
    fun getDeviceProductCount(): List<DeviceProductCount> {
        val dataEntries = hiveTestRepository.getDeviceProductCountData()

        return dataEntries
            .groupBy { it.dvcgb }
            .map { (dvcgb, cnt01) -> DeviceProductCount(dvcgb, cnt01.sumOf { it.cnt01 }) }
    }

    fun getCarProductNameInfo(): List<CarProductNameInfo> {
        return hiveTestRepository.getCarProductNameInfoData()
    }

    fun getZeroGpsTripInfo(): List<ZeroGpsTripInfo> {
        val dataEntries = hiveTestRepository.getZeroGpsTripInfoData()

        val updatedDataList = dataEntries.map { item ->
            val triprt = if (item.trip_98 != 0) BigDecimal((item.trip_98.toDouble() / item.trip_total) * 100).setScale(2, BigDecimal.ROUND_HALF_UP).toDouble() else 0.0
            item.copy(trip_rt = triprt)
        }

        return updatedDataList
    }

    fun getInterpolationTripInfo(): List<InterpolationTripInfo> {
        val dataEntries = hiveTestRepository.getInterpolationTripInfoData()

        val groupedAndSummedData = dataEntries
            .groupBy { Pair(it.dvc_gb, it.part_dt) }
            .map { (key, value) ->
                InterpolationTripInfo(
                    dvc_gb = key.first,
                    part_dt = key.second,
                    value.sumOf { it.trip_total },
                    value.sumOf { it.trip_01 },
                    value.sumOf { it.trip_02 },
                    value.sumOf { it.trip_rt }
                )
            }

        val updatedDataList = groupedAndSummedData.map { item ->
            val triprt = if (item.trip_02 != 0) BigDecimal((item.trip_02.toDouble() / item.trip_total) * 100).setScale(2, BigDecimal.ROUND_HALF_UP).toDouble() else 0.0
            item.copy(trip_rt = triprt)
        }

        return updatedDataList
    }

}