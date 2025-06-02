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

    //모든 이미지 출력
    @GetMapping
    public ResponseEntity<List<PhotoDTO>> findAll(){
        return ResponseEntity.ok(photoService.findAll());
    }

    //사진 업로드
    @PostMapping
    @RequestMapping("/upload")
    public ResponseEntity<Long> save(@RequestBody PhotoDTO dto) {
        Long id = photoService.save(dto);
        return ResponseEntity.ok(id);
    }

    //사진 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        photoService.delete(id);
        return ResponseEntity.ok().build();
    }

    // 사진 조회
    @GetMapping("/{id}")
    public ResponseEntity<PhotoDTO> findById(@PathVariable Long id) {
        PhotoDTO dto = photoService.findById(id);
        return ResponseEntity.ok(dto);
    }

    // 사진 정보 수정
    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody PhotoDTO dto) {
        photoService.update(id, dto);
        return ResponseEntity.ok().build();
    }

}
