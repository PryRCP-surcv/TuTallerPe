package com.tutaller.api.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ComentarioResponse {
    private Long id;
    private Long usuarioId;
    private String usuarioNombre;
    private Long tallerId;
    private String tallerNombre;
    private String comentario;
    private Integer calificacion;
}
