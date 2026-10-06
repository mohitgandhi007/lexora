import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChambersLayout } from './components/layout/ChambersLayout';
import { DashboardPage } from './pages/dashboard';
import { DocumentsPage, DocumentViewerPage } from './pages/documents';
import { UploadPage } from './pages/upload';
import { SummaryPage } from './pages/summary';
import { SearchPage } from './pages/search';
import { SettingsPage } from './pages/settings';
import { PortalPage } from './pages/portal';
import { LoginPage, RegisterPage, ForgotPasswordPage } from './pages/auth';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ChambersLayout>
              <DashboardPage />
            </ChambersLayout>
          }
        />
        <Route
          path="/documents"
          element={
            <ChambersLayout>
              <DocumentsPage />
            </ChambersLayout>
          }
        />
        <Route
          path="/documents/:id"
          element={
            <ChambersLayout hideFooter>
              <DocumentViewerPage />
            </ChambersLayout>
          }
        />
        <Route
          path="/upload"
          element={
            <ChambersLayout>
              <UploadPage />
            </ChambersLayout>
          }
        />
        <Route
          path="/summary/:id"
          element={
            <ChambersLayout>
              <SummaryPage />
            </ChambersLayout>
          }
        />
        <Route
          path="/search"
          element={
            <ChambersLayout>
              <SearchPage />
            </ChambersLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <ChambersLayout>
              <SettingsPage />
            </ChambersLayout>
          }
        />
        <Route
          path="/portal"
          element={
            <ChambersLayout>
              <PortalPage />
            </ChambersLayout>
          }
        />

        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
