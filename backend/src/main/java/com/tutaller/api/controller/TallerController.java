package com.tutaller.api.controller;

import com.tutaller.api.dto.TallerRequest;
import com.tutaller.api.dto.TallerResponse;
import com.tutaller.api.service.TallerService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/talleres")
@RequiredArgsConstructor
public class TallerController {

    private final TallerService tallerService;

    @GetMapping
    public List<TallerResponse> listarTalleres() {
        return tallerService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public TallerResponse obtenerTaller(@PathVariable Long id) {
        return tallerService.obtenerPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TallerResponse crearTaller(@Valid @RequestBody TallerRequest request) {
        return tallerService.crear(request);
    }

    @PutMapping("/{id}")
    public TallerResponse actualizarTaller(@PathVariable Long id, @Valid @RequestBody TallerRequest request) {
        return tallerService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminarTaller(@PathVariable Long id) {
        tallerService.eliminar(id);
    }
}
