package com.tutaller.api.service;

import com.tutaller.api.dto.AuthLoginRequest;
import com.tutaller.api.dto.AuthRegisterRequest;
import com.tutaller.api.dto.AuthResponse;
import com.tutaller.api.dto.UsuarioRequest;
import com.tutaller.api.dto.UsuarioResponse;
import com.tutaller.api.exception.ResourceNotFoundException;
import com.tutaller.api.model.Usuario;
import com.tutaller.api.model.enums.RolUsuario;
import com.tutaller.api.repository.UsuarioRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<UsuarioResponse> obtenerTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public UsuarioResponse obtenerPorId(Long id) {
        return toResponse(obtenerEntidadPorId(id));
    }

    @Transactional
    public UsuarioResponse crear(UsuarioRequest request) {
        validarCorreoDisponible(request.getCorreo());

        Usuario usuario = Usuario.builder()
                .nombres(request.getNombres())
                .correo(request.getCorreo())
                .telefono(request.getTelefono())
                .password(passwordEncoder.encode(request.getPassword()))
                .rol(request.getRol() != null ? request.getRol() : RolUsuario.USUARIO)
                .build();

        return toResponse(usuarioRepository.save(usuario));
    }

    @Transactional
    public AuthResponse registrar(AuthRegisterRequest request) {
        UsuarioRequest usuarioRequest = new UsuarioRequest();
        usuarioRequest.setNombres(request.getNombres());
        usuarioRequest.setCorreo(request.getCorreo());
        usuarioRequest.setTelefono(request.getTelefono());
        usuarioRequest.setPassword(request.getPassword());
        usuarioRequest.setRol(request.getRol() != null ? request.getRol() : RolUsuario.USUARIO);

        UsuarioResponse usuario = crear(usuarioRequest);
        return AuthResponse.builder()
                .message("Registro exitoso.")
                .usuario(usuario)
                .build();
    }

    @Transactional(readOnly = true)
    public AuthResponse login(AuthLoginRequest request) {
        Usuario usuario = usuarioRepository.findByCorreo(request.getCorreo())
                .orElseThrow(() -> new ResourceNotFoundException("No existe un usuario con el correo proporcionado."));

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new IllegalArgumentException("Las credenciales son invalidas.");
        }

        return AuthResponse.builder()
                .message("Inicio de sesion exitoso.")
                .usuario(toResponse(usuario))
                .build();
    }

    @Transactional(readOnly = true)
    public Usuario obtenerEntidadPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id " + id));
    }

    private void validarCorreoDisponible(String correo) {
        if (usuarioRepository.existsByCorreo(correo)) {
            throw new IllegalArgumentException("El correo ya se encuentra registrado.");
        }
    }

    private UsuarioResponse toResponse(Usuario usuario) {
        return UsuarioResponse.builder()
                .id(usuario.getId())
                .nombres(usuario.getNombres())
                .correo(usuario.getCorreo())
                .telefono(usuario.getTelefono())
                .rol(usuario.getRol())
                .build();
    }
}
