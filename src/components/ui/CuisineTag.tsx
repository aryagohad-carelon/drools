interface CuisineTagProps {
  label: string
  className?: string
}

export default function CuisineTag({ label, className = '' }: CuisineTagProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[rgba(181,34,74,0.09)] text-[#B5224A] ${className}`}
    >
      {label}
    </span>
  )
}
