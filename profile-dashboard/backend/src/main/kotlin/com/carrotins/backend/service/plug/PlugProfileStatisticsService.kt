package com.carrotins.backend.service.plug

import com.carrotins.backend.repository.plug.*
import org.springframework.stereotype.Service
import java.math.BigDecimal


/**
 * Created by alvin on 2023/07/19.
 */
@Service
class PlugProfileStatisticsService(
    private val plugStatisticsRepository: PlugStatisticsRepository
) {
    fun getDeviceProductCount(): List<DeviceProductCount> {
        val dataEntries = plugStatisticsRepository.getDeviceProductCountData()

        return dataEntries
            .groupBy { it.dvcgb }
            .map { (dvcgb, cnt01) -> DeviceProductCount(dvcgb, cnt01.sumOf { it.cnt01 }) }
    }

    fun getCarProductNameInfo(): List<CarProductNameInfo> {
        val carProductNameData = plugStatisticsRepository.getCarProductNameInfoData()

        val groupCarProductNameData = carProductNameData
            .groupBy { Pair(it.cr_prd_cmpcd_nm, it.part_dt) }
            .map { (key, value) ->
                CarProductNameInfo(
                    cr_prd_cmpcd_nm = key.first,
                    part_dt = key.second,
                    value.sumOf { it.trip_total },
                    value.sumOf { it.trip_01 },
                    value.sumOf { it.trip_98 },
                    value.sumOf { it.trip_rt }
                )
            }

        val updateCarProductNameData = groupCarProductNameData.map { item ->
            val zeroGpsRatio = if (item.trip_98 != 0) BigDecimal((item.trip_98.toDouble() / item.trip_total) * 100).setScale(2, BigDecimal.ROUND_HALF_UP).toDouble() else 0.0
            item.copy(trip_rt = zeroGpsRatio)
        }

        return updateCarProductNameData
    }

    fun getZeroGpsTripInfo(): List<ZeroGpsTripInfo> {
        val zeroGpsData = plugStatisticsRepository.getZeroGpsTripInfoData()

        val groupZeroGpsData = zeroGpsData
            .groupBy { Pair(it.dvc_gb, it.part_dt) }
            .map { (key, value) ->
                ZeroGpsTripInfo(
                    dvc_gb = key.first,
                    part_dt = key.second,
                    value.sumOf { it.trip_total },
                    value.sumOf { it.trip_01 },
                    value.sumOf { it.trip_98 },
                    value.sumOf { it.trip_rt }
                )
            }

        val updateZeroGpsData = groupZeroGpsData.map { item ->
            val zeroGpsRatio = if (item.trip_98 != 0) BigDecimal((item.trip_98.toDouble() / item.trip_total) * 100).setScale(2, BigDecimal.ROUND_HALF_UP).toDouble() else 0.0
            item.copy(trip_rt = zeroGpsRatio)
        }

        return updateZeroGpsData
    }

    fun getInterpolationTripMonthlyInfo(ctgry: String): List<InterpolationTripMonthlyInfo>{
        val allData = plugStatisticsRepository.getInterpolationTripMonthlyInfoData()
        return allData.filter { it.ctgry == ctgry }
    }
    fun getInterpolationTripDailyInfo(ctgry: String): List<InterpolationTripDailyInfo> {
        val allData = plugStatisticsRepository.getInterpolationTripDailyInfoData()
        return allData.filter { it.ctgry == ctgry }
    }

}