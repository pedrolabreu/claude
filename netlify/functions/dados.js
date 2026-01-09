exports.handler = async function(event, context) {
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyTz0bW5joq3nnqG-TWYI9hok-FagZzerYnlzS_rtAnt7Ch2ZpaVX9bT-qBxU8bYA7A3g/exec';

  try {
    const response = await fetch(APPS_SCRIPT_URL);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
};
