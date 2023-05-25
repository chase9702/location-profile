package com.carrotins.backend.api

import com.carrotins.backend.api.view.ProfileDataView
import com.carrotins.backend.api.view.data.LocationFileData
import com.carrotins.backend.service.FileDownloadService
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.ModelAndView

/**
 * Created by alvin on 2023/05/17.
 */
@RestController
@RequestMapping("/api/file")
class FileDownloadController(
    private val fileDownloadService: FileDownloadService
) {

    @PostMapping("/location/data")
    fun downloadFunnelData(
        @RequestBody locationFileData: LocationFileData,
        model: Model
    ): ModelAndView {
        model.addAttribute(ProfileDataView.KEY_DATA, locationFileData)
        return ModelAndView("xlsxView", model.asMap())
    }

}