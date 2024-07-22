const express = require('express');
const path = require('path');
const pool = require('./db');
const { getData } = require('./getdata');
const app = express();
const port = process.env.PORT || 3078;

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to fetch table names
app.get('/api/tables', async (req, res) => {
    try {
        const [results] = await pool.query('SHOW TABLES');
        const tableNames = results.map(row => Object.values(row)[0]);
        res.json(tableNames);
    } catch (err) {
        res.status(500).send(`Error retrieving table list: ${err.message}`);
    }
});

// Other endpoints
const tables = [/* your tables list */];
tables.forEach((tableName) => {
    app.get(`/api/${tableName}`, async (req, res) => {
        try {
            const results = await getData(tableName);
            res.json(results);
        } catch (err) {
            res.status(500).send(`Error retrieving data from ${tableName}: ${err.message}`);
        }
    });
});

app.get('/api/test', (req, res) => {
    res.send('Test endpoint is working');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
