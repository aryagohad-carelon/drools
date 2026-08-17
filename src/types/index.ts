export interface User {
  id: string
  name: string
  avatar: string
}

export interface Recommendation {
  id: string
  author: User
  text: string
  likes: number
  liked: boolean
}

export interface Restaurant {
  id: string
  name: string
  area: string
  cuisine: string[]
  image: string
  aiSummary: string
  contributor: User
  likes: number
  liked: boolean
  daysAgo: number
  communityRecs: Recommendation[]
}

export interface AddRecommendationInput {
  restaurantName: string
  area: string
  cuisine: string[]
  recommendationText: string
  recommendedBy: string
  photo: File | null
}

export interface FeedFilters {
  cuisine: string
  area: string
  searchQuery: string
}

export type NavTab = 'home' | 'explore' | 'add' | 'favorites' | 'profile'
