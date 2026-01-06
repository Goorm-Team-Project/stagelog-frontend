import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import SubLayout from '@/layout/SubLayout'
import AuthLayout from '@/layout/AuthLayout'

import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import SearchPage from '@/pages/SearchPage'
import ConcertPage from '@/pages/ConcertPage'



export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
    ],
  },
  {
    element: <SubLayout />,
    children: [
      { path: '/search', element: <SearchPage /> },
      { path: '/concerts', element: <ConcertPage /> },
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  }
])
