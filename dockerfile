
FROM node:20-alpine AS base
WORKDIR /app

RUN corepack enable

FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile


FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm prisma generate

RUN pnpm build


FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY package.json ./

EXPOSE 3000

CMD ["node", "dist/server.js"]
