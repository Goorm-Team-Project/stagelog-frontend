import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-6">
        <Outlet />
      </main>
    </div>
  )
}
