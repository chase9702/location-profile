package com.carrotins.backend.service

import com.carrotins.backend.repository.plug.PlugStatisticsRepository
import com.carrotins.backend.service.plug.PlugProfileStatisticsService
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

        val plugStatisticsRepository = mockk<PlugStatisticsRepository>()
        val service = PlugProfileStatisticsService(plugStatisticsRepository)
    }


}