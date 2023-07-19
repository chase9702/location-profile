package com.carrotins.backend.aop

import com.carrotins.backend.utils.logger
import org.aspectj.lang.ProceedingJoinPoint
import org.aspectj.lang.annotation.Around
import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.annotation.Pointcut
import org.springframework.stereotype.Component
import org.springframework.web.context.request.RequestContextHolder.currentRequestAttributes
import org.springframework.web.context.request.ServletRequestAttributes
import java.util.stream.Collectors
import javax.servlet.http.HttpServletRequest


/**
 * Created by alvin on 2023/05/30.
 */
@Component
@Aspect
class LoggingAspect {
    private val log = logger<LoggingAspect>()

    @Pointcut("within(com.carrotins.backend.api..*)")
    fun onRequest() = Unit

    @Around("com.carrotins.backend.aop.LoggingAspect.onRequest()")
    @Throws(Throwable::class)
    fun requestLogging(proceedingJoinPoint: ProceedingJoinPoint): Any? {
        val request: HttpServletRequest =
            (currentRequestAttributes() as ServletRequestAttributes).request

        val paramMap = request.parameterMap
        var params = ""
        if (paramMap.isNotEmpty()) {
            params = " [" + paramMapToString(paramMap as Map<String, Array<String>>) + "]"
        }

        val start = System.currentTimeMillis()
        return try {
            proceedingJoinPoint.proceed(proceedingJoinPoint.args) // 6
        } finally {
            val end = System.currentTimeMillis()
            log.info(
                "Request: {} {}{} < {} ({}ms)", request.method, request.requestURI,
                params, request.remoteHost, end - start
            )
        }
    }

    private fun paramMapToString(paraStringMap: Map<String, Array<String>>): String? {
        return paraStringMap.entries.stream()
            .map { (key, value): Map.Entry<String, Array<String>> ->
                java.lang.String.format(
                    "%s : %s",
                    key, value.contentToString()
                )
            }
            .collect(Collectors.joining(", "))
    }

}