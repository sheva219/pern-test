'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const createTables = require('./db/createdTables');
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Call createTables function for server startup
createTables();

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost: ${PORT}`);
});
