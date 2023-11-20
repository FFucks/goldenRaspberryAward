const express = require('express');
const { createDatabase, addDataFileStream, getAllMovies } = require('./db');

const app = express();
const port = 8000;

const db = createDatabase();

function findMinAndMaxIntervalsForProducers(movies) {
    const producers = [...new Set(movies.map(movie => movie.producers))];
    const intervals = [];
  
    producers.forEach(producer => {
      const producerMovies = movies.filter(movie => movie.producers === producer && (movie.winner && movie.winner.toLowerCase() === 'yes'));
  
      // Only calculate if there is enough wins
      if (producerMovies.length >= 2) {
  
        producerMovies.sort((a, b) => a.year - b.year);
  
        const minInterval = producerMovies[1].year - producerMovies[0].year;
        const maxInterval = producerMovies[producerMovies.length - 1].year - producerMovies[0].year;
  
        intervals.push({
          producer: producer,
          interval: minInterval,
          previousWin: producerMovies[0].year,
          followingWin: producerMovies[1].year,
        });
  
        intervals.push({
          producer: producer,
          interval: maxInterval,
          previousWin: producerMovies[0].year,
          followingWin: producerMovies[producerMovies.length - 1].year,
        });
      }
    });
  
    return intervals;
  }


const server = app.listen(port, () => {
    addDataFileStream(db);
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/minMaxMovies', (req, res) => {

    getAllMovies(db, (err, rows) => {
        const allProducersIntervals = findMinAndMaxIntervalsForProducers(rows);
    
        const result = {
          min: allProducersIntervals.filter(interval => interval.interval === Math.min(...allProducersIntervals.map(i => i.interval))),
          max: allProducersIntervals.filter(interval => interval.interval === Math.max(...allProducersIntervals.map(i => i.interval))),
        };
    
        const resultWithoutDuplicates = {
          min: result.min.filter((entry, index, self) => index === self.findIndex(e => JSON.stringify(e) === JSON.stringify(entry))),
          max: result.max.filter((entry, index, self) => index === self.findIndex(e => JSON.stringify(e) === JSON.stringify(entry))),
        };
    
        res.json(resultWithoutDuplicates);
    })

});

app.get('/getMoviesList', (req, res) => {
    getAllMovies(db, (err, rows) => {
        res.json(rows);
    })

});

server.on('close', () => {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Closed the in-memory database connection');
    });
});

module.exports = app;

