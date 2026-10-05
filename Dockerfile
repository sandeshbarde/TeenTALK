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
ENV JWT_SECRET=teentalk_production_default_jwt_secret_key_at_least_32_characters_12345
ENV EVIDENCE_ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef

CMD ["node", "backend/server.js"]
