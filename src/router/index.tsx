import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import AuthLayout from '@/layout/AuthLayout'

import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'


export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
    ],
  }
])
