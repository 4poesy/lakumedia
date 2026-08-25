# Launch & Handoff Guide — Laku Media Platform

Comprehensive operations, content population, domain cutover, and client training guide for **Laku Media Platform** (Executive Leadership: Adebayo Samuel Olaku, CEO).

---

## 1. Content Population & Pre-Launch Audits

- [x] **Sports Coverage**: Seeded articles populated across NPFL, EPL, Transfers, and World Football categories.
- [x] **Production Services**: All 7 service types represented (`music_video_production`, `movie_editing`, `television_programme`, `photography`, `broadcast_production`, `corporate_event_coverage`, `concert_coverage`).
- [x] **Laku Media Company Page**: `/multimedia/about` features logo assets, CEO credit (**Adebayo Samuel Olaku, CEO**), and service summary.
- [x] **Match Center**: Populated fixtures for NPFL, EPL, and Champions League with self-built Realtime score console (`/admin/live-scores`).
- [x] **Image Assets**: Alt text, proper sizing, and domain configuration active across all Next.js `<Image>` tags.

---

## 2. Legal, Compliance & Contact Routes

- [x] **Privacy Policy**: [`/privacy`](file:///c:/Users/USER/OneDrive/Desktop/Lakumedia/app/privacy/page.tsx)
- [x] **Terms of Service**: [`/terms`](file:///c:/Users/USER/OneDrive/Desktop/Lakumedia/app/terms/page.tsx)
- [x] **Contact Desk**: [`/contact`](file:///c:/Users/USER/OneDrive/Desktop/Lakumedia/app/contact/page.tsx) (email: `production@lakumedia.com`)

---

## 3. Client Handoff & Editorial CMS Guide

### CMS Modules Overview (`/admin`)

1. **Publishing an Article**:
   - Navigate to `/admin/articles` → Click **Create Article**.
   - Input title (auto-generates URL slug), excerpt, category, cover image URL, and body markdown text.
   - Set status to `Published` or `Draft` and click **Save**.

2. **Updating Live Scores (Match Center)**:
   - Navigate to `/admin/live-scores`.
   - Locate match fixture card → update Home Score / Away Score inputs or minute label.
   - Set status to `live`, `finished`, `scheduled`, or `postponed`.
   - Click **Save Fixture**. The live score ticker on `/` and `/live-scores` updates **instantly without page reload** via Supabase Realtime!

3. **Managing Media Catalog & Live Streams**:
   - Navigate to `/admin/media` → Click **Add Media Item**.
   - Input title, genre, media type (film, documentary, drama series, concert, music video, etc.), video stream URL (HLS/MP4), thumbnail, and duration.
   - Toggle **Is Live Stream Broadcast** to set live start date and status (`upcoming` / `live_now` / `ended`).

4. **Managing Production Services**:
   - Navigate to `/admin/services` → Add or edit service offerings under any of the 7 service categories.

5. **Moderating Comments**:
   - Navigate to `/admin/comments` → Delete offensive comments.

6. **Managing User Roles**:
   - Navigate to `/admin/users` → Modify user permissions (`reader`, `editor`, `admin`) via the dropdown menu.

---

## 4. Vercel Domain & DNS Cutover Instructions

1. **GitHub Connection**: Repository [`4poesy/lakumedia`](https://github.com/4poesy/lakumedia) on `main` branch.
2. **Vercel Project Setup**:
   - Import `4poesy/lakumedia` on [Vercel](https://vercel.com/new).
   - Add Environment Variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Custom Domain DNS Settings**:
   - In Vercel Project Settings → **Domains**, enter your domain (e.g. `lakumedia.com`).
   - Add DNS records in your domain registrar (GoDaddy, Namecheap, Cloudflare):
     - `A Record` for `@` pointing to `76.76.21.21`
     - `CNAME Record` for `www` pointing to `cname.vercel-dns.com`
4. **SSL & Redirects**:
   - Vercel automatically provisions Let's Encrypt SSL certificates.
   - Legacy `/sports/*` links automatically 301-redirect to root-level paths via `next.config.mjs`.

---

## 5. Deferred / v2 Backlog

Tracked items for future phases:
- **Kids Mode Toggle UI**: Schema flag `is_kid_safe` exists on database.
- **Email Invite Workflow**: Email invitation flow for new editors.
- **Standings Tables**: League table standings integration.
- **Push Notifications**: Browser push notifications for match goal alerts.
