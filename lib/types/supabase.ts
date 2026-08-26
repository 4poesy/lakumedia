export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ArticleStatus = 'draft' | 'published' | 'archived';
export type MediaType = 
  | 'film' 
  | 'documentary' 
  | 'comedy' 
  | 'talk_show' 
  | 'drama_series' 
  | 'music_show' 
  | 'kids_show'
  | 'music_video'
  | 'concert';
export type MediaStatus = 'draft' | 'published' | 'archived';
export type FixtureStatus = 'scheduled' | 'live' | 'finished' | 'postponed';
export type UserRole = 'reader' | 'editor' | 'admin';
export type CommentableType = 'article' | 'media_item';
export type LiveStatus = 'upcoming' | 'live_now' | 'ended';
export type ServiceType = 
  | 'broadcast_production' 
  | 'corporate_event_coverage' 
  | 'concert_coverage' 
  | 'music_video_production'
  | 'movie_editing'
  | 'television_programme'
  | 'photography';

export interface Database {
  public: {
    Tables: {
      sports_categories: {
        Row: {
          id: string
          name: string
          slug: string
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      media_genres: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          display_name: string | null
          avatar_url: string | null
          role: UserRole
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          avatar_url?: string | null
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          avatar_url?: string | null
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          body: string
          excerpt: string | null
          cover_image_url: string | null
          category_id: string | null
          author_id: string | null
          author_name?: string | null
          is_ai_generated?: boolean
          ai_reviewed?: boolean
          ai_source_data?: Json
          status: ArticleStatus
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          body: string
          excerpt?: string | null
          cover_image_url?: string | null
          category_id?: string | null
          author_id?: string | null
          author_name?: string | null
          is_ai_generated?: boolean
          ai_reviewed?: boolean
          ai_source_data?: Json
          status?: ArticleStatus
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          body?: string
          excerpt?: string | null
          cover_image_url?: string | null
          category_id?: string | null
          author_id?: string | null
          author_name?: string | null
          is_ai_generated?: boolean
          ai_reviewed?: boolean
          ai_source_data?: Json
          status?: ArticleStatus
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      media_items: {
        Row: {
          id: string
          title: string
          slug: string
          synopsis: string | null
          genre_id: string | null
          media_type: MediaType
          video_url: string | null
          thumbnail_url: string | null
          duration_seconds: number | null
          is_kid_safe: boolean
          is_live: boolean
          scheduled_start_at: string | null
          live_status: LiveStatus | null
          is_featured: boolean
          season_number: number | null
          episode_number: number | null
          parent_series_id: string | null
          status: MediaStatus
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          synopsis?: string | null
          genre_id?: string | null
          media_type: MediaType
          video_url?: string | null
          thumbnail_url?: string | null
          duration_seconds?: number | null
          is_kid_safe?: boolean
          is_live?: boolean
          scheduled_start_at?: string | null
          live_status?: LiveStatus | null
          is_featured?: boolean
          season_number?: number | null
          episode_number?: number | null
          parent_series_id?: string | null
          status?: MediaStatus
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          synopsis?: string | null
          genre_id?: string | null
          media_type?: MediaType
          video_url?: string | null
          thumbnail_url?: string | null
          duration_seconds?: number | null
          is_kid_safe?: boolean
          is_live?: boolean
          scheduled_start_at?: string | null
          live_status?: LiveStatus | null
          is_featured?: boolean
          season_number?: number | null
          episode_number?: number | null
          parent_series_id?: string | null
          status?: MediaStatus
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          cover_image_url: string | null
          gallery: Json
          service_type: ServiceType
          is_featured: boolean
          status: ArticleStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          cover_image_url?: string | null
          gallery?: Json
          service_type: ServiceType
          is_featured?: boolean
          status?: ArticleStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          cover_image_url?: string | null
          gallery?: Json
          service_type?: ServiceType
          is_featured?: boolean
          status?: ArticleStatus
          created_at?: string
          updated_at?: string
        }
      }
      leagues: {
        Row: {
          id: string
          name: string
          country: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          country?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          country?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          league_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          league_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          league_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      fixtures: {
        Row: {
          id: string
          home_team_id: string
          away_team_id: string
          league_id: string
          kickoff_at: string
          home_score: number | null
          away_score: number | null
          status: FixtureStatus
          external_ref_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          home_team_id: string
          away_team_id: string
          league_id: string
          kickoff_at: string
          home_score?: number | null
          away_score?: number | null
          status?: FixtureStatus
          external_ref_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          home_team_id?: string
          away_team_id?: string
          league_id?: string
          kickoff_at?: string
          home_score?: number | null
          away_score?: number | null
          status?: FixtureStatus
          external_ref_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          user_id: string
          commentable_type: CommentableType
          commentable_id: string
          body: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          commentable_type: CommentableType
          commentable_id: string
          body: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          commentable_type?: CommentableType
          commentable_id?: string
          body?: string
          created_at?: string
          updated_at?: string
        }
      }
      watch_history: {
        Row: {
          id: string
          user_id: string
          media_item_id: string
          progress_seconds: number
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          media_item_id: string
          progress_seconds?: number
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          media_item_id?: string
          progress_seconds?: number
          updated_at?: string
        }
      }
    }
  }
}
