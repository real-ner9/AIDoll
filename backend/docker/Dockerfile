FROM node:18 AS go_to_vrit_app

ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app
COPY .. /app

RUN npm ci
RUN npm run build --prod

CMD ["node", "--inspect=0.0.0.0:9229", "./dist/main.js"]