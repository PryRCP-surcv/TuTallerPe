package com.tutaller.api.dto;

import com.tutaller.api.model.enums.EstadoInscripcion;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InscripcionRequest {

    @NotNull(message = "El usuario es obligatorio.")
    private Long usuarioId;

    @NotNull(message = "El taller es obligatorio.")
    private Long tallerId;

    private EstadoInscripcion estado;
}
