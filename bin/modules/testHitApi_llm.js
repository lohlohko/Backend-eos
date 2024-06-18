// apiService.js

// Endpoint 1: Generate Text-to-SQL
async function generateTextToSQL() {
  const url =
    'https://dev-llm-apps-7mrnvsl4mq-et.a.run.app/v1/generate-text-to-sql';
  const token =
    '25d0918e05b5a27aa55d6567bb5a5975e2304783fab5b67a26c1d8f555f16c9a';

  const payload = {
    dataset: 'sales',
    table: 'sales',
    project: 'huskarl-data-playground',
    text: 'top 5 product',
    json_schema: {
      fields: [
        { name: 'Date', type: 'DATE', description: '' },
        // other fields
      ],
    },
    json_data: {
      data: [
        { Date: '2015-09-09' },
        // other sample data
      ],
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return { error: error.message };
  }
}

// Endpoint 2: Interpret Data
async function interpretData() {
  const url = 'https://dev-llm-apps-7mrnvsl4mq-et.a.run.app/v1/interpret-data';
  const token =
    '25d0918e05b5a27aa55d6567bb5a5975e2304783fab5b67a26c1d8f555f16c9a';

  const payload = {
    prompt: 'top 10 product', // Mengubah prompt menjadi 'top 10 product'
    result_data: {
      data: [
        { Sub_Category: 'Tires and Tubes', Total_Quantity: 5650 },
        { Sub_Category: 'Mountain Bikes', Total_Quantity: 2821 },
        { Sub_Category: 'Bottles and Cages', Total_Quantity: 2563 },
        { Sub_Category: 'Helmets', Total_Quantity: 2521 },
        { Sub_Category: 'Road Bikes', Total_Quantity: 1341 },
        { Sub_Category: 'Handlebars', Total_Quantity: 1200 },
        { Sub_Category: 'Jerseys', Total_Quantity: 1100 },
        { Sub_Category: 'Shorts', Total_Quantity: 1000 },
        { Sub_Category: 'Socks', Total_Quantity: 950 },
        { Sub_Category: 'Bike Racks', Total_Quantity: 900 },
      ],
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return { error: error.message };
  }
}

// Endpoint 3: Resolve SQL Error
async function resolveSQLError() {
  const url =
    'https://dev-llm-apps-7mrnvsl4mq-et.a.run.app/v1/resolve-sql-error';
  const token =
    '25d0918e05b5a27aa55d6567bb5a5975e2304783fab5b67a26c1d8f555f16c9a';

  const payload = {
    sql_query:
      'SELECT Product_Category, Sub_Category, SUM(Revenue) AS Total_Revenue FROM `huskarl-data-playgroun',
    error_message: 'Function not found: SAM; Did you mean sum? at [1:40]',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return { error: error.message };
  }
}

module.exports = {
  generateTextToSQL,
  interpretData,
  resolveSQLError,
};

