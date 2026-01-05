import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-6">
        <Outlet />
      </main>

    </div>
  )
}
