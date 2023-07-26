package com.carrotins.backend.service

import com.carrotins.backend.repository.HiveTestRepository
import io.kotest.core.spec.style.BehaviorSpec
import io.mockk.clearAllMocks
import io.mockk.mockk


/**
 * Created by alvin on 2023/07/24.
 */

class PlugProfileServiceTest:BehaviorSpec(){


    init {
        afterContainer {
            clearAllMocks()
        }

        val hiveTestRepository = mockk<HiveTestRepository>()
        val service = PlugProfileService(hiveTestRepository)
    }


}