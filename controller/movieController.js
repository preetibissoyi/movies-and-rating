const axios = require('axios');

// GET request to retrieve the top 10 movies with the longest runtime
axios.get('http://localhost:3000/api/v1/longest-duration-movies')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// POST request to save a new movie
const newMovie = {
  tconst: 'tt1234567',
  primaryTitle: 'New Movie',
  runtimeMinutes: 120,
  genres: 'Action, Drama'
};

axios.post('http://localhost:3000/api/v1/new-movie', newMovie)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
