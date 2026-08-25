# Rules — Sports + Multimedia Platform

Guardrails for this build. These apply to every phase and every session. If a request conflicts with a rule here, say so instead of quietly overriding it.

---

## 1. Build order

- **Schema-first, not frontend-first or backend-first.** The data model must exist (even with seed data) before feature UI is built against it.
- **Vertical slices, not horizontal layers.** Build one complete feature end-to-end (UI + API route + DB query) before starting the next, rather than "all pages" then "all APIs."
- Do not build ahead of the current phase (see `progress.md` for what phase is active). If Phase 2 work naturally requires a Phase 4 piece (e.g., CMS), stop and flag it rather than building it early inline.

## 2. Data & schema

- Every new table ships with RLS policies in the same migration — no table goes live without them.
- No new content type gets a new top-level table unless its shape is genuinely different from `articles` or `media_items`. New genres/categories are taxonomy rows, not new tables.
- Any schema change must update `architecture.md`'s data model summary in the same PR/session — the doc and the actual schema must never drift apart.
- Migrations only, no manual dashboard schema edits — everything must be reproducible from version control.

## 3. Content model specifics

- `media_items.media_type` enum currently covers: `film`, `documentary`, `comedy`, `talk_show`, `drama_series`, `music_show`, `kids_show`, `music_video`, `concert`. Adding a new type requires an explicit migration + update to this file and `architecture.md` — never inferred silently.
- `is_kid_safe` must be set explicitly (not left null/default-assumed) on every `media_items` row from Phase 1 onward.
- Series/episodes use `parent_series_id` — do not create a separate `episodes` table.
- `services` is portfolio content, never given a `watch_history` relation or player component — if a request tries to make a service "playable," flag it, that's catalog content territory (`media_items`), not portfolio.
- `live_status` must be kept in sync with `scheduled_start_at` (e.g., a scheduled job or simple time-check flips `upcoming` → `live_now` → `ended`) — do not leave it static.
- Any new `service_type` follows the same rule as `media_type`: explicit migration + doc update, never inferred silently.

## 4. Frontend conventions

- Server Components by default; only mark `use client` when interactivity (state, event handlers) actually requires it.
- Supabase client: use the server client (`/lib/supabase/server`) in Server Components/route handlers, the browser client (`/lib/supabase/client`) only in Client Components.
- Shared UI (nav, footer, buttons, cards) lives in `/components/ui` via shadcn/ui — don't fork one-off styled versions per vertical unless the design genuinely diverges.
- Sports and Multimedia can differ in accent color/tone but must share the same base design tokens (spacing, type scale, radius) — no parallel design systems.

## 5. Video & media

- No self-hosted raw video files. All playback goes through Cloudflare Stream/Bunny embeds.
- Thumbnails and cover images go through Supabase Storage or the CDN — never inline base64 or unoptimized large images.

## 6. Live sports data

- Fixtures/scores are never manually entered in the UI — they sync from the external sports-data API via a scheduled job, matched by `external_ref_id` to avoid duplicates.

## 7. What NOT to build without explicit sign-off

- Payment/subscription logic
- CMS/admin dashboard beyond a stub route (until Phase 4)
- Kids Mode UI toggle (schema flag exists early, but the feature itself waits until it's scheduled)
- Any new external integration (analytics, push notifications, etc.) not already listed in `architecture.md`

## 8. Session hygiene

- At the start of each session, read `architecture.md`, `rules.md`, and `progress.md` before writing code.
- At the end of each session, update `progress.md` with what was actually completed — not what was attempted.
