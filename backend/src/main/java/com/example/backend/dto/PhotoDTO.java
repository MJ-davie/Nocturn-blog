package com.example.backend.dto;

import com.example.backend.entity.Photo;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class PhotoDTO {

    private Long id;
    private LocalDate shootDate;
    private LocalDate uploadDate;
    private String loc;
    private String description;
    private String url;
    private String thumbnailUrl;
    private String tag;


    public Photo toEntity() {
        return Photo.builder()
                .shootDate(shootDate)
                .uploadDate(uploadDate)
                .loc(loc)
                .description(description)
                .url(url)
                .thumbnailUrl(thumbnailUrl)
                .tag(tag)
                .build();
    }

    public static PhotoDTO toDTO(Photo photo) {
        return PhotoDTO.builder()
                .id(photo.getId())
                .shootDate(photo.getShootDate())
                .uploadDate(photo.getUploadDate())
                .loc(photo.getLoc())
                .description(photo.getDescription())
                .url(photo.getUrl())
                .thumbnailUrl(photo.getThumbnailUrl())
                .tag(photo.getTag())
                .build();
    }

}

