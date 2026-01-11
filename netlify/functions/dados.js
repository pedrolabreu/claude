exports.handler = async function(event, context) {
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw9iv2q5ksjs64BouGnvbx1x7PeOt2QayYod4X7vfR08ermVLs4XTtenIjt6ziO1Kv_pw/exec';

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
