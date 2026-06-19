package com.tutaller.api.dto;

import com.tutaller.api.model.enums.EstadoTaller;
import com.tutaller.api.model.enums.TipoTaller;
import java.math.BigDecimal;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TallerResponse {
    private Long id;
    private String nombre;
    private String descripcion;
    private String categoria;
    private String distrito;
    private TipoTaller tipo;
    private String horario;
    private BigDecimal precio;
    private Integer vacantes;
    private Long organizadorId;
    private EstadoTaller estado;
}
