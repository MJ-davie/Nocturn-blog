package com.example.backend.contorller;

import com.example.backend.dto.PhotoDTO;
import com.example.backend.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gallery")
public class PhotoRestController {

    private final PhotoService photoService;

    @PostMapping
    public ResponseEntity<Long> save(@RequestBody PhotoDTO dto) {
        Long id = photoService.save(dto);
        return ResponseEntity.ok(id);
    }

    @GetMapping
    public ResponseEntity<List<PhotoDTO>> findAll(){
        return ResponseEntity.ok(photoService.findAll());
    }
}
