const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const port = 3000;

// Creating the Sequelize instance
const sequelize = new Sequelize('finalone', 'root', 'miausi2001', {
  host: 'localhost',
  dialect: 'mysql',
});

// Connect to the database
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
    // Place your database-related operations here
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Other server configuration and route handling code

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

