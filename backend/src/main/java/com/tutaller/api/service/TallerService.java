package com.tutaller.api.service;

import com.tutaller.api.dto.TallerRequest;
import com.tutaller.api.dto.TallerResponse;
import com.tutaller.api.exception.ResourceNotFoundException;
import com.tutaller.api.model.Taller;
import com.tutaller.api.model.enums.EstadoTaller;
import com.tutaller.api.repository.TallerRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TallerService {

    private final TallerRepository tallerRepository;

    @Transactional(readOnly = true)
    public List<TallerResponse> obtenerTodos() {
        return tallerRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public TallerResponse obtenerPorId(Long id) {
        return toResponse(obtenerEntidadPorId(id));
    }

    @Transactional
    public TallerResponse crear(TallerRequest request) {
        Taller taller = Taller.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .categoria(request.getCategoria())
                .distrito(request.getDistrito())
                .tipo(request.getTipo())
                .horario(request.getHorario())
                .precio(request.getPrecio())
                .vacantes(request.getVacantes())
                .estado(request.getEstado() != null ? request.getEstado() : EstadoTaller.ACTIVO)
                .build();

        return toResponse(tallerRepository.save(taller));
    }

    @Transactional
    public TallerResponse actualizar(Long id, TallerRequest request) {
        Taller taller = obtenerEntidadPorId(id);
        taller.setNombre(request.getNombre());
        taller.setDescripcion(request.getDescripcion());
        taller.setCategoria(request.getCategoria());
        taller.setDistrito(request.getDistrito());
        taller.setTipo(request.getTipo());
        taller.setHorario(request.getHorario());
        taller.setPrecio(request.getPrecio());
        taller.setVacantes(request.getVacantes());
        taller.setEstado(request.getEstado() != null ? request.getEstado() : taller.getEstado());

        return toResponse(tallerRepository.save(taller));
    }

    @Transactional
    public void eliminar(Long id) {
        Taller taller = obtenerEntidadPorId(id);
        tallerRepository.delete(taller);
    }

    @Transactional(readOnly = true)
    public Taller obtenerEntidadPorId(Long id) {
        return tallerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Taller no encontrado con id " + id));
    }

    private TallerResponse toResponse(Taller taller) {
        return TallerResponse.builder()
                .id(taller.getId())
                .nombre(taller.getNombre())
                .descripcion(taller.getDescripcion())
                .categoria(taller.getCategoria())
                .distrito(taller.getDistrito())
                .tipo(taller.getTipo())
                .horario(taller.getHorario())
                .precio(taller.getPrecio())
                .vacantes(taller.getVacantes())
                .estado(taller.getEstado())
                .build();
    }
}
