const Sequelize = require('sequelize');

// Creating the Sequelize instance
const sequelize = new Sequelize('finalone', 'root', 'miausi2001', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the Movies model
const Movies = sequelize.define('movies', {
  tconst: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  titleType: Sequelize.STRING,
  primaryTitle: Sequelize.STRING,
  runtimeMinutes: Sequelize.INTEGER,
  genres: Sequelize.STRING,
});

// Sync the models with the database
sequelize
  .sync()
  .then(() => {
    console.log('Movies model synced with the database');
  })
  .catch((error) => {
    console.error('Error syncing Movies model with the database:', error);
  });

// Export the Movies model
module.exports = Movies;

