package com.carrotins.backend.service

import com.carrotins.backend.repository.HiveDataTable
import com.carrotins.backend.repository.ZeroTripTable
import com.carrotins.backend.repository.HiveTestRepository
import org.springframework.stereotype.Service


/**
 * Created by alvin on 2023/07/19.
 */
@Service
class PlugProfileService(
    private val hiveTestRepository: HiveTestRepository
) {
    fun getTest():List<HiveDataTable>{
        return hiveTestRepository.get01trip()
    }
    fun getDevicegb():List<HiveDataTable>{
        val dataEntries = hiveTestRepository.get01trip()

        val groupedAndSummedData = dataEntries
            .groupBy { it.dvcgb }
            .map { (dvcgb, cnt01) -> HiveDataTable(dvcgb, cnt01.sumOf { it.cnt01 }) }

        return groupedAndSummedData
    }
    fun getZgpsRT():List<ZeroTripTable>{
        val dataEntries = hiveTestRepository.get02rt()

        val groupedAndSummedData = dataEntries
            .groupBy { Pair(it.dvc_gb, it.part_dt) }
            .map { (key, value) -> ZeroTripTable(dvc_gb = key.first, part_dt = key.second, value.sumOf { it.trip_98_rt }) }
        print(groupedAndSummedData)
        return groupedAndSummedData
    }

}