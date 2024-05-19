package com.codevui.react_springboot_crud.exception;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@Builder
public class TutorialHandleException extends RuntimeException{

    private CustomError customError;
    private HttpStatus status;

    public static TutorialHandleException notFoundException(String message){
        return TutorialHandleException.builder()
                .customError(CustomError.builder().code("404")
                        .message(message).build())
                .status(HttpStatus.NOT_FOUND).build();
    }

    public static TutorialHandleException badRequestException(String message){
        return TutorialHandleException.builder()
                .customError(CustomError.builder().code("400")
                        .message(message).build())
                .status(HttpStatus.BAD_REQUEST).build();
    }

    public static TutorialHandleException internalServerErrorException(String message){
        return TutorialHandleException.builder()
                .customError(CustomError.builder().code("500")
                        .message(message).build())
                .status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
