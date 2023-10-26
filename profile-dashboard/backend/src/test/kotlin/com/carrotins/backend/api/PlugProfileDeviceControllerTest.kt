package com.carrotins.backend.api

import com.carrotins.backend.api.plug.PlugProfileDeviceController
import com.carrotins.backend.repository.plug.DeviceTop100Data
import com.carrotins.backend.repository.plug.DeviceTripData
import com.carrotins.backend.service.DATE
import com.carrotins.backend.service.DEVICE_GB
import com.carrotins.backend.service.DEVICE_ID
import com.carrotins.backend.service.plug.PlugProfileDeviceService
import com.google.gson.Gson
import io.kotest.core.spec.style.DescribeSpec
import io.mockk.every
import io.mockk.mockk
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.test.web.servlet.setup.MockMvcBuilders

/**
 * Created by alvin on 2023/10/23.
 */
class PlugProfileDeviceControllerTest : DescribeSpec({
    val plugProfileDeviceService = mockk<PlugProfileDeviceService>()

    val plugProfileDeviceController = PlugProfileDeviceController(plugProfileDeviceService)

    val mockMvc by lazy {
        MockMvcBuilders.standaloneSetup(plugProfileDeviceController).build()
    }

    val baseUrl = "/api/plug/device/"

    describe("/api/plug/device/top/{deviceGb} 에") {
        context("get 요청을 보내면") {
            it("getDeviceTopData 메소드가 DeviceTopData 리스트를 반환한다.") {

                val expectedResponse = listOf<DeviceTop100Data>()

                every { plugProfileDeviceService.getDeviceTopData(DEVICE_GB, DATE) } returns expectedResponse

                mockMvc.perform(
                    MockMvcRequestBuilders.get("$baseUrl/top/{deviceGb}", DEVICE_GB)
                        .param("date", DATE)
                )
                    .andExpect(MockMvcResultMatchers.handler().methodName("getDeviceTopData"))
                    .andExpect(MockMvcResultMatchers.status().isOk)
                    .andExpect(
                        MockMvcResultMatchers.content()
                            .json(Gson().toJson(expectedResponse))
                    )
            }
        }
    }

    describe("/api/plug/device/top/trip 에") {
        context("get 요청을 보내면") {
            it("getTripDataFromTopDevice 메소드가 DeviceTripData 리스트를 반환한다.") {

                val expectedResponse = listOf<DeviceTripData>()

                every {
                    plugProfileDeviceService.getTripDataFromTopDevice(
                        DEVICE_ID,
                        DEVICE_GB,
                        DATE
                    )
                } returns expectedResponse

                mockMvc.perform(
                    MockMvcRequestBuilders.get("$baseUrl/top/trip")
                        .param("device_id", DEVICE_ID)
                        .param("device_gb", DEVICE_GB)
                        .param("date", DATE)
                )
                    .andExpect(MockMvcResultMatchers.handler().methodName("getTripDataFromTopDevice"))
                    .andExpect(MockMvcResultMatchers.status().isOk)
                    .andExpect(
                        MockMvcResultMatchers.content()
                            .json(Gson().toJson(expectedResponse))
                    )
            }
        }
    }

})