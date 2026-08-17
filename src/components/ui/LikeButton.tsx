import { useState } from 'react'

interface LikeButtonProps {
  count: number
  liked: boolean
  onToggle: () => void
  className?: string
}

export default function LikeButton({ count, liked, onToggle, className = '' }: LikeButtonProps) {
  const [animating, setAnimating] = useState(false)

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    e.preventDefault()
    if (!animating) {
      setAnimating(true)
      setTimeout(() => setAnimating(false), 400)
    }
    onToggle()
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1.5 group transition-all ${className}`}
      aria-label={liked ? 'Unlike' : 'Like'}
    >
      <span
        className={`text-lg transition-transform ${animating ? 'like-pop' : ''}`}
        style={{ display: 'inline-block' }}
      >
        {liked ? '❤️' : '🤍'}
      </span>
      <span
        className={`text-sm font-semibold tabular-nums transition-colors ${
          liked ? 'text-[#B5224A]' : 'text-[#9B8A82]'
        }`}
      >
        {count}
      </span>
    </button>
  )
}
