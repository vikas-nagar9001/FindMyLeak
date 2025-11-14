package com.findmyleak.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeleteRequestDto {
    private String email;
    private String phone;
    private String fullName;
    private String reason;
}




