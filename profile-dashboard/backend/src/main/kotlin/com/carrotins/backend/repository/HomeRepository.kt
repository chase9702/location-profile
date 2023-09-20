package com.carrotins.backend.repository

import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

/**
 * Created by alvin on 2023/09/18.
 */
@Repository
class HomeRepository(
    private val hiveJdbcTemplate: JdbcTemplate
) {
}