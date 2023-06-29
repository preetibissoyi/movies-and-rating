const axios = require('axios');

// GET request to retrieve top-rated movies
axios.get('http://localhost:3000/api/v1/top-rated-movies')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// GET request to retrieve genre-wise movies with subtotals of numVotes
axios.get('http://localhost:3000/api/v1/genre-movies-with-subtotals')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
