import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRestaurants } from '../context/RestaurantContext'
import { CUISINE_FILTERS, AREAS } from '../constants'
import SearchBar from '../components/ui/SearchBar'
import FilterChip from '../components/ui/FilterChip'
import Avatar from '../components/ui/Avatar'
import RestaurantCard from '../components/cards/RestaurantCard'
import SkeletonCard from '../components/cards/SkeletonCard'
import EmptyState from '../components/states/EmptyState'
import NoResults from '../components/states/NoResults'

export default function HomeFeed() {
  const navigate = useNavigate()
  const { restaurants, loading, toggleLike } = useRestaurants()

  const [searchQuery, setSearchQuery] = useState('')
  const [activeCuisine, setActiveCuisine] = useState('All')
  const [activeArea, setActiveArea] = useState('')

  // Trending = the 5 most-liked entries from the live feed
  const trendingRestaurants = useMemo(
    () => [...restaurants].sort((a, b) => b.likes - a.likes).slice(0, 5),
    [restaurants]
  )

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      const q = searchQuery.toLowerCase()
      if (q && !r.name.toLowerCase().includes(q) && !r.area.toLowerCase().includes(q) && !r.cuisine.some((c) => c.toLowerCase().includes(q))) return false
      if (activeCuisine !== 'All' && !r.cuisine.includes(activeCuisine)) return false
      if (activeArea && r.area !== activeArea) return false
      return true
    })
  }, [restaurants, searchQuery, activeCuisine, activeArea])

  const isFiltered = searchQuery !== '' || activeCuisine !== 'All' || activeArea !== ''

  return (
    <div className="min-h-screen bg-[#FFF9F3]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#FFF9F3]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 pt-14 pb-3">
          <div>
            <span className="text-2xl font-black tracking-tight text-[#B5224A]">drools</span>
            <span className="text-2xl">🤤</span>
          </div>
          <button
            onClick={() => navigate('/profile')}
            aria-label="Profile"
            className="w-9 h-9 rounded-full bg-[#EDE0D2] flex items-center justify-center text-[#B5224A] font-bold text-sm hover:bg-[#E0D0C4] transition-colors"
          >
            A
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pb-3">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* Hero — only shown when not filtering */}
          {!isFiltered && (
            <div className="px-5 pt-4 pb-6">
              <h1 className="text-3xl font-black text-[#2A211E] leading-tight mb-1">
                Where should we<br />eat today?
              </h1>
              <p className="text-sm text-[#9B8A82] mb-5">
                Trusted recommendations from people around you.
              </p>
              <button
                onClick={() => navigate('/add')}
                className="flex items-center gap-2 px-5 py-3 bg-[#B5224A] text-white rounded-2xl font-semibold text-sm hover:bg-[#9B1C3D] transition-colors shadow-sm active:scale-[0.98]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Recommendation
              </button>
            </div>
          )}

          {/* Trending — only shown when not filtering */}
          {!isFiltered && (
            <section className="mb-6">
              <div className="flex items-center justify-between px-5 mb-3">
                <h2 className="text-base font-bold text-[#2A211E]">🔥 Trending this week</h2>
              </div>
              <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide">
                {trendingRestaurants.map((r) => (
                  <RestaurantCard key={r.id} restaurant={r} variant="horizontal" onLike={toggleLike} />
                ))}
              </div>
            </section>
          )}

          {/* Cuisine filter chips */}
          <div className="flex gap-2 overflow-x-auto px-5 pb-3 scrollbar-hide">
            {CUISINE_FILTERS.map((c) => (
              <FilterChip
                key={c}
                label={c}
                active={activeCuisine === c}
                onClick={() => setActiveCuisine(c)}
              />
            ))}
          </div>

          {/* Area filter chips */}
          <div className="flex gap-2 overflow-x-auto px-5 pb-4 scrollbar-hide">
            {AREAS.map((a) => (
              <FilterChip
                key={a}
                label={a}
                active={activeArea === a}
                onClick={() => setActiveArea(activeArea === a ? '' : a)}
              />
            ))}
          </div>

          {/* Divider + section heading */}
          <div className="flex items-center justify-between px-5 mb-4">
            <h2 className="text-base font-bold text-[#2A211E]">
              {isFiltered ? `${filteredRestaurants.length} result${filteredRestaurants.length !== 1 ? 's' : ''}` : 'All recommendations'}
            </h2>
            {isFiltered && (
              <button
                onClick={() => { setSearchQuery(''); setActiveCuisine('All'); setActiveArea('') }}
                className="text-xs text-[#B5224A] font-medium"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Feed */}
          {filteredRestaurants.length === 0 ? (
            searchQuery ? <NoResults query={searchQuery} /> : <EmptyState />
          ) : (
            <div className="px-5 pb-8 flex flex-col gap-4">
              {filteredRestaurants.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} variant="vertical" onLike={toggleLike} />
              ))}
            </div>
          )}

          {/* Contributors row */}
          {!isFiltered && restaurants.length > 0 && (
            <div className="px-5 pb-6">
              <p className="text-xs text-[#C2AFA7] mb-2">Top contributors</p>
              <div className="flex items-center gap-2 flex-wrap">
                {[...new Map(restaurants.map((r) => [r.contributor.id, r.contributor])).values()]
                  .slice(0, 5)
                  .map((u) => (
                    <div key={u.id} className="flex items-center gap-1.5">
                      <Avatar src={u.avatar} name={u.name} size="sm" />
                      <span className="text-xs text-[#9B8A82]">{u.name.split(' ')[0]}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="px-5 py-4 flex flex-col gap-4">
      <SkeletonCard variant="vertical" />
      <SkeletonCard variant="vertical" />
      <SkeletonCard variant="vertical" />
    </div>
  )
}
