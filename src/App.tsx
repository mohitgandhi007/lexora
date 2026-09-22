import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChambersLayout } from './components/layout/ChambersLayout';
import { Home } from './pages/Home';
import { Documents } from './pages/Documents';
import { DocumentViewer } from './pages/DocumentViewer';
import { Upload } from './pages/Upload';
import { Summary } from './pages/Summary';
import { Search } from './pages/Search';
import { Settings } from './pages/Settings';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Chambers Core Workspace Routes (with ChambersLayout) */}
        <Route
          path="/"
          element={
            <ChambersLayout>
              <Home />
            </ChambersLayout>
          }
        />
        <Route
          path="/documents"
          element={
            <ChambersLayout>
              <Documents />
            </ChambersLayout>
          }
        />
        <Route
          path="/documents/:id"
          element={
            <ChambersLayout hideFooter>
              <DocumentViewer />
            </ChambersLayout>
          }
        />
        <Route
          path="/upload"
          element={
            <ChambersLayout>
              <Upload />
            </ChambersLayout>
          }
        />
        <Route
          path="/summary/:id"
          element={
            <ChambersLayout>
              <Summary />
            </ChambersLayout>
          }
        />
        <Route
          path="/search"
          element={
            <ChambersLayout>
              <Search />
            </ChambersLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <ChambersLayout>
              <Settings />
            </ChambersLayout>
          }
        />

        {/* Auth Suite Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
