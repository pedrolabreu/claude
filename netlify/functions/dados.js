exports.handler = async function(event, context) {
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbynktuCXCY-EPYnnhGPUsqK-RcnRahzmqzE3WfugW9mwx8QHLZryEgAmUZxpDk3_97ZRQ/exec';

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
