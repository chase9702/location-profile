package com.carrotins.backend.api

import org.springframework.boot.web.servlet.error.ErrorController
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

/**
 * Created by alvin on 2023/07/11.
 */
@Controller
class WebController :ErrorController {

    @GetMapping("/error")
    fun redirectRoot(): String {
        return "index.html"
    }
}