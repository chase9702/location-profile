package com.carrotins.backend.config

import com.carrotins.backend.security.JwtAuthenticationProvider
import com.carrotins.backend.security.JwtTokenValidator
import com.carrotins.backend.security.RestAccessDeniedHandler
import com.carrotins.backend.security.RestAuthenticationEntryPoint
import com.carrotins.backend.utils.logger
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator
import org.springframework.security.oauth2.core.OAuth2TokenValidator
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.security.oauth2.jwt.JwtValidators
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder
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
    private val restAuthenticationEntryPoint: RestAuthenticationEntryPoint,
    private val restAccessDeniedHandler: RestAccessDeniedHandler,
) {

    private val log = logger<WebSecurityConfig>()

    @Value("\${jwt.jwk.url}")
    private val jwkUrl: String = ""

    @Value("\${white-list}")
    private val whiteIpList: List<String> = listOf()

    @Value("\${any-list}")
    private val anyUrlList: List<String> = listOf()

    @Value("\${jwt-list}")
    private val jwtList: List<String> = listOf()

    @Bean
    @Throws(Exception::class)
    fun defaultSecurityFilterChain(httpSecurity: HttpSecurity): SecurityFilterChain {
        applyBasic(httpSecurity)
        applyRestApiSecurity(httpSecurity)
//        applyFinallyAnyRequestDenyAll(httpSecurity)
        return httpSecurity.build()
    }

    @Throws(Exception::class)
    private fun applyBasic(httpSecurity: HttpSecurity) {
        httpSecurity
            .cors()
            .configurationSource(corsConfigurationSource())
            .and()
            .formLogin().disable()
            .logout().disable()
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .exceptionHandling()
            .accessDeniedHandler(restAccessDeniedHandler)
            .authenticationEntryPoint(restAuthenticationEntryPoint)
            .and()
            .authenticationProvider(JwtAuthenticationProvider(jwtDecoder(), jwkUrl))
    }

    @Bean
    fun jwtDecoder(): JwtDecoder {
        return run {
            val jwtDecoder = NimbusJwtDecoder.withJwkSetUri(jwkUrl).build()
            val tokenTypeValidator: OAuth2TokenValidator<Jwt> =
                JwtTokenValidator()
            val defaultValidator = JwtValidators.createDefault()
            val delegatedValidator: OAuth2TokenValidator<Jwt> =
                DelegatingOAuth2TokenValidator(
                    tokenTypeValidator,
                    defaultValidator,
                )
            jwtDecoder.setJwtValidator(delegatedValidator)
            jwtDecoder
        }
    }

    @Throws(Exception::class)
    private fun applyRestApiSecurity(httpSecurity: HttpSecurity) {

        println(jwtList)
        if (jwtList.isNotEmpty()) {
            val jwtUrlList = jwtList.toTypedArray()
            httpSecurity
                .authorizeRequests()
                .antMatchers(*jwtUrlList)
                .access(
                    "isAuthenticated() and " +
                            getAttributeByIpList(whiteIpList)
                )
                .anyRequest().permitAll()
            httpSecurity.oauth2ResourceServer { oauth2ResourceServer: OAuth2ResourceServerConfigurer<HttpSecurity?> -> oauth2ResourceServer.jwt() }
        } else {
            log.info("Authenticated API not allowed")
        }

    }

    @Throws(Exception::class)
    private fun applyFinallyAnyRequestDenyAll(httpSecurity: HttpSecurity) {
        httpSecurity.authorizeRequests().anyRequest().denyAll()
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