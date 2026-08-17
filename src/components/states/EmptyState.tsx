import { useNavigate } from 'react-router-dom'

interface EmptyStateProps {
  headline?: string
  subheading?: string
  ctaLabel?: string
  ctaPath?: string
}

export default function EmptyState({
  headline = 'No food gems discovered yet.',
  subheading = 'Be the first to recommend a place worth drooling over.',
  ctaLabel = 'Add Recommendation',
  ctaPath = '/add',
}: EmptyStateProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="text-7xl mb-6">🍽️</div>
      <h3 className="text-xl font-bold text-[#2A211E] mb-2">{headline}</h3>
      <p className="text-sm text-[#9B8A82] leading-relaxed max-w-xs mb-8">{subheading}</p>
      <button
        onClick={() => navigate(ctaPath)}
        className="px-6 py-3 bg-[#B5224A] text-white rounded-2xl font-semibold text-sm hover:bg-[#9B1C3D] transition-colors shadow-sm"
      >
        {ctaLabel}
      </button>
    </div>
  )
}
