# VIRT — Dating Telegram WebApp

## Архитектура

```
Telegram Bot <-> Backend (NestJS, :3000) <-> PostgreSQL (Docker, :5436)
                    ^                        MinIO S3 (Docker, :9000)
                    |
Frontend (Angular, :4200) -- Telegram WebApp
                    ^
              ngrok tunnel -- чтобы Telegram видел WebApp
```

## Требования

- Node.js 18+
- Docker Desktop
- ngrok (аккаунт + CLI)
- Telegram Bot Token (через @BotFather)

## Локальный запуск (5 терминалов)

### 1. PostgreSQL (Docker)

```bash
cd backend
docker compose -f docker/docker-compose.local.yml up -d go_to_virt_db
```

Проверить: `docker ps` — контейнер `go_to_virt_db` на порту 5436.

### 2. MinIO — локальный S3 (Docker)

Первый запуск:

```bash
docker run -d --name minio \
  -p 9000:9000 -p 9001:9001 \
  -e MINIO_ROOT_USER=minioadmin \
  -e MINIO_ROOT_PASSWORD=minioadmin \
  minio/minio server /data --console-address ":9001"
```

Создать бакет (только первый раз):

```bash
docker exec minio mc alias set local http://localhost:9000 minioadmin minioadmin
docker exec minio mc mb local/go-to-virt
docker exec minio mc anonymous set public local/go-to-virt
```

Повторный запуск (если контейнер остановлен):

```bash
docker start minio
```

Консоль MinIO: http://localhost:9001 (minioadmin / minioadmin)

### 3. Backend

```bash
cd backend
npm install   # только первый раз
npm run start:dev
```

Запустится на http://localhost:3000, API под префиксом `/api`.

### 4. Frontend

```bash
cd frontend
npm install   # только первый раз
npm start
```

Запустится на http://localhost:4200, проксирует `/api` на бэкенд.

### 5. ngrok

```bash
ngrok http 4200 --domain=changeless-unfeasible-arya.ngrok-free.dev
```

Домен статический, не меняется между запусками.

## Настройка BotFather

1. Telegram -> @BotFather -> `/mybots` -> выбрать бота
2. Bot Settings -> Menu Button / Configure Mini App
3. URL: `https://changeless-unfeasible-arya.ngrok-free.dev`

## Конфигурация

### backend/.env

```env
HOST=localhost
DB_PORT=5436
USERNAME=go_to_virt
PASSWORD=go_to_virt
DATABASE=go_to_virt
BOT_TOKEN=<токен из BotFather>
WEB_APP_URL=https://changeless-unfeasible-arya.ngrok-free.dev
S3_ACCESSKEY_ID=minioadmin
S3_SECRET_ACCESS_KEY=minioadmin
S3_ROOT_URL=http://localhost:9000
S3_BUCKET=go-to-virt
S3_URL=http://localhost:9000/go-to-virt
```

### Порты

| Сервис     | Порт  |
|------------|-------|
| PostgreSQL | 5436  |
| MinIO API  | 9000  |
| MinIO UI   | 9001  |
| Backend    | 3000  |
| Frontend   | 4200  |

## Быстрый рестарт (всё уже установлено)

```bash
# Терминал 1: Docker (если контейнеры остановлены)
cd backend && docker compose -f docker/docker-compose.local.yml up -d go_to_virt_db
docker start minio

# Терминал 2: Backend
cd backend && npm run start:dev

# Терминал 3: Frontend
cd frontend && npm start

# Терминал 4: ngrok
ngrok http 4200 --domain=changeless-unfeasible-arya.ngrok-free.dev
```

## Заметки

- В браузере на localhost:4200 приложение показывает "Authorization header is missing" — это нормально, работает только через Telegram WebApp.
- Миграции БД запускаются автоматически при старте бэкенда.
- Бот работает через polling, не через webhook.
- ngrok домен статический — не нужно обновлять URL в BotFather при каждом запуске.
