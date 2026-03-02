# System Patterns

## Architecture
Monorepo with three independent packages (backend, frontend, mobile) — no shared code or workspace linking. Each has its own `package.json` and `node_modules`.

## Backend Patterns

### Module Structure (NestJS)
Each domain is a NestJS module with service + controller/gateway:
- `BotModule` → Telegram bot commands
- `BotUsersModule` → User entity, UserService (core logic, largest file), UserController (REST), UsersWebSocketGateway
- `BotChatModule` → ChatActionsService, MessageService, RoomService
- `RoomsModule` → RoomsGateway (WebSocket)
- `ProfileMatchModule` → matching algorithm
- `FileStoreModule` → S3 integration + image proxy endpoint

### Database
- TypeORM entities in `src/bot-users/schemas/` and `src/rooms/schemas/`
- Migrations in `src/migrations/`, auto-run on startup
- User entity is central, referenced by Like, Match, Connection, ChatRequest, UserBlock, etc.

### Dual WebSocket Gateways
- `UsersWebSocketGateway` — user-level events (likes, matches, online status), path: `/api/socket.io`
- `RoomsGateway` — room-level events (chat messages)

### File Storage
- Upload via multer → Sharp processing → S3 (MinIO locally)
- Download via backend proxy: `GET /api/file-store/image/:hash` (no auth required)
- Static serving at `/rooms/file-store/`

### Auth
- Middleware on all routes except `file-store/image/(.*)`
- Validates Telegram WebApp signature via HMAC-SHA256
- Header format: `Authorization: twa-init-data <data>`

## Frontend Patterns

### State Management (NgRx)
- Store, effects, entity, router-store in `src/app/shared/store/`
- Feature modules are route-based: feed, likes, profile-match, requests, settings
- Each feature has facade pattern: Store → Facade → Component

### Auth Flow
- `window.Telegram.WebApp` provides user identity
- `tgWebAppData` extracted from URL hash fragment
- Cookie fallback via `ngx-cookie-service`

### Services
- `UserService` — REST API calls to backend
- `SocketService` — Socket.io connection management (path: `/api/socket.io`)
- `FileStoreService` — file upload/download

### UI Patterns
- Dark theme: background `#1D1D1D`, primary `#642EFF`, text `#E2E2E9`
- Font: "Golos UI", sans-serif
- Empty states: purple icon in circle + title + subtitle
- Loading: purple spinning ring with cubic-bezier easing
- Bottom tab navigation: 5 tabs (Matches, Requests, Feed, Likes, Profile)

### Image URLs
- `photoUrl` pipe transforms hash → `/api/file-store/image/{hash}`
- Configured in `environment.ts` as `s3url: '/api/file-store/image'`

## Communication Pattern
```
Telegram → ngrok → Angular dev server (:4200) → proxy → Backend (:3000)
                                                      → MinIO (:9000) [via backend proxy]

Telegram Bot ←→ Backend (Telegraf, polling mode)
Frontend     ←→ Backend (REST /api + Socket.io /api/socket.io)
Mobile       ←→ Backend (REST /api + Socket.io)
```
