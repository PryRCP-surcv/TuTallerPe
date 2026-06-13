package com.tutaller.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthLoginRequest {

    @NotBlank(message = "El correo es obligatorio.")
    @Email(message = "El correo debe ser valido.")
    private String correo;

    @NotBlank(message = "La contrasena es obligatoria.")
    private String password;
}
