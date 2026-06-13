package com.tutaller.api.repository;

import com.tutaller.api.model.Comentario;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    List<Comentario> findByTallerIdOrderByIdDesc(Long tallerId);
}
