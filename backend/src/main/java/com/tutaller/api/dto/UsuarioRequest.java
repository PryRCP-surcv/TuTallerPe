package com.tutaller.api.dto;

import com.tutaller.api.model.enums.RolUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioRequest {

    @NotBlank(message = "Los nombres son obligatorios.")
    private String nombres;

    @NotBlank(message = "El correo es obligatorio.")
    @Email(message = "El correo debe ser valido.")
    private String correo;

    @NotBlank(message = "El telefono es obligatorio.")
    @Pattern(regexp = "^\\d{9}$", message = "El telefono debe tener 9 digitos.")
    private String telefono;

    @NotBlank(message = "La contrasena es obligatoria.")
    private String password;

    private RolUsuario rol;
}
