export interface Database {
  public: {
    Tables: {
      recommendations: {
        Row: {
          id: string
          restaurant_name: string
          area: string
          cuisine: string[]
          recommendation: string
          recommended_by: string
          photo_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          restaurant_name: string
          area: string
          cuisine?: string[]
          recommendation: string
          recommended_by: string
          photo_url?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['recommendations']['Insert']>
      }
    }
  }
}

export type DbRecommendation = Database['public']['Tables']['recommendations']['Row']
