import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CloudHeartIcon } from './components/icons';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminVisualIdentityPage from './pages/AdminVisualIdentityPage';
import AdminImagesBannersPage from './pages/AdminImagesBannersPage';
import AdminDonationsPage from './pages/AdminDonationsPage';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';
import AdminSettingsPage from './pages/AdminSettingsPage';
import { ErrorBoundary } from './components/ErrorBoundary';

const AdminApp: React.FC = () => {
  return (
    <HashRouter>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <div className="flex items-center space-x-2 text-2xl font-bold text-brand-primary">
                    <CloudHeartIcon className="h-8 w-8 text-brand-secondary" />
                    <span>Painel Administrativo — Sonho Coletivo</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
                    ← Voltar ao site
                  </a>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<AdminLoginPage />} />
              <Route path="/dashboard" element={<AdminDashboardPage />} />
              <Route path="/visual-identity" element={<AdminVisualIdentityPage />} />
              <Route path="/images-banners" element={<AdminImagesBannersPage />} />
              <Route path="/donations" element={<AdminDonationsPage />} />
              <Route path="/analytics" element={<AdminAnalyticsPage />} />
              <Route path="/settings" element={<AdminSettingsPage />} />
            </Routes>
          </main>
        </div>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default AdminApp;