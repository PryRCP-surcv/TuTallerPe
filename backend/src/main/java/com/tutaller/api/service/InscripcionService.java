package com.tutaller.api.service;

import com.tutaller.api.dto.InscripcionRequest;
import com.tutaller.api.dto.InscripcionResponse;
import com.tutaller.api.model.Inscripcion;
import com.tutaller.api.model.enums.EstadoInscripcion;
import com.tutaller.api.repository.InscripcionRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InscripcionService {

    private final InscripcionRepository inscripcionRepository;
    private final UsuarioService usuarioService;
    private final TallerService tallerService;

    @Transactional(readOnly = true)
    public List<InscripcionResponse> obtenerTodas() {
        return inscripcionRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public InscripcionResponse crear(InscripcionRequest request) {
        Inscripcion inscripcion = Inscripcion.builder()
                .usuario(usuarioService.obtenerEntidadPorId(request.getUsuarioId()))
                .taller(tallerService.obtenerEntidadPorId(request.getTallerId()))
                .fechaInscripcion(LocalDateTime.now())
                .estado(request.getEstado() != null ? request.getEstado() : EstadoInscripcion.PENDIENTE)
                .build();

        return toResponse(inscripcionRepository.save(inscripcion));
    }

    private InscripcionResponse toResponse(Inscripcion inscripcion) {
        return InscripcionResponse.builder()
                .id(inscripcion.getId())
                .usuarioId(inscripcion.getUsuario().getId())
                .usuarioNombre(inscripcion.getUsuario().getNombres())
                .tallerId(inscripcion.getTaller().getId())
                .tallerNombre(inscripcion.getTaller().getNombre())
                .fechaInscripcion(inscripcion.getFechaInscripcion())
                .estado(inscripcion.getEstado())
                .build();
    }
}
