const Sequelize = require('sequelize');

// Creating the Sequelize instance
const sequelize = new Sequelize('finalone', 'root', 'miausi2001', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the Ratings model
const Ratings = sequelize.define('ratings', {
  tconst: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  averageRating: Sequelize.FLOAT,
  numVotes: Sequelize.INTEGER,
});

// Sync the models with the database
sequelize
  .sync()
  .then(() => {
    console.log('Ratings model synced with the database');
  })
  .catch((error) => {
    console.error('Error syncing Ratings model with the database:', error);
  });

// Export the Ratings model
module.exports = Ratings;
