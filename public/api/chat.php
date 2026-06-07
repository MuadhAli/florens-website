<?php
/**
 * Chat API for Hostinger static/Apache hosting.
 * Node.js deploy uses server.js /api/chat instead.
 */
header('Content-Type: application/json; charset=utf-8');

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

function loadEnvValue($key) {
    $val = getenv($key);
    if ($val !== false && $val !== '') {
        return $val;
    }

    $paths = [
        dirname(__DIR__, 2) . '/.env',
        dirname(__DIR__) . '/.env',
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

function loadChatContext() {
    $contextFile = __DIR__ . '/context.txt';
    if (is_readable($contextFile)) {
        return file_get_contents($contextFile);
    }
    return 'You are the Florens Consulting Services website assistant. Answer only about Florens and this website.';
}

$apiKey = loadEnvValue('GROK_API_KEY');
if ($apiKey === '') {
    http_response_code(500);
    echo json_encode(['error' => 'GROK_API_KEY is not configured on the server']);
    exit;
}

$raw = file_get_contents('php://input');
$body = json_decode($raw, true);
$messages = $body['messages'] ?? [];

if (!is_array($messages) || count($messages) === 0) {
    http_response_code(400);
    echo json_encode(['error' => 'messages required']);
    exit;
}

$isGroq = str_starts_with($apiKey, 'gsk_');
$url = $isGroq
    ? 'https://api.groq.com/openai/v1/chat/completions'
    : 'https://api.x.ai/v1/chat/completions';
$model = $isGroq ? 'llama-3.3-70b-versatile' : 'grok-3-mini';

$system = loadChatContext() . "\n\nKeep replies concise and professional. Only answer about Florens and this website.";

$payload = [
    'model' => $model,
    'messages' => array_merge(
        [['role' => 'system', 'content' => $system]],
        $messages
    ),
    'temperature' => 0.3,
    'max_tokens' => 512,
];

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey,
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_TIMEOUT => 60,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(502);
    echo json_encode(['error' => 'Could not reach AI API: ' . $curlError]);
    exit;
}

$data = json_decode($response, true);

if ($httpCode < 200 || $httpCode >= 300) {
    $msg = $data['error']['message'] ?? 'AI API error';
    http_response_code($httpCode >= 400 ? $httpCode : 502);
    echo json_encode(['error' => $msg]);
    exit;
}

$reply = $data['choices'][0]['message']['content'] ?? 'Sorry, I could not generate a response.';
echo json_encode(['reply' => $reply]);
