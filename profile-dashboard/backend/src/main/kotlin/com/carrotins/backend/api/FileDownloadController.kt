package com.carrotins.backend.api

import com.carrotins.backend.service.FileDownloadService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Created by alvin on 2023/05/17.
 */
@RestController
@RequestMapping("/api/file")
class FileDownloadController(
    private val fileDownloadService: FileDownloadService
) {

}