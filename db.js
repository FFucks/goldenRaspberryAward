const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csv = require('csv-parser');


function createDatabase() {
  const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory database');
  });

  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS movies(year INT, title TEXT, studios TEXT, producers TEXT, winner TEXT)');
  });

  return db;
}

function addDataFileStream(db) {
  fs.createReadStream('./movielist.csv')
  .pipe(csv({ separator: ';', headers: false, skipLines: 1 }))
  .on('data', (row) => {
    const stmt = db.prepare('INSERT INTO movies VALUES (?, ?, ?, ?, ?)');
    stmt.run(row[0], row[1], row[2], row[3], row[4] || null);
    stmt.finalize();
  })
  .on('end', () => {
    console.log('CSV data imported into the in-memory database');
  });
}

function getAllMovies(db, callback) {
  db.all('SELECT * FROM movies', (err, rows) => {
    callback(err, rows);
  });
}

function getWinnerMovies(db, callback) {
  db.all("SELECT * FROM movies WHERE winner = 'yes'", (err, rows) => {
    callback(err, rows);
  });
}

module.exports = {
  createDatabase,
  addDataFileStream,
  getAllMovies,
  getWinnerMovies
};


