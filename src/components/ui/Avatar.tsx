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

// Deterministic color palette — same first letter always maps to the same color
const LETTER_COLORS: Record<string, { bg: string; text: string }> = {
  A: { bg: '#FDECEA', text: '#C0392B' },
  B: { bg: '#FEF3E2', text: '#D35400' },
  C: { bg: '#FEF9E7', text: '#B7950B' },
  D: { bg: '#E9F7EF', text: '#1E8449' },
  E: { bg: '#E8F8F5', text: '#148F77' },
  F: { bg: '#E8F4FD', text: '#1A5276' },
  G: { bg: '#EBF5FB', text: '#1F618D' },
  H: { bg: '#F4ECF7', text: '#7D3C98' },
  I: { bg: '#FDEDEC', text: '#922B21' },
  J: { bg: '#FEF5E7', text: '#CA6F1E' },
  K: { bg: '#EAFAF1', text: '#196F3D' },
  L: { bg: '#E8F6F3', text: '#0E6655' },
  M: { bg: '#EBF5FB', text: '#154360' },
  N: { bg: '#F5EEF8', text: '#6C3483' },
  O: { bg: '#FDEDEC', text: '#A93226' },
  P: { bg: '#EAF2FF', text: '#1A56DB' },
  Q: { bg: '#FFF3E0', text: '#E65100' },
  R: { bg: '#FCE4EC', text: '#AD1457' },
  S: { bg: '#E8F5E9', text: '#2E7D32' },
  T: { bg: '#E3F2FD', text: '#1565C0' },
  U: { bg: '#EDE7F6', text: '#4527A0' },
  V: { bg: '#FFF8E1', text: '#F57F17' },
  W: { bg: '#E0F7FA', text: '#00695C' },
  X: { bg: '#F3E5F5', text: '#6A1B9A' },
  Y: { bg: '#FFFDE7', text: '#827717' },
  Z: { bg: '#E8EAF6', text: '#283593' },
}

const DEFAULT_COLOR = { bg: '#EDE0D2', text: '#0D1B2A' }

function getLetterColor(name: string) {
  const letter = name.trim().charAt(0).toUpperCase()
  return LETTER_COLORS[letter] ?? DEFAULT_COLOR
}

export default function Avatar({ src, name, size = 'md', className = '' }: AvatarProps) {
  const letter = name.trim().charAt(0).toUpperCase()
  const { bg, text } = getLetterColor(name)

  return (
    <div
      className={`${sizeMap[size]} rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center font-semibold ${className}`}
      style={src ? undefined : { backgroundColor: bg, color: text }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const el = e.currentTarget
            el.style.display = 'none'
            const parent = el.parentElement
            if (parent) {
              parent.style.backgroundColor = bg
              parent.style.color = text
              parent.textContent = letter
            }
          }}
        />
      ) : (
        <span>{letter}</span>
      )}
    </div>
  )
}
