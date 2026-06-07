/**
 * contactHandler.ts
 * Sends contact form submissions to business@florensservices.com via Brevo
 * transactional email API — uses Node's built-in `https` module (not fetch)
 * to avoid connectivity issues in some Node/Vite server environments.
 */

import https from 'https';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  country: string;
  headcount: string;
  notes: string;
  solutionTitle: string;
  ledgerIndex: string;
}

/** Minimal https POST helper — returns { status, body } */
function httpsPost(
  hostname: string,
  path: string,
  headers: Record<string, string>,
  payload: string
): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname,
      path,
      method: 'POST',
      // Allow self-signed certs from corporate/network proxies with SSL inspection
      rejectUnauthorized: false,
      headers: {
        ...headers,
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({ status: res.statusCode ?? 0, body }));
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

export async function sendContactEmail(
  data: ContactFormData,
  brevoApiKey: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const {
    name, email, company, country, headcount, notes, solutionTitle, ledgerIndex,
  } = data;

  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'long',
    timeStyle: 'medium',
  });

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#02050b 0%,#0d1b35 100%);padding:36px 40px 28px;">
            <p style="margin:0 0 4px;font-size:10px;color:#5c9efe;letter-spacing:3px;text-transform:uppercase;font-weight:700;">Florens Consulting Services</p>
            <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">New Contact Inquiry</h1>
            <p style="margin:8px 0 0;font-size:12px;color:#8899bb;">Response from florensservices.com — Web Contact Form</p>
          </td>
        </tr>

        <!-- Ledger Badge -->
        <tr>
          <td style="background:#005eb5;padding:12px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0"><tr>
              <td style="color:#ffffff;font-size:10px;font-family:monospace;letter-spacing:2px;text-transform:uppercase;font-weight:700;">LEDGER INDEX: ${ledgerIndex}</td>
              <td align="right" style="color:#a0c4ff;font-size:10px;font-family:monospace;">${submittedAt} IST</td>
            </tr></table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;">

            <!-- Inquiry Type -->
            <div style="background:#f0f4ff;border-left:4px solid #005eb5;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:28px;">
              <p style="margin:0;font-size:10px;color:#005eb5;letter-spacing:2px;font-weight:700;text-transform:uppercase;">Inquiry Type</p>
              <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#02050b;">${solutionTitle}</p>
            </div>

            <!-- Contact Details Table -->
            <h3 style="margin:0 0 14px;font-size:11px;color:#888;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Contact Details</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:28px;">
              <tr style="border-bottom:1px solid #f0f0f8;">
                <td style="padding:12px 0;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:1px;width:40%;">Full Name</td>
                <td style="padding:12px 0;font-size:14px;color:#02050b;font-weight:700;">${escapeHtml(name)}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f8;">
                <td style="padding:12px 0;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Email</td>
                <td style="padding:12px 0;font-size:14px;color:#005eb5;font-weight:700;">
                  <a href="mailto:${escapeHtml(email)}" style="color:#005eb5;text-decoration:none;">${escapeHtml(email)}</a>
                </td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f8;">
                <td style="padding:12px 0;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Company</td>
                <td style="padding:12px 0;font-size:14px;color:#02050b;font-weight:700;">${escapeHtml(company)}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f8;">
                <td style="padding:12px 0;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Target Jurisdiction</td>
                <td style="padding:12px 0;font-size:14px;color:#02050b;font-weight:700;">${escapeHtml(country)}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Headcount (FTEs)</td>
                <td style="padding:12px 0;font-size:14px;color:#02050b;font-weight:700;">${escapeHtml(headcount)}</td>
              </tr>
            </table>

            ${notes ? `
            <!-- Additional Notes -->
            <h3 style="margin:0 0 10px;font-size:11px;color:#888;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Case Context / Notes</h3>
            <div style="background:#f9f9ff;border:1px solid #e8e8f8;border-radius:8px;padding:16px 18px;margin-bottom:28px;">
              <p style="margin:0;font-size:13px;color:#333;line-height:1.7;">${escapeHtml(notes).replace(/\n/g, '<br>')}</p>
            </div>
            ` : ''}

            <!-- CTA -->
            <div style="text-align:center;margin-top:8px;">
              <a href="mailto:${escapeHtml(email)}?subject=Re: Your Florens Inquiry [${ledgerIndex}]" style="display:inline-block;background:#005eb5;color:#ffffff;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:8px;">Reply to ${escapeHtml(name)}</a>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9ff;border-top:1px solid #eeeef8;padding:24px 40px;text-align:center;">
            <p style="margin:0;font-size:10px;color:#aaa;letter-spacing:1px;text-transform:uppercase;">Florens Consulting Services Pvt. Ltd. — florensservices.com</p>
            <p style="margin:6px 0 0;font-size:10px;color:#ccc;">This email was automatically generated from a website contact form submission.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`;

  const textContent = [
    'New Contact Form Submission — Florens Website',
    '=============================================',
    `Ledger Index  : ${ledgerIndex}`,
    `Submitted At  : ${submittedAt} IST`,
    `Inquiry Type  : ${solutionTitle}`,
    '',
    'CONTACT DETAILS',
    '---------------',
    `Name          : ${name}`,
    `Email         : ${email}`,
    `Company       : ${company}`,
    `Jurisdiction  : ${country}`,
    `Headcount     : ${headcount} FTEs`,
    ...(notes ? ['', 'Notes:', notes] : []),
    '',
    '---',
    'Florens Consulting Services Pvt. Ltd.',
    'florensservices.com',
  ].join('\n');

  const brevoPayload = JSON.stringify({
    sender: {
      name: 'Florens Website',
      email: 'business@florensservices.com',
    },
    to: [
      { email: 'business@florensservices.com', name: 'Florens Business' },
    ],
    replyTo: { email, name },
    subject: `[Web Contact] ${name} from ${company} — ${solutionTitle} [${ledgerIndex}]`,
    htmlContent,
    textContent,
  });

  let responseStatus: number;
  let responseBody: string;

  try {
    const result = await httpsPost(
      'api.brevo.com',
      '/v3/smtp/email',
      {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      brevoPayload
    );
    responseStatus = result.status;
    responseBody = result.body;
  } catch (networkErr) {
    const msg = networkErr instanceof Error ? networkErr.message : String(networkErr);
    return { success: false, error: `Network error reaching Brevo API: ${msg}` };
  }

  let responseJson: Record<string, unknown> = {};
  try {
    responseJson = JSON.parse(responseBody);
  } catch {
    responseJson = { raw: responseBody };
  }

  if (responseStatus < 200 || responseStatus >= 300) {
    const errMsg =
      (typeof responseJson.message === 'string' ? responseJson.message : null) ||
      `Brevo API error: HTTP ${responseStatus} — ${responseBody.slice(0, 200)}`;
    return { success: false, error: errMsg };
  }

  return {
    success: true,
    messageId: typeof responseJson.messageId === 'string' ? responseJson.messageId : undefined,
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
