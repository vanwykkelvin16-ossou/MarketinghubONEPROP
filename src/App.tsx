import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import DocumentsPage from './components/DocumentsPage';
import MarketingSystem from './components/MarketingSystem';
import MarketingHub from './components/marketing/MarketingHub';
import MarketingVideos from './components/marketing/MarketingVideos';
import MarketingPosters from './components/marketing/MarketingPosters';
import CanvaHub from './components/marketing/CanvaHub';
import BrandIdentity from './components/marketing/BrandIdentity';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/"                    element={<Dashboard />} />
          <Route path="/marketing-system"    element={<MarketingSystem />} />
          <Route path="/documents"           element={<DocumentsPage />} />
          <Route path="/marketing"           element={<MarketingHub />} />
          <Route path="/marketing/videos"    element={<MarketingVideos />} />
          <Route path="/marketing/posters"   element={<MarketingPosters />} />
          <Route path="/marketing/canva"     element={<CanvaHub />} />
          <Route path="/marketing/brand"     element={<BrandIdentity />} />
          <Route path="*"                    element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
