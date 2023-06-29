const express = require('express');
const router = express.Router();

// Define route handlers
router.get('/api/v1/longest-duration-movies', (req, res) => {
 
    // Execute SQL query to retrieve the top 10 movies with the longest runtime
    const query = `
      SELECT tconst, primaryTitle, runtimeMinutes, genres
      FROM movies
      ORDER BY runtimeMinutes DESC
      LIMIT 10;
    `;
    connection.query(query, (error, results) => {
        if (error) {
          console.error('Error retrieving movies:', error);
          res.status(500).json({ error: 'Failed to retrieve movies' });
        } else {
          res.json(results);
        }
      });
    });
// POST /api/v1/new-movie

router.post('/api/v1/new-movie', (req, res) => {
 // Get the movie data from the request body
 const { tconst, primaryTitle, runtimeMinutes, genres } = req.body;
  
 // Execute SQL query to insert the new movie into the movies table
 const query = `
   INSERT INTO movies (tconst, primaryTitle, runtimeMinutes, genres)
   VALUES (?, ?, ?, ?);
 `;
 
 connection.query(query, [tconst, primaryTitle, runtimeMinutes, genres], (error) => {
   if (error) {
     console.error('Error inserting new movie:', error);
     res.status(500).json({ error: 'Failed to insert new movie' });
   } else {
     res.json({ message: 'Movie added successfully' });
   }
});
});

// GET /api/v1/top-rated-movies
router.get('/api/v1/top-rated-movies', (req, res) => {
    const query = `
    SELECT tconst, primaryTitle, genres, averageRating
    FROM movies
    WHERE averageRating > 6.0
    ORDER BY averageRating DESC;
  `;
  
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving top-rated movies:', error);
      res.status(500).json({ error: 'Failed to retrieve top-rated movies' });
    } else {
      res.json(results);
    }
  });
});

router.get('/api/v1/genre-movies-with-subtotals', (req, res) => {
    const query = `
    SELECT genres, primaryTitle, SUM(numVotes) AS numVotes
    FROM movies
    GROUP BY genres
    WITH ROLLUP;
  `;
  // GET /api/v1/genre-movies-with-subtotals
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving genre movies with subtotals:', error);
      res.status(500).json({ error: 'Failed to retrieve genre movies with subtotals' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
