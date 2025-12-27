# Build stage
FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --production

COPY --from=build /app/dist ./dist

COPY server.js .

EXPOSE 3000

CMD ["node", "server.js"]