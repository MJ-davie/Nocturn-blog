package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate shootDate;

    @CreatedDate
    private LocalDate uploadDate;
    //촬영장소
    private String loc;
    private String description;

    @Column( nullable = false)
    private String url;

    private String tags;
}
