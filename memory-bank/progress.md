# Progress

## What Works
- Full dating platform: profiles, feed, likes, matches, chat
- Telegram WebApp integration (frontend)
- Telegram bot (backend) — polling mode
- Real-time WebSocket communication
- File storage with MinIO (local) / AWS S3 (prod)
- Image proxy through backend (`/api/file-store/image/:hash`)
- Multi-language support (i18n)
- Docker deployment (production + local dev)
- Database with 25 migrations applied
- Local dev environment fully configured
- Empty state UI on all list pages (feed, likes, matches, requests)
- Loading spinners on all list pages
- 10 test user profiles seeded with avatars
- README with full setup instructions

## What's Left to Build / Fix
- **Socket.io via ngrok**: Likes/matching may not work through Telegram yet — needs testing after proxy fix
- **AI profiles**: New feature — AI characters with LLM-powered chat
- **Monetization**: Telegram Stars payments for premium content
- **Freemium funnel**: Free AI chat → paid photo unlocks
- **Production S3**: Currently MinIO locally, need real S3 for prod
- **Empty states could use "no data" illustrations** (currently just icons + text)

## Current Status
Local dev environment operational. App accessible through Telegram via ngrok. Core flows (registration, feed browsing, profile editing, photo upload) working. Likes/matching through WebSocket needs verification after socket.io path change.

## Known Issues
- Angular dev server proxy for WebSocket (`ws: true` in proxy.conf.json) may not reliably proxy socket.io — workaround: routed through `/api/socket.io`
- `UserService` at ~46KB suggests potential need for refactoring/splitting
- Old commits reference "workarounds" (костыли) for container restart and unused file cleanup
- `environment.prod.ts` still has old production URLs (s3url, socketUrl) — needs updating for new deployment

## Evolution
- Project started as a Telegram bot, expanded to include Angular WebApp and React Native mobile app
- Database schema evolved through 25 migrations
- Repo migrated from vinloy11/virt to real-ner9/real_virt
- Planning pivot towards AI companion features + monetization
