import { useState, useRef } from 'react'
import type { AddRecommendationInput } from '../../types'
import { CUISINE_FILTERS, AREAS } from '../../constants'

interface AddRecommendationFormProps {
  onSubmit: (input: AddRecommendationInput) => void
  onCancel?: () => void
}

const CUISINE_OPTIONS = CUISINE_FILTERS.filter((c) => c !== 'All')

export default function AddRecommendationForm({ onSubmit, onCancel }: AddRecommendationFormProps) {
  const [form, setForm] = useState<AddRecommendationInput>({
    restaurantName: '',
    area: '',
    cuisine: [],
    recommendationText: '',
    recommendedBy: '',
    photo: null,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof AddRecommendationInput, string>>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  function set<K extends keyof AddRecommendationInput>(key: K, value: AddRecommendationInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function toggleCuisine(tag: string) {
    set(
      'cuisine',
      form.cuisine.includes(tag) ? form.cuisine.filter((c) => c !== tag) : [...form.cuisine, tag]
    )
  }

  function validate(): boolean {
    const newErrors: typeof errors = {}
    if (!form.restaurantName.trim()) newErrors.restaurantName = 'Restaurant name is required'
    if (!form.area) newErrors.area = 'Please select an area'
    if (!form.recommendationText.trim()) newErrors.recommendationText = 'Tell us why people should try it'
    if (!form.recommendedBy.trim()) newErrors.recommendedBy = 'Please add your name'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Restaurant Name */}
      <Field label="Restaurant Name" error={errors.restaurantName} required>
        <input
          type="text"
          value={form.restaurantName}
          onChange={(e) => set('restaurantName', e.target.value)}
          placeholder="e.g. Meghana Foods"
          className={inputClass(!!errors.restaurantName)}
        />
      </Field>

      {/* Area */}
      <Field label="Area" error={errors.area} required>
        <select
          value={form.area}
          onChange={(e) => set('area', e.target.value)}
          className={inputClass(!!errors.area)}
        >
          <option value="">Select an area...</option>
          {AREAS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </Field>

      {/* Cuisine */}
      <Field label="Cuisine" hint="Select all that apply">
        <div className="flex flex-wrap gap-2 mt-1">
          {CUISINE_OPTIONS.map((tag) => {
            const selected = form.cuisine.includes(tag)
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleCuisine(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  selected
                    ? 'bg-[#B5224A] text-white border-[#B5224A]'
                    : 'bg-white text-[#2A211E] border-[#EDE0D2] hover:border-[#B5224A] hover:text-[#B5224A]'
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </Field>

      {/* Why try it */}
      <Field label="Why should people try it?" error={errors.recommendationText} required>
        <textarea
          value={form.recommendationText}
          onChange={(e) => set('recommendationText', e.target.value)}
          placeholder="Share what makes this place special — the must-order dish, best time to go, anything that helps your team..."
          rows={4}
          className={`${inputClass(!!errors.recommendationText)} resize-none`}
        />
      </Field>

      {/* Recommended By */}
      <Field label="Recommended by" error={errors.recommendedBy} required>
        <input
          type="text"
          value={form.recommendedBy}
          onChange={(e) => set('recommendedBy', e.target.value)}
          placeholder="Your name"
          className={inputClass(!!errors.recommendedBy)}
        />
      </Field>

      {/* Photo */}
      <Field label="Add a photo" hint="Optional">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => set('photo', e.target.files?.[0] ?? null)}
          className="hidden"
        />
        {form.photo ? (
          <div className="flex items-center gap-3 p-3 bg-[rgba(181,34,74,0.06)] rounded-2xl border border-[#B5224A]/20">
            <span className="text-sm text-[#2A211E] font-medium truncate flex-1">{form.photo.name}</span>
            <button
              type="button"
              onClick={() => set('photo', null)}
              className="text-[#9B8A82] hover:text-[#B5224A] transition-colors flex-shrink-0"
              aria-label="Remove photo"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 border-2 border-dashed border-[#EDE0D2] rounded-2xl text-sm text-[#9B8A82] hover:border-[#B5224A] hover:text-[#B5224A] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Upload a photo
          </button>
        )}
      </Field>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          type="submit"
          className="w-full py-3.5 bg-[#B5224A] text-white rounded-2xl font-semibold text-sm hover:bg-[#9B1C3D] transition-colors shadow-sm active:scale-[0.98]"
        >
          Share Recommendation
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 text-sm text-[#9B8A82] font-medium hover:text-[#2A211E] transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 bg-white rounded-2xl border text-sm text-[#2A211E] placeholder:text-[#C2AFA7] focus:outline-none transition-all ${
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
      : 'border-[#EDE0D2] focus:border-[#B5224A] focus:ring-2 focus:ring-[rgba(181,34,74,0.15)]'
  }`
}

interface FieldProps {
  label: string
  hint?: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

function Field({ label, hint, error, required, children }: FieldProps) {
  return (
    <div>
      <div className="flex items-baseline gap-1 mb-1.5">
        <label className="text-sm font-semibold text-[#2A211E]">
          {label}
          {required && <span className="text-[#B5224A] ml-0.5">*</span>}
        </label>
        {hint && <span className="text-xs text-[#9B8A82]">{hint}</span>}
      </div>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}
