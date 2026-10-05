const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const env = require('./config/env');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { generalLimiter } = require('./middleware/rateLimiter');
const store = require('./models/store');

const app = express();

// Trust proxy for reverse proxies (Render, Vercel, load balancers)
app.set('trust proxy', 1);

// Security HTTP Headers with Helmet & CSP
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
        imgSrc: ["'self'", 'data:', 'blob:', 'https:', 'http:'],
        connectSrc: ["'self'", 'https:', 'http:', 'ws:', 'wss:'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: env.NODE_ENV === 'production' ? [] : null,
      },
    },
  })
);

// CORS Configuration - Strict allowlist from CORS_ORIGIN
const allowedOrigins = env.CORS_ORIGIN
  ? env.CORS_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean)
  : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server tests)
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked: Origin ${origin} not allowed by CORS policy`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body Parsers - 1mb limit as requested
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Global Rate Limiter
app.use(generalLimiter);

// Structured Request Logger (Without PII or tracking tokens)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const safeUrl = req.originalUrl.replace(/TT-CASE-\d{4}-[A-F0-9]{32}/gi, '[tracking-token]');
    console.log(`[HTTP] ${req.method} ${safeUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Health check endpoint (tests store health)
app.get('/api/health', (req, res) => {
  const storeHealthy = Array.isArray(store.users) && Array.isArray(store.teen_modules);
  if (!storeHealthy) {
    return res.status(503).json({
      success: false,
      status: 'unhealthy',
      store: 'degraded',
      timestamp: new Date().toISOString(),
    });
  }
  return res.status(200).json({
    success: true,
    status: 'healthy',
    environment: env.NODE_ENV,
    modules_count: store.teen_modules.length,
    users_count: store.users.length,
    timestamp: new Date().toISOString(),
  });
});

// Mount Main API Routes under /api
app.use('/api', routes);

// Centralized Error Handling Middleware
app.use(errorHandler);

// Serve static frontend if built
const possibleFrontendPaths = [
  path.join(__dirname, '../frontend/dist'),
  path.join(__dirname, 'frontend/dist'),
  path.join(process.cwd(), 'frontend/dist'),
  path.join(process.cwd(), 'dist'),
];
const frontendDist = possibleFrontendPaths.find((p) => fs.existsSync(p));
if (frontendDist) {
  console.log(`📦 Serving static frontend from: ${frontendDist}`);
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// 404 Route Catch-All
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route not found: ${req.method} ${req.originalUrl}`,
      code: 'ROUTE_NOT_FOUND',
    },
  });
});

// Export app and handle server initialization & graceful shutdown
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  const PORT = env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`========================================================`);
    console.log(`🚀 TeenTalk Backend API Server running on port ${PORT}`);
    console.log(`🛡️  Environment: ${env.NODE_ENV}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`========================================================`);
  });

  const handleShutdown = (signal) => {
    console.log(`${signal} signal received. Performing graceful shutdown...`);
    if (store && typeof store.saveSnapshot === 'function') {
      try {
        store.saveSnapshot();
      } catch (e) {
        console.error('Error saving snapshot during shutdown:', e.message);
      }
    }
    server.close(() => {
      console.log('HTTP server closed cleanly.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

module.exports = app;
