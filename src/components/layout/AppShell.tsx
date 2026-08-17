import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function AppShell() {
  return (
    <div className="min-h-svh bg-[#FFF9F3]">
      <div className="max-w-lg mx-auto relative min-h-svh">
        <main className="pb-24">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
