const http = require('http');

function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      console.log(`[${url}] Status: ${res.statusCode}`);
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`[${url}] Body preview: ${data.substring(0, 100)}`);
        resolve(res.statusCode);
      });
    }).on('error', (err) => {
      console.log(`[${url}] Error: ${err.message}`);
      resolve(null);
    });
  });
}

async function run() {
  console.log('Checking server status...');
  await checkUrl('http://localhost:3000/api/test');
  await checkUrl('http://localhost:3000/api/modules');
  await checkUrl('http://127.0.0.1:3000/api/modules');
}

run();
