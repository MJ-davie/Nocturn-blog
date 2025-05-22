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
    private LocalDate shoot_date;
    private LocalDate upload_date;
    private String loc;
    private String description;
    private String url;
    private String tags;


    public Photo toEntity() {
        return Photo.builder()
                .shootDate(shoot_date)
                .uploadDate(upload_date)
                .loc(loc)
                .description(description)
                .url(url)
                .tags(tags)
                .build();
    }

    public static PhotoDTO toDTO(Photo photo) {
        return PhotoDTO.builder()
                .id(photo.getId())
                .shoot_date(photo.getShootDate())
                .upload_date(photo.getUploadDate())
                .loc(photo.getLoc())
                .description(photo.getDescription())
                .url(photo.getUrl())
                .tags(photo.getTags())
                .build();
    }

}

