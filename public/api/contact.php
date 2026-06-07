<?php
/**
 * Contact Form API — Hostinger / Apache hosting.
 * Sends form submissions to business@florensservices.com via Brevo
 * transactional email (SMTP API).
 *
 * Node.js / Vite dev uses vite.config.ts contactApiPlugin instead.
 */
header('Content-Type: application/json; charset=utf-8');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ── Read key from environment or .env file ───────────────────────────────────
function loadEnvValue($key) {
    $val = getenv($key);
    if ($val !== false && $val !== '') {
        return $val;
    }

    $paths = [
        dirname(__DIR__, 2) . '/.env',
        dirname(__DIR__)    . '/.env',
        dirname(__DIR__, 3) . '/.env',
    ];

    foreach ($paths as $path) {
        if (!is_readable($path)) {
            continue;
        }
        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || $line[0] === '#') {
                continue;
            }
            $parts = explode('=', $line, 2);
            if (count($parts) === 2 && trim($parts[0]) === $key) {
                return trim($parts[1], " \t\"'");
            }
        }
    }

    return '';
}

$brevoApiKey = loadEnvValue('BREVO_API_KEY');
if ($brevoApiKey === '') {
    http_response_code(500);
    echo json_encode(['error' => 'BREVO_API_KEY is not configured on the server.']);
    exit;
}

// ── Parse + validate request body ────────────────────────────────────────────
$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);

if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON body.']);
    exit;
}

$name         = trim($body['name']         ?? '');
$email        = trim($body['email']        ?? '');
$company      = trim($body['company']      ?? '');
$country      = trim($body['country']      ?? 'India');
$headcount    = trim($body['headcount']    ?? '1');
$notes        = trim($body['notes']        ?? '');
$solutionTitle = trim($body['solutionTitle'] ?? 'General Inquiry');
$ledgerIndex  = trim($body['ledgerIndex']  ?? ('FLR-' . rand(10000, 99999)));

if ($name === '' || $email === '' || $company === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: name, email, company.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address.']);
    exit;
}

// ── Build email content ───────────────────────────────────────────────────────
function h($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

$submittedAt = (new DateTime('now', new DateTimeZone('Asia/Kolkata')))
    ->format('d F Y, g:i A');

$notesBlock = '';
if ($notes !== '') {
    $notesBlock = '
    <h3 style="margin:0 0 10px;font-size:11px;color:#888;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Case Context / Notes</h3>
    <div style="background:#f9f9ff;border:1px solid #e8e8f8;border-radius:8px;padding:16px 18px;margin-bottom:28px;">
      <p style="margin:0;font-size:13px;color:#333;line-height:1.7;">' . nl2br(h($notes)) . '</p>
    </div>';
}

$htmlContent = '
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:\'Segoe UI\',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <tr>
          <td style="background:linear-gradient(135deg,#02050b 0%,#0d1b35 100%);padding:36px 40px 28px;">
            <p style="margin:0 0 4px;font-size:10px;color:#5c9efe;letter-spacing:3px;text-transform:uppercase;font-weight:700;">Florens Consulting Services</p>
            <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">New Contact Inquiry</h1>
            <p style="margin:8px 0 0;font-size:12px;color:#8899bb;">Response from florensservices.com &mdash; Web Contact Form</p>
          </td>
        </tr>

        <tr>
          <td style="background:#005eb5;padding:12px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0"><tr>
              <td style="color:#fff;font-size:10px;font-family:monospace;letter-spacing:2px;text-transform:uppercase;font-weight:700;">LEDGER INDEX: ' . h($ledgerIndex) . '</td>
              <td align="right" style="color:#a0c4ff;font-size:10px;font-family:monospace;">' . $submittedAt . ' IST</td>
            </tr></table>
          </td>
        </tr>

        <tr>
          <td style="padding:32px 40px;">

            <div style="background:#f0f4ff;border-left:4px solid #005eb5;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:28px;">
              <p style="margin:0;font-size:10px;color:#005eb5;letter-spacing:2px;font-weight:700;text-transform:uppercase;">Inquiry Type</p>
              <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#02050b;">' . h($solutionTitle) . '</p>
            </div>

            <h3 style="margin:0 0 14px;font-size:11px;color:#888;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Contact Details</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:28px;">
              <tr style="border-bottom:1px solid #f0f0f8;">
                <td style="padding:12px 0;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:1px;width:40%;">Full Name</td>
                <td style="padding:12px 0;font-size:14px;color:#02050b;font-weight:700;">' . h($name) . '</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f8;">
                <td style="padding:12px 0;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Email</td>
                <td style="padding:12px 0;font-size:14px;font-weight:700;">
                  <a href="mailto:' . h($email) . '" style="color:#005eb5;text-decoration:none;">' . h($email) . '</a>
                </td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f8;">
                <td style="padding:12px 0;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Company</td>
                <td style="padding:12px 0;font-size:14px;color:#02050b;font-weight:700;">' . h($company) . '</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f8;">
                <td style="padding:12px 0;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Target Jurisdiction</td>
                <td style="padding:12px 0;font-size:14px;color:#02050b;font-weight:700;">' . h($country) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 0;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Headcount (FTEs)</td>
                <td style="padding:12px 0;font-size:14px;color:#02050b;font-weight:700;">' . h($headcount) . '</td>
              </tr>
            </table>

            ' . $notesBlock . '

            <div style="text-align:center;margin-top:8px;">
              <a href="mailto:' . h($email) . '?subject=Re:%20Your%20Florens%20Inquiry%20[' . h($ledgerIndex) . ']"
                 style="display:inline-block;background:#005eb5;color:#fff;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:8px;">
                Reply to ' . h($name) . '
              </a>
            </div>

          </td>
        </tr>

        <tr>
          <td style="background:#f9f9ff;border-top:1px solid #eeeef8;padding:24px 40px;text-align:center;">
            <p style="margin:0;font-size:10px;color:#aaa;letter-spacing:1px;text-transform:uppercase;">Florens Consulting Services Pvt. Ltd. &mdash; florensservices.com</p>
            <p style="margin:6px 0 0;font-size:10px;color:#ccc;">This email was automatically generated from a website contact form submission.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>';

$textContent = implode("\n", [
    'New Contact Form Submission — Florens Website',
    '=============================================',
    "Ledger Index  : $ledgerIndex",
    "Submitted At  : $submittedAt IST",
    "Inquiry Type  : $solutionTitle",
    '',
    'CONTACT DETAILS',
    '---------------',
    "Name          : $name",
    "Email         : $email",
    "Company       : $company",
    "Jurisdiction  : $country",
    "Headcount     : $headcount FTEs",
    $notes !== '' ? "\nNotes:\n$notes" : '',
    '',
    '---',
    'Florens Consulting Services Pvt. Ltd.',
    'florensservices.com',
]);

// ── Call Brevo transactional email API ────────────────────────────────────────
$subject = "[Web Contact] $name from $company — $solutionTitle [$ledgerIndex]";

$payload = json_encode([
    'sender'      => ['name' => 'Florens Website', 'email' => 'business@florensservices.com'],
    'to'          => [['email' => 'business@florensservices.com', 'name' => 'Florens Business']],
    'replyTo'     => ['email' => $email, 'name' => $name],
    'subject'     => $subject,
    'htmlContent' => $htmlContent,
    'textContent' => $textContent,
]);

$ch = curl_init('https://api.brevo.com/v3/smtp/email');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => [
        'accept: application/json',
        'api-key: ' . $brevoApiKey,
        'content-type: application/json',
    ],
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_TIMEOUT        => 30,
]);

$response  = curl_exec($ch);
$httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(502);
    echo json_encode(['success' => false, 'error' => 'Could not reach Brevo API: ' . $curlError]);
    exit;
}

$data = json_decode($response, true);

if ($httpCode < 200 || $httpCode >= 300) {
    $msg = $data['message'] ?? ('Brevo API error: HTTP ' . $httpCode);
    http_response_code(502);
    echo json_encode(['success' => false, 'error' => $msg]);
    exit;
}

echo json_encode([
    'success'   => true,
    'messageId' => $data['messageId'] ?? null,
]);
