import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRestaurants } from '../context/RestaurantContext'
import type { AddRecommendationInput } from '../types'
import AddRecommendationForm from '../components/forms/AddRecommendationForm'
import SuccessState from '../components/states/SuccessState'

export default function AddRecommendation() {
  const navigate = useNavigate()
  const { addRestaurant } = useRestaurants()
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(input: AddRecommendationInput) {
    addRestaurant(input)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FFF9F3] flex flex-col items-center justify-center">
        <SuccessState />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF9F3]">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-[#9B8A82] hover:text-[#2A211E] transition-colors mb-5"
          aria-label="Go back"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-black text-[#2A211E]">Share a Food Gem 💎</h1>
          <p className="text-sm text-[#9B8A82] mt-1">
            Help others discover their next favorite meal.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="px-5 pb-8">
        <AddRecommendationForm
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
        />
      </div>
    </div>
  )
}
