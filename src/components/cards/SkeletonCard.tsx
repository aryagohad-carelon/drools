interface SkeletonCardProps {
  variant?: 'vertical' | 'horizontal'
}

function SkeletonBox({ className }: { className: string }) {
  return <div className={`skeleton rounded-2xl ${className}`} />
}

export default function SkeletonCard({ variant = 'vertical' }: SkeletonCardProps) {
  if (variant === 'horizontal') {
    return (
      <div className="flex-shrink-0 w-52 bg-white rounded-3xl overflow-hidden border border-[#EDE0D2]/60 shadow-sm">
        <SkeletonBox className="h-32 rounded-none" />
        <div className="p-3 space-y-2">
          <SkeletonBox className="h-4 w-3/4" />
          <SkeletonBox className="h-3 w-1/2" />
          <SkeletonBox className="h-3 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-[#EDE0D2]/60 shadow-sm">
      <SkeletonBox className="h-52 rounded-none" />
      <div className="px-4 pt-3.5 pb-4 space-y-3">
        <SkeletonBox className="h-5 w-2/3" />
        <SkeletonBox className="h-3.5 w-1/3" />
        <SkeletonBox className="h-3 w-full" />
        <SkeletonBox className="h-3 w-4/5" />
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <div className="skeleton w-7 h-7 rounded-full" />
            <SkeletonBox className="h-3 w-20" />
          </div>
          <SkeletonBox className="h-3 w-10" />
        </div>
      </div>
    </div>
  )
}
