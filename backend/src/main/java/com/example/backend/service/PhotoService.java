package com.example.backend.service;

import com.example.backend.dto.PhotoDTO;
import com.example.backend.entity.Photo;
import com.example.backend.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoRepository photoRepository;

    public Long save(PhotoDTO dto) {
        Photo photo = dto.toEntity();
        return photoRepository.save(photo).getId();
    }

    public List<PhotoDTO> findAll() {
        return photoRepository.findAll().stream()
                .map(PhotoDTO::toDTO)
                .toList();
    }
}
