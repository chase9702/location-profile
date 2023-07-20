package com.carrotins.backend.service

import com.carrotins.backend.repository.HiveDataTable
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
        return hiveTestRepository.getTestData()
    }

}