# Active Context

## Current State
Local development environment fully configured and running. Core app functional through Telegram WebApp via ngrok tunnel.

## Recent Changes (2026-03-01/02)
- Migrated repo to https://github.com/real-ner9/real_virt.git
- Configured full local dev environment (PostgreSQL :5436, MinIO :9000, backend :3000, frontend :4200, ngrok)
- Added CORS support to backend (`app.enableCors()` in main.ts)
- Made DB port configurable via `DB_PORT` env var
- Added image proxy endpoint `GET /api/file-store/image/:hash` (bypasses auth)
- Routed socket.io through `/api/socket.io` path for ngrok compatibility
- Added empty state UI (icons + text) for feed, likes, matches, requests pages
- Added loading spinner animation on all list pages
- Created seed.sql with 10 test profiles + uploaded avatars to MinIO
- Created README.md with full local dev setup instructions

## Next Steps
- **Fix likes/matching**: Socket.io routing through ngrok needs verification — likes may not be working yet
- **AI profiles feature**: User wants to add AI characters to the platform that users can match and chat with
- **Monetization**: Planning Telegram Stars integration for premium content (photo unlocks, premium chat)
- **Freemium funnel**: AI sends free teaser content → paid photo unlocks via Stars

## Active Decisions
- ngrok static domain: `changeless-unfeasible-arya.ngrok-free.dev`
- MinIO for local S3 (minioadmin/minioadmin)
- Images served through backend proxy (`/api/file-store/image/:hash`) not direct S3 URL
- Socket.io path changed to `/api/socket.io` to work through Angular proxy + ngrok
- `environment.ts` socketUrl set to `''` (relative, uses current host)

## Important Patterns & Preferences
- Commit messages: conventional commits, no AI attribution, historically in Russian
- Code language: English
- User prefers step-by-step guided setup with confirmation at each step
- User wants visual polish (empty states, loaders) matching existing dark theme
