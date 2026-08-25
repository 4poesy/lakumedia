# Master Prompt — Frontend Architecture & Layout Guide

Platform: **Laku Media Platform** (Dual Vertical: Sports-First Root + Multimedia)

---

## 1. Layout & Root Structure

The platform follows a **Sports-First** focal point structure matching professional sports media portals like completesports.com:

- **Site Root (`/`)**: Main Sports Homepage rendering live score tickers, featured editorial headlines, category pill rails, and match coverage.
- **Root Sports Sub-Routes (`/*`)**: `/[category]`, `/article/[slug]`, `/live-scores`, `/leagues/[slug]`, `/teams/[slug]`.
- **Multimedia Vertical (`/multimedia/*`)**: On-demand video catalog, live streaming, production services, and company about page under official **Laku Media** branding (CEO: Adebayo Samuel Olaku).

---

## 2. Navigation Weighting

- **Header Bar**: `Home | NPFL | World Football | Transfers | Live Scores | Laku Media Watch | Sign In`.
- **Sports Category Links**: Primary top-level billing.
- **Multimedia Link**: Leads to `/multimedia`, which hosts its own scoped sub-navigation (`Watch | Live | Production Services | About`).

---

## 3. Theme & Aesthetics

- **Sports Vertical**: Emerald Green (`#10b981`).
- **Multimedia Vertical**: Deep Navy (`#2A2E7F`), Burnt Orange (`#D9541E`), and Warm Charcoal (`#2B2B33`).
- **Glassmorphism**: Backdrop blur glass panels, subtle border highlights, responsive design across mobile/desktop.
