import { FLORENS_CHAT_CONTEXT } from '../src/chatContext';

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

function getApiConfig(apiKey: string) {
  // gsk_* keys are Groq (console.groq.com), not xAI Grok
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

export async function getChatReply(
  messages: ChatMessage[],
  apiKey: string
): Promise<{ reply?: string; error?: string; status?: number }> {
  if (!apiKey) {
    return { error: 'GROK_API_KEY is not configured', status: 500 };
  }

  if (!messages?.length) {
    return { error: 'messages required', status: 400 };
  }

  const { url, model } = getApiConfig(apiKey);

  const grokMessages = [
    {
      role: 'system' as const,
      content: `${FLORENS_CHAT_CONTEXT}\n\nKeep replies concise and professional. Only answer about Florens and this website.`,
    },
    ...messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  let response: Response;
  try {
    response = await fetch(url, {
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
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'fetch failed';
    return { error: `Could not reach AI API: ${msg}`, status: 502 };
  }

  const data = await response.json();

  if (!response.ok) {
    return {
      error: data.error?.message || 'AI API error',
      status: response.status,
    };
  }

  const reply = data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';
  return { reply };
}
