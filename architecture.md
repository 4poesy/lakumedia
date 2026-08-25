# Platform Architecture — Lakumedia (Sports + Multimedia)

Dual-vertical platform: **Sports** (Sports-First focal point at root `/*`) + **Multimedia** (secondary top-level section at `/multimedia/*` under Laku Media branding).

---

## 1. System Overview

```
                          ┌─────────────────────────┐
                          │   Next.js 14 App Router │
                          │     (Vercel Hosting)    │
                          └────────────┬────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                │                                             │
      ┌─────────▼─────────┐                         ┌─────────▼─────────┐
      │   Sports Vertical │                         │Multimedia Vertical│
      │  (Root-Level /*)  │                         │  (/multimedia/*)  │
      │ Completesports    │                         │ Laku Media Brand  │
      │ Emerald Theme     │                         │ Navy/Orange Theme │
      └─────────┬─────────┘                         └─────────┬─────────┘
                │                                             │
                └──────────────────────┬──────────────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │   Supabase Postgres DB  │
                          │  RLS + Realtime Sync    │
                          └─────────────────────────┘
```

---

## 2. Technology Stack

- **Framework**: Next.js 14 (App Router, Server Actions, Dynamic Server Rendering)
- **Database**: Supabase PostgreSQL + Row-Level Security (RLS) + Realtime Postgres Changes
- **Styling**: Tailwind CSS + Custom CSS Theme Tokens (`.theme-sports` Emerald Green `#10b981`, `.theme-multimedia` Navy `#2A2E7F` & Burnt Orange `#D9541E`)
- **UI Components**: Glassmorphic custom component library
- **Branding**: Laku Media (CEO: Adebayo Samuel Olaku)
- **Deployment**: Vercel (Frontend Next.js) + Railway / Supabase Cloud (Database)

---

## 3. Route Map (Sports-First Structure)

### 3.1 Public Sports Vertical (Root-Level `/*`)
- `/` — Main Sports Homepage (Hero article, Live Match Ticker, Editorial Headlines, Category Pills)
- `/[category]` — Category browsing & sub-category filters (NPFL, EPL, World Football, Transfers)
- `/article/[slug]` — Reader article view with related headlines and interactive `comments` thread
- `/live-scores` — Full match center with Supabase Realtime score ticker
- `/leagues/[slug]` — Dedicated league hubs (NPFL, EPL, La Liga)
- `/teams/[slug]` — Dedicated team hubs (Enyimba FC, Kano Pillars, Arsenal FC, Chelsea FC)

### 3.2 Public Multimedia Vertical (`/multimedia/*`)
- `/multimedia` — Multimedia Homepage (Hero Spotlight, Live Stream banner, 7 Genre Rails)
- `/multimedia/[genre]` — Genre listings (Films, Documentaries, Comedy, Talk Shows, Drama Series, Music Shows, Kids Shows)
- `/multimedia/watch/[slug]` — Video player embed, upcoming live countdown, series episode rail, and viewer reaction comments
- `/multimedia/live` — Grouped live broadcasts (Live Now, Upcoming, Ended) with Realtime status updates
- `/multimedia/production` — Laku Media production portfolio with filter tabs across all 7 service types
- `/multimedia/production/[slug]` — Case study detail view with photo gallery and "Book This Service" CTA
- `/multimedia/about` — Company page featuring Laku Media branding and CEO credit (Adebayo Samuel Olaku, CEO)

### 3.3 Admin & CMS (`/admin/*`)
- `/admin` — Admin CMS Dashboard
- `/admin/live-scores` — Match day live scores entry console
- `/admin/articles` — Article inventory manager
- `/admin/articles/new` — Create article form
- `/admin/articles/[id]/edit` — Edit article form

---

## 4. Database Schema (11 Tables)

1. `sports_categories` (id, name, slug, parent_id)
2. `media_genres` (id, name, slug)
3. `profiles` (id, display_name, avatar_url, role)
4. `articles` (id, title, slug, body, excerpt, cover_image_url, category_id, status, published_at)
5. `media_items` (id, title, slug, synopsis, genre_id, media_type, video_url, thumbnail_url, duration_seconds, is_kid_safe, is_live, scheduled_start_at, live_status, is_featured, season_number, episode_number, parent_series_id, status, published_at)
6. `services` (id, title, slug, description, cover_image_url, gallery, service_type, is_featured, status)
7. `leagues` (id, name, country)
8. `teams` (id, name, logo_url, league_id)
9. `fixtures` (id, home_team_id, away_team_id, league_id, kickoff_at, home_score, away_score, status, external_ref_id)
10. `comments` (id, user_id, commentable_type, commentable_id, body)
11. `watch_history` (id, user_id, media_item_id, progress_seconds)
