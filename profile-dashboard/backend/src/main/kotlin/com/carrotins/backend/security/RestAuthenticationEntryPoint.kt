package com.carrotins.backend.security

import com.carrotins.backend.utils.logger
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * Created by alvin on 2023/08/22.
 */
@Component
class RestAuthenticationEntryPoint : AuthenticationEntryPoint {

    private val log = logger<RestAuthenticationEntryPoint>()
    override fun commence(
        request: HttpServletRequest?,
        response: HttpServletResponse?,
        authException: AuthenticationException?
    ) {
//        response!!.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException!!.message)
        log.error("Response:" + HttpServletResponse.SC_UNAUTHORIZED + ":" + authException!!.message)
    }
}