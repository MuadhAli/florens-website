import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { getChatReply } from './server/chatHandler';

function chatApiPlugin(): Plugin {
  return {
    name: 'florens-chat-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== '/api/chat' || req.method !== 'POST') {
          next();
          return;
        }

        const env = loadEnv(server.config.mode, process.cwd(), '');
        const apiKey = env.GROK_API_KEY || process.env.GROK_API_KEY || '';

        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', async () => {
          try {
            const { messages } = JSON.parse(body || '{}');
            const result = await getChatReply(messages ?? [], apiKey);
            res.setHeader('Content-Type', 'application/json');
            if (result.error) {
              res.statusCode = result.status || 500;
              res.end(JSON.stringify({ error: result.error }));
              return;
            }
            res.end(JSON.stringify({ reply: result.reply }));
          } catch {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to process chat request' }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), chatApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
