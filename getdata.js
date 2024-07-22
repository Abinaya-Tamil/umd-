// getdata.js
const pool = require('./db');

const getData = async (tableName) => {
  const query = 'SELECT * FROM ??';
  try {
    const [results] = await pool.query(query, [tableName]);
    return results;
  } catch (err) {
    console.error(`Error querying table ${tableName}: ${err.message}`);
    throw err;
  }
};

module.exports = { getData };
