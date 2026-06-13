package com.tutaller.api.dto;

import com.tutaller.api.model.enums.RolUsuario;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UsuarioResponse {
    private Long id;
    private String nombres;
    private String correo;
    private String telefono;
    private RolUsuario rol;
}
