package com.carrotins.backend.api.view

import com.carrotins.backend.api.view.data.ProfileFileData
import org.apache.poi.ss.usermodel.Sheet
import org.apache.poi.ss.usermodel.Workbook
import org.apache.poi.ss.usermodel.Row
import org.springframework.stereotype.Component
import org.springframework.web.servlet.view.document.AbstractXlsxStreamingView
import java.io.UnsupportedEncodingException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * Created by alvin on 2023/05/24.
 */
@Component("xlsxView")
class XlsxView<T : ProfileFileData> : AbstractXlsxStreamingView(), ProfileDataView<T> {
    @Throws(UnsupportedEncodingException::class)
    override fun buildExcelDocument(
        model: Map<String, Any>, workbook: Workbook,
        request: HttpServletRequest, response: HttpServletResponse
    ) {
        val data: T = getFileData(model)
        setFilename(response, data)
        val sheet: Sheet = workbook.createSheet()
        appendColumns(sheet, data.columns)
        appendValues(sheet, data.values)
    }

    private fun appendColumns(sheet: Sheet, columns: List<String>) {
        val row: Row = sheet.createRow(0)
        val colSize = columns.size
        for (i in 0 until colSize) {
            row.createCell(i).setCellValue(columns[i])
        }
    }

    private fun appendValues(sheet: Sheet, values: List<List<String>>) {
        for (i in values.indices) {
            val value = values[i]
            val row: Row = sheet.createRow(i + 1)
            val colSize = value.size
            for (j in 0 until colSize) {
                row.createCell(j).setCellValue(value[j])
            }
        }
    }

    override fun getExtension(): String {
        return ".xlsx"
    }
}
