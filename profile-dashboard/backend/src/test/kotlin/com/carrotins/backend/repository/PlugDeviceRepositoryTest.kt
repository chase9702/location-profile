package com.carrotins.backend.repository

import io.kotest.core.spec.style.DescribeSpec

/**
 * Created by alvin on 2023/10/19.
 */
class PlugDeviceRepositoryTest: DescribeSpec({

//
//    describe("PlugDeviceRepository.getDeviceTopData 메소드에") {
//        val baseQuery1 =
//            """
//                SELECT * FROM
//                    (SELECT COUNT(request_time) AS pv, COUNT(DISTINCT pay_account_id) AS uv
//                    FROM pay_cxm.page
//                    WHERE action_type="Pageview"
//                    AND action_name="청구서"
//                    AND yyyymmdd BETWEEN 20211010 AND 20211101
//            """.trimIndent()
//        val baseQuery2 =
//            """
//                ) a
//                INNER JOIN
//                    (SELECT COUNT(DISTINCT session_id) AS session
//                    FROM pay_cxm.page
//                    WHERE action_type="Pageview"
//                    AND action_name="청구서"w
//                    AND yyyymmdd BETWEEN 20211010 AND 20211101
//            """.trimIndent()
//        val baseQuery3 = ") b\nON 1 = 1;"
//
//        context("deviceGb , date를 전달하면") {
//            it("두 가지 변수를 이용한 쿼리를 반환한다.") {
//                val expectedQuery = baseQuery1 + baseQuery2 + baseQuery3
//
//                PageQueryUtil.generateSelectedPageDataQuery(
//                    null,
//                    pageOptionWithRequired
//                ) shouldBe expectedQuery
//            }
//        }
//
//        context("필수 옵션과 세그먼트를 전달하면") {
//            it("필수 옵션과 세그먼트를 조건으로 추가한 쿼리를 반환한다.") {
//                val expectedQuery =
//                    baseQuery1 + segmentOptionQuery + baseQuery2 + segmentOptionQuery + baseQuery3
//
//                PageQueryUtil.generateSelectedPageDataQuery(
//                    segmentQuery,
//                    pageOptionWithRequired
//                ) shouldBe expectedQuery
//            }
//        }
//
//        context("모든 옵션을 전달하면") {
//            it("모든 옵션을 조건으로 추가한 쿼리를 반환한다.") {
//                val expectedQuery =
//                    baseQuery1 + notRequiredOption + segmentOptionQuery + baseQuery2 + notRequiredOption + segmentOptionQuery + baseQuery3
//
//                PageQueryUtil.generateSelectedPageDataQuery(
//                    segmentQuery,
//                    pageOptionWithAll
//                ) shouldBe expectedQuery
//            }
//        }
//    }

})