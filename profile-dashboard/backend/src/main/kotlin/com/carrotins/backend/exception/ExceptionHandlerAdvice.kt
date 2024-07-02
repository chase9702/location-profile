package com.carrotins.backend.exception

import com.carrotins.backend.utils.logger
import org.springframework.beans.BeanInstantiationException
import org.springframework.beans.TypeMismatchException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.jdbc.BadSqlGrammarException
import org.springframework.validation.BindException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.MissingServletRequestParameterException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice
import javax.validation.ConstraintViolationException

/**
 * Created by alvin on 2023/05/25.
 */
@RestControllerAdvice
class ExceptionHandlerAdvice {
    private val log = logger<ExceptionHandlerAdvice>()

    @ExceptionHandler(
        BindException::class,
        MethodArgumentNotValidException::class,
        TypeMismatchException::class,
        BeanInstantiationException::class,
        MissingServletRequestParameterException::class,
    )
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleBadRequestException(ex: Exception): String {
        log.warn("Bad Request: ${ex.javaClass.simpleName}: ${ex.message}")
        return ex.message ?: ""
    }

    @ExceptionHandler(value = [ConstraintViolationException::class])
    fun handleConstraintViolationException(ex: ConstraintViolationException): ResponseEntity<*> {
        val invalidValue = ex.constraintViolations.first().invalidValue
        log.error("ConstraintViolationException", ex)
        return ResponseEntity(ex.message + ": " + invalidValue, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(value = [Exception::class])
    fun handleException(ex: Exception): ResponseEntity<*> {
        log.error("Exception:", ex)
        return ResponseEntity(ex, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    @ExceptionHandler(value = [BadSqlGrammarException::class])
    fun handleBadSqlGrammarException(ex: BadSqlGrammarException): ResponseEntity<*> {
        val errorMessage = "Bad SQL Grammar!! Check Request Param! $ex"
        log.error("Bad SQL Grammar:", ex)
        return ResponseEntity(errorMessage, HttpStatus.BAD_REQUEST)
    }
}
