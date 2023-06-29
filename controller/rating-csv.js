const Sequelize = require('sequelize');
const csv = require('csv-parser');
const fs = require('fs');

// Create the Sequelize instance
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

sequelize
  .sync()
  .then(() => {
    console.log('Models synced with the database');

    // Read and parse ratings.csv file
    fs.createReadStream('rating.csv')
      .pipe(csv())
      .on('data', (row) => {
        // Insert ratings data into the Ratings table
        Ratings.create({
          tconst: row.tconst,
          averageRating: parseFloat(row.averageRating),
          numVotes: parseInt(row.numVotes),
        })
          .then(() => {
            console.log('Ratings data inserted');
          })
          .catch((err) => {
            console.error('Error inserting ratings data:', err);
          });
      })
      .on('end', () => {
        console.log('Data insertion completed');
        sequelize.close();
      });
  })
  .catch((err) => {
    console.error('Error syncing models with the database:', err);
  });
