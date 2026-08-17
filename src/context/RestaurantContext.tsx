import { createContext, useContext, useState, useCallback } from 'react'
import type { Restaurant, AddRecommendationInput } from '../types'
import { SEED_RESTAURANTS } from '../data/seed'

interface RestaurantContextValue {
  restaurants: Restaurant[]
  toggleLike: (restaurantId: string) => void
  toggleRecLike: (restaurantId: string, recId: string) => void
  addRestaurant: (input: AddRecommendationInput) => string
}

const RestaurantContext = createContext<RestaurantContextValue | null>(null)

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(SEED_RESTAURANTS)

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

  const addRestaurant = useCallback((input: AddRecommendationInput): string => {
    const newId = `new-${Date.now()}`
    const newRestaurant: Restaurant = {
      id: newId,
      name: input.restaurantName,
      area: input.area,
      cuisine: input.cuisine.length > 0 ? input.cuisine : ['Other'],
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format',
      aiSummary: input.recommendationText,
      contributor: {
        id: `user-${Date.now()}`,
        name: input.recommendedBy || 'Anonymous',
        avatar: '',
      },
      likes: 1,
      liked: true,
      daysAgo: 0,
      communityRecs: [],
    }
    setRestaurants((prev) => [newRestaurant, ...prev])
    return newId
  }, [])

  return (
    <RestaurantContext.Provider value={{ restaurants, toggleLike, toggleRecLike, addRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  )
}

export function useRestaurants() {
  const ctx = useContext(RestaurantContext)
  if (!ctx) throw new Error('useRestaurants must be used within RestaurantProvider')
  return ctx
}
