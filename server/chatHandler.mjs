import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadChatContext() {
  try {
    const raw = readFileSync(join(__dirname, '../src/chatContext.ts'), 'utf8');
    const match = raw.match(/export const FLORENS_CHAT_CONTEXT = `([\s\S]*?)`\.trim\(\)/);
    if (match) return match[1];
  } catch {
    /* fallback below */
  }
  return 'You are the Florens Consulting Services website assistant. Answer only about Florens and this website.';
}

const FLORENS_CHAT_CONTEXT = loadChatContext();

function getApiConfig(apiKey) {
  if (apiKey.startsWith('gsk_')) {
    return {
      url: 'https://api.groq.com/openai/v1/chat/completions',
      model: 'llama-3.3-70b-versatile',
    };
  }
  return {
    url: 'https://api.x.ai/v1/chat/completions',
    model: 'grok-3-mini',
  };
}

export async function getChatReply(messages, apiKey) {
  if (!apiKey) {
    return { error: 'GROK_API_KEY is not configured on the server', status: 500 };
  }

  if (!messages?.length) {
    return { error: 'messages required', status: 400 };
  }

  const { url, model } = getApiConfig(apiKey);

  const grokMessages = [
    {
      role: 'system',
      content: `${FLORENS_CHAT_CONTEXT}\n\nKeep replies concise and professional. Only answer about Florens and this website.`,
    },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: grokMessages,
        temperature: 0.3,
        max_tokens: 512,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error?.message || 'AI API error',
        status: response.status,
      };
    }

    const reply = data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';
    return { reply };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'fetch failed';
    return { error: `Could not reach AI API: ${msg}`, status: 502 };
  }
}
