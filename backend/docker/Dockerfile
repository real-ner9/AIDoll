FROM node:18 AS go_to_vrit_app

RUN apt-get update && apt-get install --force-yes -yy \
  libjemalloc2 \
  && rm -rf /var/lib/apt/lists/*
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci
COPY . .
RUN npm run build --prod

CMD ["node", "./dist/main.js"]