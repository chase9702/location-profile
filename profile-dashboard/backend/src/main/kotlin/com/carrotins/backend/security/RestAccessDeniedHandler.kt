package com.carrotins.backend.security

import com.carrotins.backend.utils.logger
import org.springframework.security.access.AccessDeniedException
import org.springframework.security.web.access.AccessDeniedHandler
import org.springframework.stereotype.Component
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * Created by alvin on 2023/08/22.
 */
@Component
class RestAccessDeniedHandler : AccessDeniedHandler {
    private val log = logger<RestAccessDeniedHandler>()
    override fun handle(
        request: HttpServletRequest?,
        response: HttpServletResponse?,
        accessDeniedException: AccessDeniedException?
    ) {
//        response!!.sendError(HttpServletResponse.SC_FORBIDDEN, accessDeniedException!!.message)

        log.error("Response:" + HttpServletResponse.SC_FORBIDDEN + ":" + accessDeniedException!!.message)
    }
}