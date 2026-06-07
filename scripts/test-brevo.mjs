/**
 * Quick Brevo API test — run with:
 *   node scripts/test-brevo.mjs
 * 
 * Reads BREVO_API_KEY from .env in the project root.
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Parse .env manually (no dotenv dependency needed) ──────────────────────
const envPath = resolve(__dirname, '../.env');
const envVars = {};
try {
  readFileSync(envPath, 'utf-8')
    .split('\n')
    .forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) return;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      envVars[key] = val;
    });
} catch {
  console.error('❌  Could not read .env file at', envPath);
  process.exit(1);
}

const BREVO_API_KEY = envVars.BREVO_API_KEY || process.env.BREVO_API_KEY;
if (!BREVO_API_KEY) {
  console.error('❌  BREVO_API_KEY is not set in .env');
  process.exit(1);
}

// ── Send a transactional email via Brevo SMTP API ─────────────────────────
const payload = {
  sender: {
    name: 'Florens Website Test',
    email: 'business@florensservices.com',
  },
  to: [{ email: 'business@florensservices.com', name: 'Florens Business' }],
  subject: '✅ Brevo API Test — Contact Form Integration',
  htmlContent: `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#f9f9ff;border-radius:12px">
      <h2 style="color:#005eb5">Brevo API Test Successful</h2>
      <p>This is a test email sent from the Florens website contact form integration script.</p>
      <hr style="border:none;border-top:1px solid #e0e0ef;margin:24px 0" />
      <p style="color:#888;font-size:12px">If you received this, the Brevo API key is valid and transactional email is working correctly.</p>
    </div>
  `,
};

console.log('🚀  Sending test email via Brevo API...');

try {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }

  if (res.ok) {
    console.log('✅  Email sent successfully!');
    console.log('   Message ID:', json?.messageId ?? json);
    console.log('\n   Brevo API is working — ready to integrate into vite.config.ts');
  } else {
    console.error(`❌  Brevo API returned HTTP ${res.status}`);
    console.error('   Response:', JSON.stringify(json, null, 2));
  }
} catch (err) {
  console.error('❌  Network error:', err.message);
}
