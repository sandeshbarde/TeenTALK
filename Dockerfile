# Multi-stage Dockerfile for complete TeenTalk Platform (Frontend + Backend)
FROM node:20-alpine AS builder

WORKDIR /app

# Build Frontend
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# Production Runner
FROM node:20-alpine AS runner

WORKDIR /app

COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev

COPY backend/ ./backend/
COPY --from=builder /app/frontend/dist ./frontend/dist

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "backend/server.js"]
