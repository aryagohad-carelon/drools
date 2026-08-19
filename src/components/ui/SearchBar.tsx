import { useRef } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onFocus?: () => void
  autoFocus?: boolean
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search restaurants, cuisines, or locations...',
  onFocus,
  autoFocus = false,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-[#9B8A82]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 bg-white rounded-2xl border border-[#EDE0D2] text-sm text-[#2A211E] placeholder:text-[#9B8A82] focus:outline-none focus:border-[#0D1B2A] focus:ring-2 focus:ring-[rgba(13,27,42,0.15)] transition-all"
      />
      {value && (
        <button
          onClick={() => {
            onChange('')
            inputRef.current?.focus()
          }}
          className="absolute inset-y-0 right-3.5 flex items-center text-[#9B8A82] hover:text-[#2A211E] transition-colors"
          aria-label="Clear search"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
