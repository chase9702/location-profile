package com.carrotins.backend.config

import com.carrotins.backend.security.JwtAuthenticationProvider
import com.carrotins.backend.security.RestAccessDeniedHandler
import com.carrotins.backend.security.RestAuthenticationEntryPoint
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import java.util.stream.Collectors


/**
 * Created by alvin on 2023/08/22.
 */
@EnableWebSecurity
class WebSecurityConfig(
    @Value("\${jwt.jwk.url}")
    private val jwkUrl: String,
    @Value("\${jwt.white-ip-list}")
    private val whiteIpList: List<String> = listOf(),
    @Value("\${jwt.any-url-list}")
    private val anyUrlList: List<String> = listOf(),
    private val restAuthenticationEntryPoint: RestAuthenticationEntryPoint,
    private val restAccessDeniedHandler: RestAccessDeniedHandler,
) {


    @Bean
    @Throws(Exception::class)
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        val anyUrlList = anyUrlList.toTypedArray()
        http
            .authorizeRequests()
            .antMatchers(*anyUrlList).permitAll()
            .antMatchers("/**").access(getAttributeByIpList(whiteIpList))
            .anyRequest().authenticated()
            .and()
            .cors().configurationSource(corsConfigurationSource())
            .and()
            .formLogin().disable()
            .csrf().disable()
            .headers().disable()
            .httpBasic().disable()
            .logout().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .exceptionHandling()
            .accessDeniedHandler(restAccessDeniedHandler)
            .authenticationEntryPoint(restAuthenticationEntryPoint)
            .and()
            .authenticationProvider(JwtAuthenticationProvider(jwkUrl))
        return http.build()
    }

    private fun getAttributeByIpList(approveIpList: List<String>): String {
        return (
                "( " +
                        approveIpList.stream()
                            .map { ip: String -> "hasIpAddress(\"$ip\")" }
                            .collect(Collectors.joining(" or ")) +
                        " )"
                )
    }

    private fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.addAllowedOriginPattern("*")
        configuration.addAllowedHeader("*")
        configuration.addAllowedMethod("*")
        configuration.allowCredentials = true
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

}