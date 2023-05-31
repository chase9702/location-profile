package com.carrotins.backend.api

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Created by alvin on 2023/04/27.
 */
@Tag(name = "Home controller")
@RestController
@RequestMapping("/api/home")
class HomeController {

    @PostMapping("/test")
    fun testAPI():String{
        return "hi"
    }
}