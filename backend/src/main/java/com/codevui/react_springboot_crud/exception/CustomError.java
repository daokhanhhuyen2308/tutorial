package com.codevui.react_springboot_crud.exception;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomError {
    private String code;
    private String message;
}
