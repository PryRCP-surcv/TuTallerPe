package com.tutaller.api.dto;

import com.tutaller.api.model.enums.EstadoInscripcion;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class InscripcionResponse {
    private Long id;
    private Long usuarioId;
    private String usuarioNombre;
    private Long tallerId;
    private String tallerNombre;
    private LocalDateTime fechaInscripcion;
    private EstadoInscripcion estado;
}
