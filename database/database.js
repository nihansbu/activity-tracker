const sqlite3 = require('sqlite3').verbose();
let db;

// Open the database
function openDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database('./data/myDatabase.db', (err) => {
      if (err) {
        console.error(err.message);
        reject(err); // Reject the promise if there's an error
      } else {
        resolve(); // Resolve the promise when the database connection is open
      }
    });
  });
}

// Close the database
function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}

function getDb() {
  return db;
}

module.exports = {
    openDatabase,
    closeDatabase,
    getDb
  };