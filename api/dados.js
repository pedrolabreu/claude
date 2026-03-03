/**
 * Vercel Serverless Function para buscar dados do Google Sheets
 * Rota: /api/dados
 */

export default async function handler(req, res) {
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwCfrXV634jM3_0BQRrzBWYdmNQTqryPW4kt2KcumJ4As7p3eJWt8PF3uNLPOIDkbqsKA/exec';

  // Permitir CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VercelBot/1.0; +https://vercel.com)',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      },
      redirect: 'follow',
      cache: 'no-store',
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Apps Script error: ${response.status}`);
    }

    const data = await response.json();

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data from Apps Script');
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      error: 'Failed to fetch data',
      message: error.message
    });
  }
}
