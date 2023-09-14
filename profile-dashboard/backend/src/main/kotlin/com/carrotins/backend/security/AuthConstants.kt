package com.carrotins.backend.security

/**
 * Created by alvin on 2023/08/23.
 */
object AuthConstants {
    // //////////////////////////////////////////////////////////////////
    // JWK Parameter Values
    // //////////////////////////////////////////////////////////////////
    // "kty" Parameter
    const val JWK_KEY_TYPE_VALUE_RSA = "RSA" // Recommend
    const val JWK_KEY_TYPE_VALUE_ELLIPTIC_CURVE = "EC"

    // "use" Parameter
    const val JWK_USE_VALUE_SIGNATURE = "sig" // Recommend
    const val JWK_USE_VALUE_ENCRYPTION = "enc"

    // "alg" Parameter
    const val JWK_ALGORITHM_VALUE_RS256 = "RS256" // Recommend

    // //////////////////////////////////////////////////////////////////
    // JWT Claims Private ID
    // //////////////////////////////////////////////////////////////////
    // Role Name 정보
    const val CLAIM_PRIVATE_NAME_AUTHORITIES = "pri_auth"

    // Username 정보
    const val CLAIM_PRIVATE_NAME_USERNAME = "pri_username"

    // 토큰 타입
    const val CLAIM_PRIVATE_NAME_TOKEN_TYPE = "pri_tt"
    const val CLAIM_VALUE_TOKEN_TYPE_ACCESS_TOKEN = "at"
    const val CLAIM_VALUE_TOKEN_TYPE_REFRESH_TOKEN = "rt"
    const val CLAIM_VALUE_TOKEN_UUID = "id"
    const val STS_TOKEN_CODE_EXPIRE = 0
    const val STS_TOKEN_CODE_VALID = 1
    const val STS_TOKEN_CODE_IGNORE = 2
    const val ISSUANCE_TYPE_ACCESS_TOKEN = 1
    const val ISSUANCE_TYPE_REFRESH_TOKEN = 2

    /* 고객 휴면 상태 */
    const val DEFAULT_USER_STATUS = "00"
    const val USER_STATUS_INACTIVE = "-99"
}
