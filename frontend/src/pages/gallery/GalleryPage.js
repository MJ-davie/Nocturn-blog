import React, { useState, useEffect } from "react";
import style from "styled-components";
import { useNavigate } from "react-router-dom";
import '../../css/GalleryPage.css';
import { deleteFile } from "../../firebase";


const GalleryPage = () => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);

    // 사진 데이터 가져오기
    useEffect(() => {
        fetch('/api/gallery')
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setPhotos(data);
            } else {
              console.error("받은 데이터가 배열이 아님:", data);
              setPhotos([]);
            }
          })
          .catch((error) => {
            console.error("사진 데이터 가져오기 실패:", error);
            setPhotos([]);
          });
    }, []);

    // 삭제 핸들러
    const handleDelete = async (photo) => {
        if (window.confirm("삭제하시겠습니까?")) {
            try {
                await deleteFile(photo.url);
                await fetch(`/api/gallery/${photo.id}`, {
                    method: 'DELETE',
                });
                setPhotos((prevPhotos)=> prevPhotos.filter(p => p.id !== photo.id));
                alert("사진이 삭제되었습니다.");
            } catch (error) {
                console.error("사진 삭제 실패:", error);
                alert("사진 삭제에 실패했습니다.");
            }
        }
    };

    return (
        <div className="gallery-container">
            <div className="photo-grid">
                {Array.isArray(photos) && photos.map((photo) => (
                  <div key={photo.id} className="photo-card">
                    <PhotoWrapper>
                      {isAdmin === true && (
                        <>
                        <DeleteButton onClick={() => handleDelete(photo)}>삭제</DeleteButton>
                        <EditButton onClick={()=> navigate(`/gallery/edit/${photo.id}`)}>수정</EditButton>
                        </>
                      )}
                      <img src={photo.thumbnailUrl || photo.url} alt={photo.description} />
                    </PhotoWrapper>
                    <PhotoInfo>
                        <p>{photo.loc}</p>
                        <p>{photo.shoot_date}</p>
                    </PhotoInfo>
                  </div>
                ))}
            </div>
            {isAdmin === true && (
              <UploadButtonContainer>
                <UploadButton 
                  onClick={() => navigate('/gallery/upload')} 
                  className="upload-button">사진 업로드</UploadButton>
              </UploadButtonContainer>
            )}
        </div>
    );
};


export default GalleryPage;

const UploadButtonContainer = style.div`
    display: flex;
    justify-content: right;
    margin-top: 20px;
    `;

const UploadButton = style.button`
    padding: 10px 20px;
    background-color: #0059A1;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #EBE7D9;
        color: #0059A1;
    }
`;

const PhotoInfo = style.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 12px;
    color: #555;
    margin: 0px;
    padding: 0px;
`;

const PhotoWrapper = style.div`
    position: relative;
    width: 100%;
    height: auto;
    padding-bottom: 5px;
`;

const DeleteButton = style.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 4px 6px;
  cursor: pointer;
`;

const EditButton = style.button`
  position: absolute;
  top: 5px;
  left: 5px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 4px 6px;
  cursor: pointer;
`;
