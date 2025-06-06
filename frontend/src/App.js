import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import GalleryPage from './pages/gallery/GalleryPage';
import AdminLogin from './pages/AdminLogin';
import UploadPage from './pages/gallery/UploadPage';
import EditPhotoPage from './pages/gallery/EditPhotoPage';
import GlobalStyle from './styles/GlobalStyles.styles';

function App() {
  return (
    <Router>
      <Header />
      <GlobalStyle />
      <Routes>
        <Route path="/GalleryPage" element={<GalleryPage />} />
        <Route path={process.env.REACT_APP_ADMIN_ROUTE} element={<AdminLogin />} />
        <Route path="/gallery/upload" element={<UploadPage />} />
        <Route path="/gallery/edit/:id" element={<EditPhotoPage />} />
      </Routes>
    </Router>
  );
}

export default App;