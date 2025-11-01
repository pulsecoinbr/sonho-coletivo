import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CampaignPage from './pages/CampaignPage';
import DonatePage from './pages/DonatePage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import TermsParticipantPage from './pages/TermsParticipantPage';
import TermsDonorPage from './pages/TermsDonorPage';
import HowItWorksPage from './pages/HowItWorksPage';
import WhatsAppButton from './components/WhatsAppButton';
import { ErrorBoundary } from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ErrorBoundary>
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/como-funciona" element={<HowItWorksPage />} />
                <Route path="/quem-somos" element={<AboutPage />} />
                <Route path="/ajuda" element={<HelpPage />} />
                <Route path="/termos-participante" element={<TermsParticipantPage />} />
                <Route path="/termos-doador" element={<TermsDonorPage />} />
                <Route path="/campaign/:id" element={<CampaignPage />} />
                <Route path="/donate/:id" element={<DonatePage />} />
                <Route path="/create" element={<CreateCampaignPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </AppProvider>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default App;