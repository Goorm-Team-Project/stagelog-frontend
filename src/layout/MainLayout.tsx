import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <main className="flex-1 py-6">
        <Outlet />
      </main>
    </div>
  )
}
