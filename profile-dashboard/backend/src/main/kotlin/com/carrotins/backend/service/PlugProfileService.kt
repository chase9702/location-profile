package com.carrotins.backend.service

import com.carrotins.backend.repository.HiveDataTable
import com.carrotins.backend.repository.ZeroTripTable
import com.carrotins.backend.repository.Trip02Table
import com.carrotins.backend.repository.CarprdName
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
    fun getTest(): List<HiveDataTable> {
        return hiveTestRepository.get01trip()
    }

    fun getDevicegb(): List<HiveDataTable> {
        val dataEntries = hiveTestRepository.get01trip()

        val groupedAndSummedData1 = dataEntries
            .groupBy { it.dvcgb }
            .map { (dvcgb, cnt01) -> HiveDataTable(dvcgb, cnt01.sumOf { it.cnt01 }) }

        return groupedAndSummedData1
    }

    fun getCarName(): List<CarprdName> {
        return hiveTestRepository.getcrnm()
    }

    fun getZgpsRT(): List<ZeroTripTable> {
        val dataEntries = hiveTestRepository.get98rt()

//        val groupedAndSummedData = dataEntries
//            .groupBy { Pair(it.dvc_gb, it.part_dt) }
//            .map { (key, value) ->
//                ZeroTripTable(
//                    dvc_gb = key.first,
//                    part_dt = key.second,
//                    value.sumOf { it.trip_total },
//                    value.sumOf { it.trip_01 },
//                    value.sumOf { it.trip_98 },
//                    value.sumOf { it.trip_rt }
//                )
//            }

        val updatedDataList = dataEntries.map { item ->
            val triprt = if (item.trip_98 != 0) BigDecimal((item.trip_98.toDouble() / item.trip_total) * 100).setScale(2, BigDecimal.ROUND_HALF_UP).toDouble() else 0.0
            item.copy(trip_rt = triprt)
        }

        return updatedDataList
    }

    fun get02TtipRT(): List<Trip02Table> {
        val dataEntries = hiveTestRepository.get02rt()

        val groupedAndSummedData = dataEntries
            .groupBy { Pair(it.dvc_gb, it.part_dt) }
            .map { (key, value) ->
                Trip02Table(
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