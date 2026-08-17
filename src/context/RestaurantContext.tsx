import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { Restaurant, AddRecommendationInput } from '../types'
import type { DbRecommendation } from '../types/database'
import { supabase } from '../lib/supabase'

// Fallback image used when a restaurant has no uploaded photo
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format'

function daysAgoFromDate(dateStr: string): number {
  const ms = Date.now() - new Date(dateStr).getTime()
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}

function dbRowToRestaurant(row: DbRecommendation): Restaurant {
  return {
    id: row.id,
    name: row.restaurant_name,
    area: row.area,
    cuisine: row.cuisine.length > 0 ? row.cuisine : ['Other'],
    image: row.photo_url ?? FALLBACK_IMAGE,
    aiSummary: row.recommendation,
    contributor: {
      id: `user-${row.recommended_by}`,
      name: row.recommended_by,
      avatar: '',
    },
    likes: 0,
    liked: false,
    daysAgo: daysAgoFromDate(row.created_at),
    communityRecs: [],
  }
}

interface RestaurantContextValue {
  restaurants: Restaurant[]
  loading: boolean
  error: string | null
  toggleLike: (restaurantId: string) => void
  toggleRecLike: (restaurantId: string, recId: string) => void
  addRestaurant: (input: AddRecommendationInput) => Promise<string>
}

const RestaurantContext = createContext<RestaurantContextValue | null>(null)

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    supabase
      .from('recommendations')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (cancelled) return
        if (err) {
          setError(err.message)
        } else {
          setRestaurants((data ?? []).map(dbRowToRestaurant))
        }
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const toggleLike = useCallback((restaurantId: string) => {
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurantId
          ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 }
          : r
      )
    )
  }, [])

  const toggleRecLike = useCallback((restaurantId: string, recId: string) => {
    setRestaurants((prev) =>
      prev.map((r) => {
        if (r.id !== restaurantId) return r
        return {
          ...r,
          communityRecs: r.communityRecs.map((rec) =>
            rec.id === recId
              ? { ...rec, liked: !rec.liked, likes: rec.liked ? rec.likes - 1 : rec.likes + 1 }
              : rec
          ),
        }
      })
    )
  }, [])

  const addRestaurant = useCallback(async (input: AddRecommendationInput): Promise<string> => {
    // Upload photo to Storage if provided
    let photoUrl: string | null = null
    if (input.photo) {
      const ext = input.photo.name.split('.').pop() ?? 'jpg'
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: uploadErr } = await supabase.storage
        .from('restaurant-photos')
        .upload(path, input.photo, { contentType: input.photo.type, upsert: false })
      if (uploadErr) throw new Error(`Photo upload failed: ${uploadErr.message}`)
      const { data: urlData } = supabase.storage.from('restaurant-photos').getPublicUrl(path)
      photoUrl = urlData.publicUrl
    }

    const { data, error: err } = await supabase
      .from('recommendations')
      .insert({
        restaurant_name: input.restaurantName,
        area: input.area,
        cuisine: input.cuisine,
        recommendation: input.recommendationText,
        recommended_by: input.recommendedBy,
        photo_url: photoUrl,
      })
      .select()
      .single()

    if (err || !data) throw new Error(err?.message ?? 'Failed to save recommendation')

    const newRestaurant = dbRowToRestaurant(data as DbRecommendation)
    setRestaurants((prev) => [newRestaurant, ...prev])
    return newRestaurant.id
  }, [])

  return (
    <RestaurantContext.Provider value={{ restaurants, loading, error, toggleLike, toggleRecLike, addRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  )
}

export function useRestaurants() {
  const ctx = useContext(RestaurantContext)
  if (!ctx) throw new Error('useRestaurants must be used within RestaurantProvider')
  return ctx
}
