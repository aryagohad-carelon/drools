import { useLocation, useNavigate } from 'react-router-dom'

interface NavItem {
  id: string
  label: string
  path: string
  icon: (active: boolean) => React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: (active) => (
      <svg className={`w-6 h-6 ${active ? 'text-[#B5224A]' : 'text-[#9B8A82]'}`} fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'explore',
    label: 'Explore',
    path: '/explore',
    icon: (active) => (
      <svg className={`w-6 h-6 ${active ? 'text-[#B5224A]' : 'text-[#9B8A82]'}`} fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    id: 'add',
    label: 'Add',
    path: '/add',
    icon: () => (
      <div className="w-12 h-12 rounded-full bg-[#B5224A] flex items-center justify-center shadow-lg -mt-5">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>
    ),
  },
  {
    id: 'favorites',
    label: 'Saved',
    path: '/favorites',
    icon: (active) => (
      <svg className={`w-6 h-6 ${active ? 'text-[#B5224A]' : 'text-[#9B8A82]'}`} fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: (active) => (
      <svg className={`w-6 h-6 ${active ? 'text-[#B5224A]' : 'text-[#9B8A82]'}`} fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  function isActive(path: string) {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EDE0D2] safe-area-bottom">
      <div className="max-w-lg mx-auto flex items-end justify-around px-2 pt-2 pb-safe">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path)
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-0.5 min-w-[48px] py-1 px-2 transition-all"
              aria-label={item.label}
            >
              {item.icon(active)}
              {item.id !== 'add' && (
                <span className={`text-[10px] font-medium ${active ? 'text-[#B5224A]' : 'text-[#9B8A82]'}`}>
                  {item.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
