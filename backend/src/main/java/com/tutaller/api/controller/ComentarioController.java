package com.tutaller.api.controller;

import com.tutaller.api.dto.ComentarioRequest;
import com.tutaller.api.dto.ComentarioResponse;
import com.tutaller.api.service.ComentarioService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comentarios")
@RequiredArgsConstructor
public class ComentarioController {

    private final ComentarioService comentarioService;

    @GetMapping("/taller/{tallerId}")
    public List<ComentarioResponse> listarComentariosPorTaller(@PathVariable Long tallerId) {
        return comentarioService.obtenerPorTaller(tallerId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ComentarioResponse crearComentario(@Valid @RequestBody ComentarioRequest request) {
        return comentarioService.crear(request);
    }
}
