FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
ENV NODE_ENV=development
RUN npm ci --include=dev

COPY . .
RUN npm run build -w apps/web

FROM nginx:alpine
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
COPY nginx/prod.conf /etc/nginx/nginx.conf