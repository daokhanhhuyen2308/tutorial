package com.codevui.react_springboot_crud.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalHandleException {

    @ExceptionHandler(TutorialHandleException.class)
    public ResponseEntity<CustomError> handleException(TutorialHandleException exception) {
        return new ResponseEntity<>(exception.getCustomError(), exception.getStatus());
    }
}
