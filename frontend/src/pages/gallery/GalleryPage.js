import React from "react";
import '../../css/GalleryPage.css';

const dummyPhotos = [
  { id: 1, src: "/images/grid.png", description: "첫 번째 사진" },
  { id: 2, src: "/images/main.png", description: "두 번째 사진" },
  { id: 3, src: "/images/grid.png", description: "세 번째 사진" },
  { id: 4, src: "/images/main.png", description: "네 번째 사진" },
  { id: 5, src: "/images/grid.png", description: "다섯 번째 사진" },
  { id: 6, src: "/images/main.png", description: "여섯 번째 사진" },
];

const GalleryPage = () => {
    return (
        <div className="gallery-container">
            <div className="photo-grid">
                {dummyPhotos.map((photo) => (
                <div key={photo.id} className="photo-card">
                    <img src={photo.src} alt={photo.description} />
                </div>
                ))}
            </div>
        </div>
    );
};


export default GalleryPage;