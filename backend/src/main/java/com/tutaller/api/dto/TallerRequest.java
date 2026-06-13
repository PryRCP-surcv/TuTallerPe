package com.tutaller.api.dto;

import com.tutaller.api.model.enums.EstadoTaller;
import com.tutaller.api.model.enums.TipoTaller;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TallerRequest {

    @NotBlank(message = "El nombre del taller es obligatorio.")
    private String nombre;

    @NotBlank(message = "La descripcion es obligatoria.")
    private String descripcion;

    @NotBlank(message = "La categoria es obligatoria.")
    private String categoria;

    @NotBlank(message = "El distrito es obligatorio.")
    private String distrito;

    @NotNull(message = "El tipo es obligatorio.")
    private TipoTaller tipo;

    @NotBlank(message = "El horario es obligatorio.")
    private String horario;

    @NotNull(message = "El precio es obligatorio.")
    @DecimalMin(value = "0.01", message = "El precio debe ser mayor a 0.")
    private BigDecimal precio;

    @NotNull(message = "Las vacantes son obligatorias.")
    @Min(value = 1, message = "Las vacantes deben ser mayores a 0.")
    private Integer vacantes;

    private EstadoTaller estado;
}
