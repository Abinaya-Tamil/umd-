const pool = require('./db');

// Function to get data from a specific table
async function getData(tableName) {
    try {
        const [results] = await pool.query(`SELECT * FROM ${tableName}`);
        return results;
    } catch (err) {
        throw new Error(`Error retrieving data from ${tableName}: ${err.message}`);
    }
}

module.exports = { getData };
