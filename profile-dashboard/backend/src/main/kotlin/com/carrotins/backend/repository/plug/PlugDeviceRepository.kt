package com.carrotins.backend.repository.plug

import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

/**
 * Created by alvin on 2023/09/13.
 */
@Repository
class PlugDeviceRepository(
    private val hiveJdbcTemplate: JdbcTemplate
) {
}