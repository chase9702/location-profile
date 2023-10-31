package com.carrotins.backend.api.view


import com.carrotins.backend.api.view.data.ProfileFileData
import org.springframework.stereotype.Component
import org.springframework.web.servlet.view.AbstractView
import java.io.IOException
import java.io.Writer
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * Created by alvin on 2023/05/17.
 */

@Component("csvView")
class CsvView<T : ProfileFileData> : AbstractView(), ProfileDataView<T> {

    companion object {
        const val DELIMITER = ","
        const val END_OF_LINE = "\r\n"
    }

    init {
        contentType = "text/csv; charset=UTF-8"
    }

    @Throws(IOException::class)
    override fun renderMergedOutputModel(model: Map<String, Any>, request: HttpServletRequest, response: HttpServletResponse) {
        val data: T? = getFileData(model)

        data?.let {
            setFilename(response, it)
            response.contentType = contentType

            response.writer.use { writer ->
                appendColumns(writer, it.columns)
                appendValues(writer, it.values)
            }
        }
    }

    override fun getExtension(): String {
        return ".csv"
    }


    @Throws(IOException::class)
    private fun appendColumns(writer: Writer, columns: List<String>) {
        val header = java.lang.String.join(DELIMITER, columns)
        writer.write(header)
    }

    @Throws(IOException::class)
    private fun appendValues(writer: Writer, values: List<List<String>>) {
        for (value in values) {
            writer.write(END_OF_LINE)
            writer.write(java.lang.String.join(DELIMITER, value))
        }
    }

}
