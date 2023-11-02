package com.carrotins.backend.api.view

import com.carrotins.backend.api.view.data.ProfileFileData
import org.springframework.http.HttpHeaders
import java.io.UnsupportedEncodingException
import java.net.URLEncoder
import javax.servlet.http.HttpServletResponse

/**
 * Created by alvin on 2023/05/17.
 */

interface ProfileDataView<T : ProfileFileData> {

    companion object {
        const val KEY_DATA = "data"
    }

    fun getExtension(): String

    fun getFileData(model: Map<String, Any>): T {
        return (model[KEY_DATA] as T?)!!
    }

    @Throws(UnsupportedEncodingException::class)
    fun setFilename(response: HttpServletResponse, data: T) {
        response.setHeader(
            HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename="
                    + URLEncoder.encode(data.filename, "UTF-8")
                    + getExtension()
        )
    }

}

