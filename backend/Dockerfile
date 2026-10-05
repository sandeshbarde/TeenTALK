FROM node:20-alpine

WORKDIR /app

# Install dependencies first for cached layers
COPY package*.json ./
RUN npm install --omit=dev

# Copy backend source code
COPY . .

# Expose backend port
EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "server.js"]
