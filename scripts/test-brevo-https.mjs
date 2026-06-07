/**
 * Test the Brevo API using Node's built-in https module (no fetch).
 * Run: node scripts/test-brevo-https.mjs
 */

import https from 'https';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Parse .env
const envPath = resolve(__dirname, '../.env');
const envVars = {};
readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) return;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
  envVars[key] = val;
});

const BREVO_API_KEY = envVars.BREVO_API_KEY;
if (!BREVO_API_KEY) { console.error('No BREVO_API_KEY found'); process.exit(1); }

const payload = JSON.stringify({
  sender: { name: 'Florens Test', email: 'business@florensservices.com' },
  to: [{ email: 'business@florensservices.com', name: 'Florens Business' }],
  subject: '✅ Brevo https Test — Contact Form Integration',
  htmlContent: '<p>Test email via Node https module. If received, integration is working.</p>',
  textContent: 'Test email via Node https module.',
});

console.log('🚀  Sending test via Node https...');

const req = https.request({
  hostname: 'api.brevo.com',
  path: '/v3/smtp/email',
  method: 'POST',
  rejectUnauthorized: false,
  headers: {
    'accept': 'application/json',
    'api-key': BREVO_API_KEY,
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(payload),
  },
}, (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    console.log(`HTTP ${res.statusCode}`);
    try {
      const json = JSON.parse(body);
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log('✅  Success! Message ID:', json.messageId);
      } else {
        console.error('❌  Brevo error:', json.message || body);
        if (json.message?.includes('IP')) {
          console.log('\n👉  Fix: Go to https://app.brevo.com/security/authorised_ips');
          console.log('   and add your current IP address, then retry.');
        }
      }
    } catch {
      console.log('Response:', body);
    }
  });
});

req.on('error', e => console.error('❌  Network error:', e.message));
req.write(payload);
req.end();
