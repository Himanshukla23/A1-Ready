import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import doroHandler from './api/doro.js';
import evaluateSpeakingHandler from './api/evaluate-speaking.js';

/**
 * Custom Vite plugin to emulate Vercel serverless functions locally.
 * Intercepts POST requests to /api/doro and /api/evaluate-speaking,
 * reads process.env from .env, and routes them directly to the Node handlers.
 */
function localApiPlugin() {
  return {
    name: 'local-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];

        if (req.method === 'POST' && (url === '/api/doro' || url === '/api/evaluate-speaking')) {
          let bodyStr = '';
          req.on('data', (chunk) => {
            bodyStr += chunk;
          });

          req.on('end', async () => {
            try {
              req.body = bodyStr ? JSON.parse(bodyStr) : {};
            } catch (e) {
              req.body = {};
            }

            const resWrapper = {
              statusCode: 200,
              status(code) {
                this.statusCode = code;
                res.statusCode = code;
                return this;
              },
              setHeader(name, val) {
                res.setHeader(name, val);
                return this;
              },
              json(data) {
                this.statusCode = this.statusCode || 200;
                res.statusCode = this.statusCode;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              },
              send(data) {
                this.statusCode = this.statusCode || 200;
                res.statusCode = this.statusCode;
                res.end(data);
              },
            };

            try {
              if (url === '/api/doro') {
                await doroHandler(req, resWrapper);
              } else if (url === '/api/evaluate-speaking') {
                await evaluateSpeakingHandler(req, resWrapper);
              }
            } catch (err) {
              console.error(`[Local Serverless API Error ${url}]:`, err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.GEMINI_API_KEY) process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  if (env.GROQ_API_KEY) process.env.GROQ_API_KEY = env.GROQ_API_KEY;

  return {
    plugins: [react(), localApiPlugin()],
  };
});
