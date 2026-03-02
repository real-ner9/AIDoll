# Tech Context

## Tech Stack

### Backend
- **Runtime**: Node.js 18 (Docker), TypeScript 5.1
- **Framework**: NestJS 10
- **Database**: PostgreSQL 15.4 via TypeORM 0.3
- **WebSocket**: Socket.io 4.7 (@nestjs/platform-socket.io)
- **Bot**: Telegraf 4.13
- **File storage**: AWS S3 SDK v3 (MinIO locally)
- **Image processing**: Sharp 0.32
- **Scheduling**: node-cron
- **i18n**: nestjs-i18n 10.3

### Frontend
- **Framework**: Angular 16
- **State management**: NgRx 16 (store, effects, entity, component-store, router-store)
- **UI**: Angular Material 16, Angular CDK, SCSS
- **Cookies**: ngx-cookie-service
- **Infinite scroll**: ngx-infinite-scroll
- **WebSocket client**: socket.io-client 4.7

### Mobile
- **Framework**: React Native 0.72, React 18.2
- **Navigation**: React Navigation 6 (stack + bottom tabs)
- **HTTP**: Axios
- **Storage**: @react-native-async-storage
- **Media**: react-native-image-picker, react-native-video
- **WebSocket client**: socket.io-client 4.7

## Local Development Setup

### Ports
| Service | Port |
|---------|------|
| PostgreSQL | 5436 (changed from 5432, other projects occupy 5432-5435) |
| MinIO API | 9000 |
| MinIO Console | 9001 |
| Backend | 3000 |
| Frontend | 4200 |
| ngrok | tunnels to 4200 |

### Startup (4 terminals)
1. `cd backend && docker compose -f docker/docker-compose.local.yml up -d go_to_virt_db && docker start minio`
2. `cd backend && npm run start:dev`
3. `cd frontend && npm start`
4. `ngrok http 4200 --domain=changeless-unfeasible-arya.ngrok-free.dev`

### Environment
- Backend: `backend/.env` (HOST, DB_PORT, USERNAME, PASSWORD, DATABASE, BOT_TOKEN, WEB_APP_URL, S3_*)
- Env file priority: `.env.desk` → `.env.local` → `.env`
- DB port configurable: `parseInt(process.env.DB_PORT) || 5432` in app.module.ts
- MinIO creds: minioadmin/minioadmin, bucket: go-to-virt
- ngrok static domain: `changeless-unfeasible-arya.ngrok-free.dev`

### Key Config Changes from Original
- `docker-compose.local.yml`: port 5436:5432 (was 5432:5432)
- `main.ts`: added `app.enableCors({ origin: true, credentials: true })`
- `app.module.ts`: DB port from env, auth middleware excludes `file-store/image/(.*)`
- `user-websocket-gateway.ts`: path `/api/socket.io`
- `user-socket.service.ts`: path `/api/socket.io`, socketUrl is `''`
- `environment.ts`: socketUrl `''`, s3url `/api/file-store/image`
- `proxy.conf.json`: added `/socket.io` proxy with `ws: true`

### Seed Data
- `backend/seed.sql` — 10 test users (userId 100001-100010)
- Avatars uploaded to MinIO via `docker exec minio mc cp`

## Technical Constraints
- Backend TypeScript: relaxed strict mode (`strictNullChecks: false`)
- Node memory limit: 4GB (`--max-old-space-size=4096`) in production Docker
- Migrations auto-run on startup (`migrationsRun: true`)
- Frontend tightly coupled to Telegram WebApp API (no auth in plain browser)
- Free ngrok: 1 tunnel, static domain required (long random URLs don't fit BotFather)
