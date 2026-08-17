import { useNavigate } from 'react-router-dom'
import type { Restaurant } from '../../types'
import Avatar from '../ui/Avatar'
import CuisineTag from '../ui/CuisineTag'
import LikeButton from '../ui/LikeButton'

interface RestaurantCardProps {
  restaurant: Restaurant
  variant?: 'vertical' | 'horizontal'
  onLike: (id: string) => void
}

function timeAgo(days: number) {
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}

export default function RestaurantCard({
  restaurant,
  variant = 'vertical',
  onLike,
}: RestaurantCardProps) {
  const navigate = useNavigate()
  const { id, name, area, cuisine, image, contributor, likes, liked, daysAgo, aiSummary } = restaurant

  function handleClick() {
    navigate(`/restaurant/${id}`)
  }

  if (variant === 'horizontal') {
    return (
      <button
        onClick={handleClick}
        className="flex-shrink-0 w-52 bg-white rounded-3xl overflow-hidden border border-[#EDE0D2]/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left"
      >
        <div className="h-32 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="p-3">
          <p className="font-bold text-sm text-[#2A211E] leading-tight line-clamp-1">{name}</p>
          <p className="text-xs text-[#9B8A82] mt-0.5 mb-2">{area}</p>
          <div className="flex flex-wrap gap-1">
            {cuisine.slice(0, 2).map((c) => (
              <CuisineTag key={c} label={c} />
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <Avatar src={contributor.avatar} name={contributor.name} size="sm" />
              <span className="text-xs text-[#9B8A82] truncate max-w-[80px]">{contributor.name.split(' ')[0]}</span>
            </div>
            <LikeButton count={likes} liked={liked} onToggle={() => onLike(id)} />
          </div>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-white rounded-3xl overflow-hidden border border-[#EDE0D2]/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left"
    >
      {/* Image */}
      <div className="h-52 overflow-hidden relative">
        <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Body */}
      <div className="px-4 pt-3.5 pb-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {cuisine.map((c) => (
            <CuisineTag key={c} label={c} />
          ))}
        </div>

        {/* Name + area */}
        <h3 className="text-lg font-bold text-[#2A211E] leading-tight">{name}</h3>
        <p className="text-sm text-[#9B8A82] mt-0.5 mb-2.5">{area}</p>

        {/* AI summary */}
        <p className="text-sm text-[#5C4A42] leading-relaxed line-clamp-2 mb-3">{aiSummary}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar src={contributor.avatar} name={contributor.name} size="sm" />
            <div>
              <span className="text-xs text-[#9B8A82]">Recommended by </span>
              <span className="text-xs font-semibold text-[#2A211E]">{contributor.name.split(' ')[0]}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#C2AFA7]">{timeAgo(daysAgo)}</span>
            <LikeButton count={likes} liked={liked} onToggle={() => onLike(id)} />
          </div>
        </div>
      </div>
    </button>
  )
}
