import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ProSidebarProvider } from 'react-pro-sidebar';
import { AuthProvider } from '../components/auth/AuthContext.tsx';
import { ProjectProvider } from '../components/ProjectContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ProjectProvider>
        <ProSidebarProvider>
          <App />
        </ProSidebarProvider>
      </ProjectProvider>
    </AuthProvider>
  </React.StrictMode>,
) 