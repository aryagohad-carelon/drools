import { useState, useRef } from 'react'
import type { AddRecommendationInput } from '../../types'
import { CUISINE_FILTERS, AREAS } from '../../constants'

interface AddRecommendationFormProps {
  onSubmit: (input: AddRecommendationInput) => void
  onCancel?: () => void
  submitting?: boolean
}

const CUISINE_OPTIONS = CUISINE_FILTERS.filter((c) => c !== 'All')

export default function AddRecommendationForm({ onSubmit, onCancel, submitting = false }: AddRecommendationFormProps) {
  const [form, setForm] = useState<AddRecommendationInput>({
    restaurantName: '',
    area: '',
    cuisine: [],
    recommendationText: '',
    recommendedBy: '',
    photo: null,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof AddRecommendationInput, string>>>({})

  // Area: track whether "Other" is selected
  const [areaSelect, setAreaSelect] = useState('')
  const [customArea, setCustomArea] = useState('')

  // Cuisine: custom tag input
  const [cuisineInput, setCuisineInput] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  function set<K extends keyof AddRecommendationInput>(key: K, value: AddRecommendationInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function handleAreaSelect(val: string) {
    setAreaSelect(val)
    if (val !== '__other__') {
      setCustomArea('')
      set('area', val)
    } else {
      set('area', '')
    }
  }

  function handleCustomArea(val: string) {
    setCustomArea(val)
    set('area', val.trim())
  }

  function toggleCuisine(tag: string) {
    set(
      'cuisine',
      form.cuisine.includes(tag) ? form.cuisine.filter((c) => c !== tag) : [...form.cuisine, tag]
    )
  }

  function addCustomCuisine() {
    const tag = cuisineInput.trim()
    if (!tag || form.cuisine.includes(tag)) {
      setCuisineInput('')
      return
    }
    set('cuisine', [...form.cuisine, tag])
    setCuisineInput('')
  }

  function handleCuisineInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCustomCuisine()
    }
  }

  function validate(): boolean {
    const newErrors: typeof errors = {}
    if (!form.restaurantName.trim()) newErrors.restaurantName = 'Restaurant name is required'
    if (!form.area.trim()) newErrors.area = 'Please select or enter an area'
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
          value={areaSelect}
          onChange={(e) => handleAreaSelect(e.target.value)}
          className={inputClass(!!errors.area && areaSelect !== '__other__')}
        >
          <option value="">Select an area...</option>
          {AREAS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
          <option value="__other__">Other (type below)</option>
        </select>
        {areaSelect === '__other__' && (
          <input
            type="text"
            value={customArea}
            onChange={(e) => handleCustomArea(e.target.value)}
            placeholder="Type your area..."
            autoFocus
            className={`${inputClass(!!errors.area && !customArea.trim())} mt-2`}
          />
        )}
      </Field>

      {/* Cuisine */}
      <Field label="Cuisine" hint="Select all that apply, or add your own">
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
                    ? 'bg-[#0D1B2A] text-white border-[#0D1B2A]'
                    : 'bg-white text-[#2A211E] border-[#EDE0D2] hover:border-[#0D1B2A] hover:text-[#0D1B2A]'
                }`}
              >
                {tag}
              </button>
            )
          })}
          {/* Custom cuisine tags added by the user */}
          {form.cuisine
            .filter((c) => !(CUISINE_OPTIONS as readonly string[]).includes(c))
            .map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleCuisine(tag)}
                className="px-3 py-1.5 rounded-full text-sm font-medium transition-all border bg-[#0D1B2A] text-white border-[#0D1B2A] flex items-center gap-1.5"
              >
                {tag}
                <svg className="w-3 h-3 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ))}
        </div>

        {/* Custom cuisine input */}
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={cuisineInput}
            onChange={(e) => setCuisineInput(e.target.value)}
            onKeyDown={handleCuisineInputKey}
            placeholder="Add a cuisine..."
            className="flex-1 px-3 py-2 bg-white rounded-xl border border-[#EDE0D2] text-sm text-[#2A211E] placeholder:text-[#C2AFA7] focus:outline-none focus:border-[#0D1B2A] focus:ring-2 focus:ring-[rgba(13,27,42,0.15)] transition-all"
          />
          <button
            type="button"
            onClick={addCustomCuisine}
            disabled={!cuisineInput.trim()}
            className="px-3 py-2 rounded-xl border border-[#EDE0D2] text-sm font-medium text-[#0D1B2A] bg-white hover:bg-[rgba(13,27,42,0.06)] hover:border-[#0D1B2A] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add
          </button>
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
          <div className="flex items-center gap-3 p-3 bg-[rgba(13,27,42,0.06)] rounded-2xl border border-[#0D1B2A]/20">
            <span className="text-sm text-[#2A211E] font-medium truncate flex-1">{form.photo.name}</span>
            <button
              type="button"
              onClick={() => set('photo', null)}
              className="text-[#9B8A82] hover:text-[#0D1B2A] transition-colors flex-shrink-0"
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
            className="w-full py-3 border-2 border-dashed border-[#EDE0D2] rounded-2xl text-sm text-[#9B8A82] hover:border-[#0D1B2A] hover:text-[#0D1B2A] transition-colors flex items-center justify-center gap-2"
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
          disabled={submitting}
          className="w-full py-3.5 bg-[#0D1B2A] text-white rounded-2xl font-semibold text-sm hover:bg-[#060d15] transition-colors shadow-sm active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving...' : 'Share Recommendation'}
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
      : 'border-[#EDE0D2] focus:border-[#0D1B2A] focus:ring-2 focus:ring-[rgba(13,27,42,0.15)]'
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
          {required && <span className="text-[#0D1B2A] ml-0.5">*</span>}
        </label>
        {hint && <span className="text-xs text-[#9B8A82]">{hint}</span>}
      </div>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}
