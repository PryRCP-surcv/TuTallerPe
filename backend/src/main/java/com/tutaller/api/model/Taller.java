package com.tutaller.api.model;

import com.tutaller.api.model.enums.EstadoTaller;
import com.tutaller.api.model.enums.TipoTaller;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "talleres")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Taller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false)
    private String categoria;

    @Column(nullable = false)
    private String distrito;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoTaller tipo;

    @Column(nullable = false)
    private String horario;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @Column(nullable = false)
    private Integer vacantes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoTaller estado;
}
