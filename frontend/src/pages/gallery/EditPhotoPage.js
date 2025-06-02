import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { imageFileUpload } from "../../firebase" ;
import '../../css/UploadPage.css'; 


const EditPhotoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loc, setLoc] = useState("");
    const [shootDate, setShootDate] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [file, setFile] = useState(null);
    const [originalUrl, setOriginalUrl] = useState("");


    // 기존 정보 불러오기
    useEffect(() => {
        fetch(`/api/gallery/${id}`)
        .then(res=> res.json())
        .then(data => {
            setLoc(data.loc || "");
            setShootDate(data.shootDate || "");
            setDescription(data.description || "");
            setTag(data.tag || "");
            setOriginalUrl(data.url || "");
        })
        .catch(error => {
            console.error("정보 불러오기 실패:", error);
            alert("정보를 불러오는 데 실패했습니다. 다시 시도해주세요.");
        });
    }, [id]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!file) {
            alert("사진을 선택해주세요!");
            return;
        }

        try {
            let imageUrl = originalUrl;

            if(file){
                const {url} = await imageFileUpload(file);
                imageUrl = url;
            }

            // 서버에 전송할 데이터 준비
            const dto = {
                loc: loc,
                shootDate: shootDate,
                uploadDate: new Date().toISOString().slice(0, 10), // 현재 날짜를 YYYY-MM-DD 형식으로
                description: description,
                tag: tag,
                url: imageUrl,
            };

            // 서버에 데이터 전송
            const response = await fetch(`/api/gallery/${id}`, {
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dto),
            });

            if(response.ok){
                alert("사진 수정 성공!");
                navigate('/GalleryPage'); 
            } else {
                alert ("사진 수정 실패. 서버 오류가 발생했습니다.");
                console.error("수정 실패:", response.statusText);
            }
        } catch (error){
            console.error("수정 중 오류 발생:", error);
            alert("수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };


    return (
        <form className="upload-form" onSubmit={handleSubmit}>
            <div className="image-preview">
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

export default EditPhotoPage;