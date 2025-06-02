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

    public void delete(Long id){
        photoRepository.deleteById(id);
    }

    // 사진 조회
    public PhotoDTO findById(Long id){
        return photoRepository.findById(id)
                .map(PhotoDTO::toDTO)
                .orElseThrow(()->new IllegalArgumentException("해당 사진이 존재하지 않습니다."));
    }

    // 수정
    public void update(Long id, PhotoDTO dto) {
        Photo photo = photoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 사진이 존재하지 않습니다."));

        photo.setLoc(dto.getLoc());
        photo.setShootDate(dto.getShootDate());
        photo.setUploadDate(dto.getUploadDate());
        photo.setDescription(dto.getDescription());
        photo.setTag(dto.getTag());
        photo.setUrl(dto.getUrl());

        photoRepository.save(photo);
    }
}
