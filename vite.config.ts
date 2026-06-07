import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { getChatReply } from './server/chatHandler';
import { sendContactEmail } from './server/contactHandler';

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

function contactApiPlugin(): Plugin {
  return {
    name: 'florens-contact-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== '/api/contact' || req.method !== 'POST') {
          next();
          return;
        }

        const env = loadEnv(server.config.mode, process.cwd(), '');
        const brevoApiKey = env.BREVO_API_KEY || process.env.BREVO_API_KEY || '';

        if (!brevoApiKey) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'BREVO_API_KEY is not configured on the server.' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');

            // Basic server-side validation
            if (!data.name || !data.email || !data.company) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Missing required fields: name, email, company.' }));
              return;
            }

            const result = await sendContactEmail(
              {
                name: String(data.name).trim(),
                email: String(data.email).trim(),
                company: String(data.company).trim(),
                country: String(data.country || 'India').trim(),
                headcount: String(data.headcount || '1').trim(),
                notes: String(data.notes || '').trim(),
                solutionTitle: String(data.solutionTitle || 'General Inquiry').trim(),
                ledgerIndex: String(data.ledgerIndex || `FLR-${Math.floor(Math.random() * 90000) + 10000}`).trim(),
              },
              brevoApiKey
            );

            res.setHeader('Content-Type', 'application/json');
            if (result.success) {
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, messageId: result.messageId }));
            } else {
              res.statusCode = 502;
              res.end(JSON.stringify({ success: false, error: result.error }));
            }
          } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            console.error('[contact-api] Unhandled error:', msg);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: `Server error: ${msg}` }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), chatApiPlugin(), contactApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
