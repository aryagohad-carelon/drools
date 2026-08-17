interface NoResultsProps {
  query?: string
}

export default function NoResults({ query }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="text-7xl mb-6">🔍</div>
      <h3 className="text-xl font-bold text-[#2A211E] mb-2">No matches found</h3>
      <p className="text-sm text-[#9B8A82] leading-relaxed max-w-xs">
        {query
          ? `We couldn't find any results for "${query}". Try another cuisine, restaurant, or location.`
          : 'Try another cuisine, restaurant, or location.'}
      </p>
    </div>
  )
}
