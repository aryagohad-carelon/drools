import { useNavigate } from 'react-router-dom'

export default function SuccessState() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-5xl">🎉</span>
      </div>
      <h2 className="text-2xl font-bold text-[#2A211E] mb-2">Recommendation Shared!</h2>
      <p className="text-sm text-[#9B8A82] leading-relaxed max-w-xs mb-8">
        Thanks for helping everyone discover great food. Your gem is now live.
      </p>
      <button
        onClick={() => navigate('/')}
        className="w-full max-w-xs px-6 py-3.5 bg-[#0D1B2A] text-white rounded-2xl font-semibold text-sm hover:bg-[#060d15] transition-colors shadow-sm"
      >
        View Feed
      </button>
      <button
        onClick={() => navigate('/add')}
        className="mt-3 text-sm text-[#0D1B2A] font-medium"
      >
        Add another
      </button>
    </div>
  )
}
