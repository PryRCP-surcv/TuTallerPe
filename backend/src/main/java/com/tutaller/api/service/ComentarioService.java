package com.tutaller.api.service;

import com.tutaller.api.dto.ComentarioRequest;
import com.tutaller.api.dto.ComentarioResponse;
import com.tutaller.api.model.Comentario;
import com.tutaller.api.repository.ComentarioRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ComentarioService {

    private final ComentarioRepository comentarioRepository;
    private final UsuarioService usuarioService;
    private final TallerService tallerService;

    @Transactional(readOnly = true)
    public List<ComentarioResponse> obtenerPorTaller(Long tallerId) {
        return comentarioRepository.findByTallerIdOrderByIdDesc(tallerId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ComentarioResponse crear(ComentarioRequest request) {
        Comentario comentario = Comentario.builder()
                .usuario(usuarioService.obtenerEntidadPorId(request.getUsuarioId()))
                .taller(tallerService.obtenerEntidadPorId(request.getTallerId()))
                .comentario(request.getComentario())
                .calificacion(request.getCalificacion())
                .build();

        return toResponse(comentarioRepository.save(comentario));
    }

    private ComentarioResponse toResponse(Comentario comentario) {
        return ComentarioResponse.builder()
                .id(comentario.getId())
                .usuarioId(comentario.getUsuario().getId())
                .usuarioNombre(comentario.getUsuario().getNombres())
                .tallerId(comentario.getTaller().getId())
                .tallerNombre(comentario.getTaller().getNombre())
                .comentario(comentario.getComentario())
                .calificacion(comentario.getCalificacion())
                .build();
    }
}
