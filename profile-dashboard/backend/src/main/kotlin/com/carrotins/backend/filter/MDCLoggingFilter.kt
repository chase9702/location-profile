package com.carrotins.backend.filter

import org.apache.log4j.MDC
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import java.io.IOException
import java.util.*
import javax.servlet.*


/**
 * Created by alvin on 2023/08/16.
 */

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
internal class MDCLoggingFilter : Filter {
    @Throws(IOException::class, ServletException::class)
    override fun doFilter(servletRequest: ServletRequest?, servletResponse: ServletResponse?, filterChain: FilterChain) {
        val uuid: UUID = UUID.randomUUID()
        MDC.put("request_id", uuid.toString())
        filterChain.doFilter(servletRequest, servletResponse)
        MDC.clear()
    }
}

