package com.carrotins.backend.exception

import com.carrotins.backend.utils.logger
import org.springframework.web.bind.annotation.RestControllerAdvice

/**
 * Created by alvin on 2023/05/25.
 */
@RestControllerAdvice
class ExceptionHandlerAdvice {

    private val log = logger<ExceptionHandlerAdvice>()

}