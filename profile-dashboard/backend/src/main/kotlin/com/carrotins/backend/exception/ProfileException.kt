package com.carrotins.backend.exception

import org.springframework.http.HttpStatus

/**
 * Created by alvin on 2023/05/25.
 */
class ProfileException(
    val responseStatus: HttpStatus,
    message: String
) : RuntimeException(message)