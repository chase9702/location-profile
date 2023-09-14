package com.carrotins.backend.security

import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.security.oauth2.server.resource.BearerTokenAuthenticationToken
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import java.util.*
import java.util.stream.Collectors


/**
 * Created by alvin on 2023/08/22.
 */

class JwtAuthenticationProvider(
    private val jwtDecoder: JwtDecoder,
    private val jwkUrl: String
) : AuthenticationProvider {

    override fun authenticate(authentication: Authentication): Authentication {
        val accessToken = authentication as BearerTokenAuthenticationToken
        val jwt = getJwt(accessToken)
        return JwtAuthenticationToken(jwt, getPrivateAuthorities(jwt), getUserName(jwt))
    }

    override fun supports(authentication: Class<*>): Boolean {
        return BearerTokenAuthenticationToken::class.java.isAssignableFrom(authentication)
    }

    private fun getJwt(bearer: BearerTokenAuthenticationToken): Jwt {
        return jwtDecoder.decode(bearer.token)
    }


    private fun getPrivateAuthorities(jwt: Jwt): Collection<GrantedAuthority>? {
        return if (jwt.claims.containsKey(AuthConstants.CLAIM_PRIVATE_NAME_AUTHORITIES)) {
            Arrays.stream(
                jwt.claims[AuthConstants.CLAIM_PRIVATE_NAME_AUTHORITIES]
                    .toString()
                    .split(",".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray(),
            )
                .map { role: String? -> SimpleGrantedAuthority(role) }
                .collect(Collectors.toList())
        } else {
            null
        }
    }

    private fun getUserName(jwt: Jwt): String? {
        return if (jwt.claims.containsKey(AuthConstants.CLAIM_PRIVATE_NAME_USERNAME)) {
            jwt.claims[AuthConstants.CLAIM_PRIVATE_NAME_USERNAME].toString()
        } else {
            null
        }
    }
}