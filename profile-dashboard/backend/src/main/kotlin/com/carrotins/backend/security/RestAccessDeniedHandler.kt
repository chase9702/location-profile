package com.carrotins.backend.security

import org.springframework.security.access.AccessDeniedException
import org.springframework.security.web.access.AccessDeniedHandler
import org.springframework.stereotype.Component
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * Created by alvin on 2023/08/22.
 */
@Component
class RestAccessDeniedHandler: AccessDeniedHandler {
    override fun handle(
        request: HttpServletRequest?,
        response: HttpServletResponse?,
        accessDeniedException: AccessDeniedException?
    ) {
        response!!.sendError(HttpServletResponse.SC_FORBIDDEN, accessDeniedException!!.message)
    }
}