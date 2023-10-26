package com.carrotins.backend.service

import com.carrotins.backend.repository.plug.DeviceTop100Data
import com.carrotins.backend.repository.plug.DeviceTripData
import com.carrotins.backend.repository.plug.PlugDeviceRepository
import com.carrotins.backend.service.plug.PlugProfileDeviceService
import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe
import io.mockk.clearAllMocks
import io.mockk.every
import io.mockk.impl.annotations.InjectMockKs
import io.mockk.mockk


/**
 * Created by alvin on 2023/07/24.
 */

const val DATE = "20231018"
const val DEVICE_GB = "TOTAL"
const val DEVICE_ID = "DEVICE_ID"

class PlugProfileDeviceServiceTest : DescribeSpec({

    afterContainer {
        clearAllMocks()
    }

    val plugDeviceRepository = mockk<PlugDeviceRepository>()

    @InjectMockKs
    val plugProfileDeviceService = PlugProfileDeviceService(plugDeviceRepository)

    describe("getDeviceTopData 메소드에") {
        context("deviceGb와 date를 전달하면 ") {
            it("조건에 해당하는 device top 100데이터를 DeviceTop100Data List로 반환한다.") {

                val expectedResponse = listOf<DeviceTop100Data>()

                every {
                    plugDeviceRepository.getDeviceTopData(DEVICE_GB, DATE)
                } answers { expectedResponse }

                plugProfileDeviceService.getDeviceTopData(DEVICE_GB, DATE) shouldBe expectedResponse

            }
        }
    }


    describe("getTripDataFromTopDevice 메소드에") {
        context("deviceId 와 deviceGb와 date를 전달하면 ") {
            it("조건에 해당하는 device trip 100데이터를 DeviceTripData List로 반환한다.") {

                val expectedResponse = listOf<DeviceTripData>()

                every {
                    plugDeviceRepository.getTripDataFromTopDevice(DEVICE_ID, DEVICE_GB, DATE)
                } answers { expectedResponse }

                plugProfileDeviceService.getTripDataFromTopDevice(DEVICE_ID, DEVICE_GB, DATE) shouldBe expectedResponse

            }
        }
    }


})