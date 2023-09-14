package com.carrotins.backend.api.location

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Created by alvin on 2023/05/17.
 */
@Tag(name = "Location controller")
@RestController
@RequestMapping("/api/location")
class LocationProfileController {

    @Operation(summary = "post test api summary", description = "[@Operation] get test api")
    @PostMapping("/test")
    fun testAPI():String{
        return "location"
    }
}