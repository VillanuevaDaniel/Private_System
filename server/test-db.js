const db = require('./db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT 1 as val');
    console.log('Si conecto, mira:', rows[0].val);
    process.exit(0);
  } catch (error) {
    console.error('No conecto pq:', error.message);
    process.exit(1);
  }
}

testConnection();
