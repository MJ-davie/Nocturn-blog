import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import imageCompression from 'browser-image-compression';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

//이미지 데이터 URL로 변환
const makeDataUrl = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target.result);
        };
        reader.readAsDataURL(file);
    })
}

//라이브러리 이용해서 이미지 압축
const compressImage = async(file) => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (error) {
        console.error("Error compressing image:", error);
        throw error;
    }
};

//파일 이름 추출
const getFilename = async (fileUrl) => {
    if(!fileUrl || typeof fileUrl !== 'string'){
        return null;
    }
    const urlParts =fileUrl.split('/');
    const removeQuery = urlParts[urlParts.length - 1].split('?')[0];
    const filename = removeQuery.split('%2F')[1];
    return filename;
}

// 이미지 업로드 
const imageFileUpload = async (file) => {
    // image파일을 firebase에 업로드, {url, filename}형태로 반환

    if(!file) {
        return null;
    }

    if(typeof file === 'string') {
        const filename = await getFilename(file);
        return {url :file, filename: filename};
    }

    if(!(file instanceof File)){
        console.error("The provided input is not a valid File object:", file);
        throw new Error("The provided input is not a valid File object.");
    }

    const compressedFile = await compressImage(file);
    const fileExt = compressedFile.name.split('.').pop();
    const imageFile = await makeDataUrl(compressedFile);
    const uuid = uuidv4();
    const filename = `${uuid}.${fileExt}`;
    //저장경로 설정
    const storageRef = ref(storage, `images/${filename}`);
    
    try {
        const snapshot = await uploadString(storageRef, imageFile, 'data_url');
        const url = await getDownloadURL(snapshot.ref);
        return { url, filename };
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

//이미지 삭제
const deleteFile = async (fileUrl) => {
    //firebase storage url 받아서 버킷파일 삭제
    if(!fileUrl || typeof fileUrl !== 'string') {
        return;
    }

    const filename = await getFilename(fileUrl);
    const storageRef = ref(storage, `images/${filename}`);
    try {
        await getDownloadURL(storageRef);
        await deleteObject(storageRef);
    } catch (error) {
        if (error.code === 'storage/object-not-found') {
        console.error('File not found');
        return;
        } else {
        console.error('Error deleting file:', error);
        throw error;
        }
    }
};



export { app as storage, imageFileUpload, deleteFile };