interface FilterChipProps {
  label: string
  active: boolean
  onClick: () => void
}

export default function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150
        ${
          active
            ? 'bg-[#B5224A] text-white shadow-sm'
            : 'bg-white text-[#2A211E] border border-[#EDE0D2] hover:border-[#B5224A] hover:text-[#B5224A]'
        }
      `}
    >
      {label}
    </button>
  )
}
