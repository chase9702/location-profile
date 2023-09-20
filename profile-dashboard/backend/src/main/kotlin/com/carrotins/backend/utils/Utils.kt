package com.carrotins.backend.utils

/**
 * Created by alvin on 2023/09/20.
 */


fun transformNullToEmptyString(value: String?): String {
    if (value == null) return ""
    return value
}