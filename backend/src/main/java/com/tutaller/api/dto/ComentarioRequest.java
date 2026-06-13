package com.tutaller.api.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComentarioRequest {

    @NotNull(message = "El usuario es obligatorio.")
    private Long usuarioId;

    @NotNull(message = "El taller es obligatorio.")
    private Long tallerId;

    @NotBlank(message = "El comentario es obligatorio.")
    private String comentario;

    @NotNull(message = "La calificacion es obligatoria.")
    @Min(value = 1, message = "La calificacion minima es 1.")
    @Max(value = 5, message = "La calificacion maxima es 5.")
    private Integer calificacion;
}
