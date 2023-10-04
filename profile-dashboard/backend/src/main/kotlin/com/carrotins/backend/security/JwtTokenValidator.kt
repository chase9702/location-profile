package com.carrotins.backend.security

import com.carrotins.backend.utils.logger
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.oauth2.core.OAuth2Error
import org.springframework.security.oauth2.core.OAuth2TokenValidator
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult
import org.springframework.security.oauth2.jwt.Jwt
import java.time.Instant


/**
 * Created by alvin on 2023/08/23.
 */
class JwtTokenValidator : OAuth2TokenValidator<Jwt> {
    private val log = logger<JwtTokenValidator>()

    override fun validate(token: Jwt): OAuth2TokenValidatorResult {

        val error = OAuth2Error("invalid_pri_tt", "The required pri_tt is missing", null)
        val privateTokenType = token.claims[AuthConstants.CLAIM_PRIVATE_NAME_TOKEN_TYPE].toString()
        val expirationTime = token.expiresAt

        //토큰 유효
        if (privateTokenType.isNotEmpty() && Instant.now().isBefore(expirationTime)) {
            log.debug("IMB JWT pri_tt=[{}]", privateTokenType)
            return OAuth2TokenValidatorResult.success()
        }
        throw BadCredentialsException("Invalid token")
//        return OAuth2TokenValidatorResult.failure(error)


    }
}