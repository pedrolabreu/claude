/**
 * Vercel Serverless Function para buscar dados do Google Sheets
 * Rota: /api/dados
 */

export default async function handler(req, res) {
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyh2ElvVzI8GH9NLjDGKfJdG7iF4-of3ytq9ZLbclZa/exec';

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
    const response = await fetch(APPS_SCRIPT_URL);

    if (!response.ok) {
      throw new Error(`Apps Script retornou erro: ${response.status}`);
    }

    const data = await response.json();

    // Log para debug (visível nos logs da Vercel)
    console.log('Dados recebidos do Google Sheets:', Object.keys(data).length, 'meses');

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({
      error: 'Failed to fetch data',
      message: error.message
    });
  }
}
