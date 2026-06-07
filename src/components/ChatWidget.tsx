import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { CONTACT } from '../contact';

type Message = { role: 'user' | 'assistant'; content: string };

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.882 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello! I\'m the Florens assistant. Ask me about our consulting services, mission, vision, or why businesses choose Florens.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: 'user', content: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    const endpoints = ['/api/chat', '/api/chat.php'];

    let lastError = 'Unable to reach the assistant. Please try again.';

    for (const endpoint of endpoints) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: nextMessages }),
        });

        const text = await res.text();
        let data: { reply?: string; error?: string };
        try {
          data = JSON.parse(text);
        } catch {
          lastError = 'Chat service not found. Re-upload the latest site files or enable Node.js hosting.';
          continue;
        }

        if (!res.ok) {
          lastError = data.error || 'Something went wrong. Please try again later.';
          continue;
        }

        setMessages([...nextMessages, { role: 'assistant', content: data.reply ?? lastError }]);
        setLoading(false);
        return;
      } catch {
        continue;
      }
    }

    setMessages([
      ...nextMessages,
      { role: 'assistant', content: lastError },
    ]);
    setLoading(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-[340px] sm:w-[380px] h-[480px] flex flex-col bg-white rounded-2xl shadow-2xl border border-neutral-200/80 overflow-hidden"
          >
            <div className="bg-[#02050b] text-white px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#005eb5]/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-[#5c9efe]" />
                </div>
                <div>
                  <p className="text-sm font-sans font-bold">Florens Assistant</p>
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">
                    Site guide
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f9f9ff]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#005eb5] text-white rounded-br-md'
                        : 'bg-white text-neutral-700 border border-neutral-200/60 rounded-bl-md shadow-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-neutral-200/60 px-3.5 py-2.5 rounded-2xl rounded-bl-md shadow-sm">
                    <Loader2 className="w-4 h-4 text-[#005eb5] animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-neutral-200/60 bg-white shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask about Florens..."
                  disabled={loading}
                  className="flex-1 px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005eb5]/30 focus:border-[#005eb5] font-sans disabled:opacity-60"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="p-2.5 bg-[#005eb5] text-white rounded-xl hover:bg-[#004a94] transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-end gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-sans font-semibold text-neutral-600 bg-white/95 px-3 py-1.5 rounded-full shadow-sm border border-neutral-200/80 whitespace-nowrap">
            WhatsApp
          </span>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:bg-[#1da851] transition-colors border-2 border-white shrink-0"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="w-7 h-7" />
          </a>
        </div>

        <div className="flex items-center gap-2.5">
          {!open && (
            <span className="text-xs font-sans font-semibold text-neutral-600 bg-white/95 px-3 py-1.5 rounded-full shadow-sm border border-neutral-200/80 whitespace-nowrap">
              Chat with agent
            </span>
          )}
          <motion.button
            onClick={() => setOpen(!open)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-[#005eb5] text-white shadow-lg shadow-[#005eb5]/30 flex items-center justify-center hover:bg-[#004a94] transition-colors cursor-pointer border-2 border-white shrink-0"
            aria-label={open ? 'Close chat' : 'Chat with agent'}
          >
            {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
