interface AvatarProps {
  src: string
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
}

export default function Avatar({ src, name, size = 'md', className = '' }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className={`${sizeMap[size]} rounded-full overflow-hidden flex-shrink-0 bg-[#EDE0D2] flex items-center justify-center font-semibold text-[#B5224A] ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}
