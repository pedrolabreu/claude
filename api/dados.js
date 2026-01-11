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
    console.log('Iniciando fetch do Apps Script...');

    // Adicionar headers e configurações para evitar bloqueio do Google
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VercelBot/1.0; +https://vercel.com)',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      redirect: 'follow', // Seguir redirects automaticamente
      cache: 'no-store'
    });

    console.log('Status da resposta:', response.status);
    console.log('Headers da resposta:', Object.fromEntries(response.headers.entries()));

    // Verificar se a resposta é realmente JSON
    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro do Apps Script (não-ok):', errorText);
      throw new Error(`Apps Script retornou erro: ${response.status} - ${errorText.substring(0, 200)}`);
    }

    // Pegar o texto primeiro para debugar
    const responseText = await response.text();
    console.log('Primeiros 500 caracteres da resposta:', responseText.substring(0, 500));

    // Tentar parsear como JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Erro ao parsear JSON:', parseError);
      console.error('Resposta completa:', responseText);
      throw new Error('Apps Script não retornou JSON válido. Resposta: ' + responseText.substring(0, 200));
    }

    // Verificar se tem dados
    if (!data || typeof data !== 'object') {
      throw new Error('Dados inválidos recebidos do Apps Script');
    }

    console.log('Dados recebidos com sucesso! Meses:', Object.keys(data).length);

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro completo:', error);
    res.status(500).json({
      error: 'Failed to fetch data',
      message: error.message,
      details: error.toString()
    });
  }
}
