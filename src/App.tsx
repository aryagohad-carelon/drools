import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RestaurantProvider } from './context/RestaurantContext'
import AppShell from './components/layout/AppShell'
import HomeFeed from './screens/HomeFeed'
import RestaurantDetail from './screens/RestaurantDetail'
import AddRecommendation from './screens/AddRecommendation'

// Placeholder screens for nav tabs not yet built
function PlaceholderScreen({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <div className="text-6xl mb-4">🚧</div>
      <h2 className="text-xl font-bold text-[#2A211E] mb-2">{label}</h2>
      <p className="text-sm text-[#9B8A82]">Coming in the next phase.</p>
    </div>
  )
}

export default function App() {
  return (
    <RestaurantProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<HomeFeed />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/add" element={<AddRecommendation />} />
            <Route path="/explore" element={<PlaceholderScreen label="Explore" />} />
            <Route path="/favorites" element={<PlaceholderScreen label="Favorites" />} />
            <Route path="/profile" element={<PlaceholderScreen label="Profile" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RestaurantProvider>
  )
}
