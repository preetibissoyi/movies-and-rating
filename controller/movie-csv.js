const csv = require('csv-parser');
const fs = require('fs');
const Movies = require('./movies-model'); 

// Connect to the database
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
    // Read and parse movies.csv file
    fs.createReadStream('movies.csv')
      .pipe(csv())
      .on('data', (row) => {
        // Process each row of the CSV file and create a movie record
        Movies.create({
          tconst: row.tconst,
          titleType: row.titleType,
          primaryTitle: row.primaryTitle,
          runtimeMinutes: parseInt(row.runtimeMinutes),
          genres: row.genres,
        })
          .then(() => {
            console.log('Movie record created:', row.tconst);
          })
          .catch((error) => {
            console.error('Error creating movie record:', error);
          });
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
      });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
//=================================//==========================================//

const Movies = require('./models/Movies'); 

fs.createReadStream('movies.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Extract data from each row of the CSV file
    const { tconst, titleType, primaryTitle, runtimeMinutes, genres } = row;

    // Insert data into the Movies table
    Movies.create({
      tconst,
      titleType,
      primaryTitle,
      runtimeMinutes,
      genres,
    })
      .then(() => {
        console.log('Movie data inserted');
      })
      .catch((error) => {
        console.error('Error inserting movie data:', error);
      });
  })
  .on('end', () => {
    console.log('Data insertion completed');
  });
