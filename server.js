import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { getChatReply } from './server/chatHandler.ts';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: '32kb' }));

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.GROK_API_KEY || '';
  const result = await getChatReply(req.body?.messages ?? [], apiKey);

  if (result.error) {
    res.status(result.status || 500).json({ error: result.error });
    return;
  }

  res.json({ reply: result.reply });
});

const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
