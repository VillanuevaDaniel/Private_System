const db = require('./db');

async function queryData() {
  try {
    const tableName = 'module'; 
    const query = `SELECT * FROM ${tableName}`;

    console.log(`Ejecutando consulta: ${query}`);
    const [rows] = await db.query(query);

    console.log(`Resultados de la tabla '${tableName}':`);
    console.table(rows);

    process.exit(0);
  } catch (error) {
    console.error('Error al consultar la base de datos:', error.message);
    process.exit(1);
  }
}

queryData();
