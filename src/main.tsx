import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import '@/services/interceptor'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  // </StrictMode>,
)
