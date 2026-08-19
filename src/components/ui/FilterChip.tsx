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
            ? 'bg-[#0D1B2A] text-white shadow-sm'
            : 'bg-white text-[#2A211E] border border-[#EDE0D2] hover:border-[#0D1B2A] hover:text-[#0D1B2A]'
        }
      `}
    >
      {label}
    </button>
  )
}
