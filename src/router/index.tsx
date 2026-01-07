import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import SubLayout from '@/layout/SubLayout'
import AuthLayout from '@/layout/AuthLayout'

import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import SearchPage from '@/pages/SearchPage'
import ConcertPage from '@/pages/ConcertPage'
import CommunityPage from '@/pages/CommunityPage'
import ConcertDetailPage from '@/pages/ConcertDetailPage'
import ConcertCommunityPage from '@/pages/ConcertCommunityPage'
import PostPage from '@/pages/PostPage'

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
      { path: '/community', element: <CommunityPage /> },
      { path: '/posts/:id', element: <PostPage /> },
      { path: '/concerts/:id', element: <ConcertDetailPage /> },
      { path: '/concerts/:id/posts', element: <ConcertCommunityPage /> },
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
