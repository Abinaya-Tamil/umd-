const express = require('express');
const path = require('path');
const cors = require('cors');
const pool = require('./db');
const { getData } = require('./getdata');
const app = express();
const port = process.env.PORT || 3100;

// CORS configuration
app.use(cors({
    origin: 'https://abinaya-tamil.github.io' // Allow only your GitHub Pages domain
}));

// Serve static files from the 'docs' directory
app.use(express.static(path.join(__dirname, 'docs')));

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

// Dynamically create endpoints for each table
app.get('/api/:tableName', async (req, res) => {
    const tableName = req.params.tableName;
    try {
        const results = await getData(tableName);
        res.json(results);
    } catch (err) {
        res.status(500).send(`Error retrieving data from ${tableName}: ${err.message}`);
    }
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.send('Test endpoint is working');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
