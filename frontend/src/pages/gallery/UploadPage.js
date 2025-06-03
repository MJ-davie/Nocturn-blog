import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { imageFileUpload } from "../../firebase" ;
import '../../css/UploadPage.css'; 

const UploadPage = () => {
    const [loc, setLoc] = useState("");
    const [shootDate, setShootDate] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [previewUrl, setPreviewUrl] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const preview = URL.createObjectURL(selectedFile);
            setPreviewUrl(preview);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!file) {
            alert("사진을 선택해주세요!");
            return;
        }

        try {
            // Firebase에 이미지 업로드
            const { url } = await imageFileUpload(file);

            // 서버에 전송할 데이터 준비
            const dto = {
                loc: loc,
                shootDate: shootDate,
                uploadDate: new Date().toISOString().slice(0, 10), // 현재 날짜를 YYYY-MM-DD 형식으로
                description: description,
                tag: tag,
                url: url,
            };

            // 서버에 데이터 전송
            const response = await fetch('/api/gallery/upload', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dto),
            });

            if(response.ok){
                alert("사진 업로드 성공!");
                navigate('/GalleryPage'); 
            } else {
                alert ("사진 업로드 실패. 서버 오류가 발생했습니다.");
                console.error("업로드 실패:", response.statusText);
            }
        } catch (error){
            console.error("업로드 중 오류 발생:", error);
            alert("업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };


    return (
        <form className="upload-form" onSubmit={handleSubmit}>
            <div className="image-preview">
                {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: "300px", height: "200px", objectFit: "cover" }} />}
                <input type="file" accept="image/*" onChange={handleFileChange}/>
            </div>
            <input type="text" placeholder="장소" value={loc} onChange={(e)=>setLoc(e.target.value)}/>
            <input type="date" placeholder="날짜" value={shootDate} onChange={(e)=>setShootDate(e.target.value)}/>
            <input type="text" placeholder="설명" value={description} onChange={(e)=>setDescription(e.target.value)} />
            <input type="text" placeholder="태그" value={tag} onChange={(e)=>setTag(e.target.value)} />
            <button type="submit">업로드</button>
        </form>
    )
};

export default UploadPage;