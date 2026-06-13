package com.tutaller.api.controller;

import com.tutaller.api.dto.InscripcionRequest;
import com.tutaller.api.dto.InscripcionResponse;
import com.tutaller.api.service.InscripcionService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inscripciones")
@RequiredArgsConstructor
public class InscripcionController {

    private final InscripcionService inscripcionService;

    @GetMapping
    public List<InscripcionResponse> listarInscripciones() {
        return inscripcionService.obtenerTodas();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InscripcionResponse crearInscripcion(@Valid @RequestBody InscripcionRequest request) {
        return inscripcionService.crear(request);
    }
}
