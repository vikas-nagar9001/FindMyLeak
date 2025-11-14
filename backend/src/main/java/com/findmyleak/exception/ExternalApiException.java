package com.findmyleak.exception;

public class ExternalApiException extends RuntimeException {
    private final int statusCode;
    private final String responseBody;
    
    public ExternalApiException(String message, int statusCode, String responseBody) {
        super(message);
        this.statusCode = statusCode;
        this.responseBody = responseBody;
    }
    
    public ExternalApiException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.responseBody = null;
    }
    
    public int getStatusCode() {
        return statusCode;
    }
    
    public String getResponseBody() {
        return responseBody;
    }
}