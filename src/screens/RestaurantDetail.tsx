import { useParams, useNavigate } from 'react-router-dom'
import { useRestaurants } from '../context/RestaurantContext'
import Avatar from '../components/ui/Avatar'
import CuisineTag from '../components/ui/CuisineTag'
import LikeButton from '../components/ui/LikeButton'

function timeAgo(days: number) {
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { restaurants, toggleLike, toggleRecLike } = useRestaurants()

  const restaurant = restaurants.find((r) => r.id === id)

  if (!restaurant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="text-6xl mb-4">🍽️</div>
        <h2 className="text-xl font-bold text-[#2A211E] mb-2">Restaurant not found</h2>
        <p className="text-sm text-[#9B8A82] mb-6">This gem may have been moved or removed.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-[#0D1B2A] text-white rounded-2xl font-semibold text-sm"
        >
          Back to Feed
        </button>
      </div>
    )
  }

  const { name, area, cuisine, image, aiSummary, contributor, likes, liked, daysAgo, communityRecs } = restaurant

  const communityLikeTotal = communityRecs.reduce((sum, r) => sum + r.likes, 0)
  const popularityScore = Math.min(100, Math.round(((likes + communityLikeTotal) / 500) * 100))

  return (
    <div className="min-h-screen bg-[#FFF9F3] pb-32">
      {/* Hero image */}
      <div className="relative h-72">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-14 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
          aria-label="Go back"
        >
          <svg className="w-5 h-5 text-[#2A211E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Like button overlay */}
        <div className="absolute top-14 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-md">
            <LikeButton count={likes} liked={liked} onToggle={() => toggleLike(restaurant.id)} />
          </div>
        </div>

        {/* Bottom overlay: name + area */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {cuisine.map((c) => (
              <span key={c} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                {c}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-black text-white leading-tight">{name}</h1>
          <p className="text-sm text-white/80 mt-0.5 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {area}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pt-5 space-y-5">
        {/* Community Popularity */}
        <div className="bg-white rounded-3xl p-4 border border-[#EDE0D2]/60 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[#2A211E]">Community popularity</span>
            <span className="text-sm font-bold text-[#0D1B2A]">{popularityScore}%</span>
          </div>
          <div className="h-2 bg-[#EDE0D2] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0D1B2A] rounded-full transition-all duration-700"
              style={{ width: `${popularityScore}%` }}
            />
          </div>
          <p className="text-xs text-[#9B8A82] mt-2">
            {likes} likes · {communityRecs.length} community recs · Added {timeAgo(daysAgo)}
          </p>
        </div>

        {/* AI Summary */}
        <div className="bg-white rounded-3xl p-4 border border-[#EDE0D2]/60 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">✨</span>
            <span className="text-sm font-semibold text-[#2A211E]">Why people love it</span>
          </div>
          <p className="text-sm text-[#5C4A42] leading-relaxed">{aiSummary}</p>
        </div>

        {/* Recommended By */}
        <div className="bg-white rounded-3xl p-4 border border-[#EDE0D2]/60 shadow-sm">
          <p className="text-xs text-[#9B8A82] font-medium mb-3 uppercase tracking-wide">First recommended by</p>
          <div className="flex items-center gap-3">
            <Avatar src={contributor.avatar} name={contributor.name} size="lg" />
            <div>
              <p className="text-sm font-bold text-[#2A211E]">{contributor.name}</p>
              <p className="text-xs text-[#9B8A82]">{timeAgo(daysAgo)}</p>
            </div>
          </div>
        </div>

        {/* Cuisine tags */}
        <div>
          <p className="text-xs text-[#9B8A82] font-medium mb-2 uppercase tracking-wide">Cuisine</p>
          <div className="flex flex-wrap gap-2">
            {cuisine.map((c) => (
              <CuisineTag key={c} label={c} />
            ))}
          </div>
        </div>

        {/* Community Recs */}
        {communityRecs.length > 0 && (
          <div>
            <p className="text-sm font-bold text-[#2A211E] mb-3">
              What others are saying ({communityRecs.length})
            </p>
            <div className="space-y-3">
              {communityRecs.map((rec) => (
                <div key={rec.id} className="bg-white rounded-2xl p-4 border border-[#EDE0D2]/60 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Avatar src={rec.author.avatar} name={rec.author.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-[#2A211E]">{rec.author.name}</span>
                        <LikeButton
                          count={rec.likes}
                          liked={rec.liked}
                          onToggle={() => toggleRecLike(restaurant.id, rec.id)}
                        />
                      </div>
                      <p className="text-sm text-[#5C4A42] leading-relaxed">"{rec.text}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {communityRecs.length === 0 && (
          <div className="text-center py-6">
            <p className="text-sm text-[#C2AFA7]">No community recs yet. Be the first!</p>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-5 z-40 pointer-events-none">
        <div className="max-w-lg mx-auto pointer-events-auto">
          <button
            onClick={() => navigate('/add')}
            className="w-full py-4 bg-[#0D1B2A] text-white rounded-2xl font-bold text-sm shadow-xl hover:bg-[#060d15] transition-colors active:scale-[0.98]"
          >
            Add Your Recommendation
          </button>
        </div>
      </div>
    </div>
  )
}
