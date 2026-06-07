import puppeteer from 'puppeteer';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 4173; // Standard Vite preview port
const app = express();

// Serve the compiled frontend
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const server = app.listen(PORT, async () => {
  console.log('Starting Prerendering process...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const routes = [
    '/',
    '/global-solutions',
    '/subsidiary-formation',
    '/cost-calculator',
    '/about-us',
    '/why-florens',
    '/contact-us',
    '/services/eor',
    '/services/peo',
    '/services/contractor',
    '/404'
  ];

  try {
    for (const route of routes) {
      console.log(`Prerendering ${route}...`);
      const page = await browser.newPage();
      
      // Wait until there are no network connections for at least 500ms
      await page.goto(`http://localhost:${PORT}${route}`, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      // Wait an extra second for any animations or React state to settle
      await new Promise(resolve => setTimeout(resolve, 1000));

      const html = await page.content();
      
      // Calculate where to save this HTML
      const routePath = route === '/' ? '' : route;
      const saveDir = path.join(distPath, routePath);
      
      // Make sure directory exists
      if (!fs.existsSync(saveDir)) {
        fs.mkdirSync(saveDir, { recursive: true });
      }

      // We only want to save as index.html if it's not the root itself (which already has index.html)
      // Actually, overwriting the root index.html with the prerendered one is exactly what we want!
      // But wait, if we overwrite it with a prerendered version of '/', subsequent requests for other routes 
      // might serve the prerendered '/' instead of the empty SPA index.html, which might cause hydration issues or flash of content.
      // However, since we are doing this at the very end, and express is running right now holding the original index.html in memory/cache or serving from disk.
      // Actually, Express reads from disk. If we overwrite index.html, it's fine for the static host eventually, 
      // but might affect the loop running. So we'll save it as `temp-index.html` and move it later, or just save it directly.
      // Usually, it's fine.
      
      const filePath = path.join(saveDir, 'index.html');
      fs.writeFileSync(filePath, html);
      
      console.log(`Saved ${filePath}`);
      await page.close();
    }
  } catch (error) {
    console.error('Error during prerendering:', error);
  } finally {
    await browser.close();
    server.close();
    console.log('Prerendering complete!');
  }
});
