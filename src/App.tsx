import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { LoginForm } from './modules/auth/components/LoginForm';
import { PrivateRoute } from './modules/auth/components/PrivateRoute';
import { Shell } from './components/layout/Shell';
import { useAuthStore } from './modules/auth/store/authStore';
import { ThemeProvider } from './components/ui/theme-provider';
import { queryClient } from './lib/query-client';

// Import pages
import { CRMPage } from './modules/crm/pages/CRMPage';
import { ChatPage } from './modules/chat/pages/ChatPage';
import { WhatsAppPage } from './modules/whatsapp/pages/WhatsAppPage';
import { ReportsPage } from './modules/reports/pages/ReportsPage';
import { ProposalsPage } from './modules/proposals/pages/ProposalsPage';
import { ContractsPage } from './modules/contracts/pages/ContractsPage';
import { AIPage } from './modules/ai/pages/AIPage';
import { SettingsPage } from './modules/settings/pages/SettingsPage';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DndProvider backend={HTML5Backend}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={
                  isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />
                }
              />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Shell />
                  </PrivateRoute>
                }
              >
                <Route index element={<Navigate to="/crm" replace />} />
                <Route
                  path="crm"
                  element={
                    <PrivateRoute requiredPermissions={['crm.access']}>
                      <CRMPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="chat"
                  element={
                    <PrivateRoute requiredPermissions={['chat.access']}>
                      <ChatPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="whatsapp"
                  element={
                    <PrivateRoute requiredPermissions={['whatsapp.access']}>
                      <WhatsAppPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="reports"
                  element={
                    <PrivateRoute requiredPermissions={['reports.access']}>
                      <ReportsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="proposals"
                  element={
                    <PrivateRoute requiredPermissions={['proposals.access']}>
                      <ProposalsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="contracts"
                  element={
                    <PrivateRoute requiredPermissions={['contracts.access']}>
                      <ContractsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="ai"
                  element={
                    <PrivateRoute requiredPermissions={['ai.access']}>
                      <AIPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <PrivateRoute>
                      <SettingsPage />
                    </PrivateRoute>
                  }
                />
              </Route>
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 5000,
                style: {
                  background: 'transparent',
                  padding: 0,
                  margin: 0,
                  boxShadow: 'none',
                },
              }}
            />
          </BrowserRouter>
        </DndProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;