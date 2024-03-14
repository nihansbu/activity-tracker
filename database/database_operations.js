const sqlite3 = require('sqlite3').verbose();
const { getDb } = require('./database.js');

// +++ ITEMS +++
function getAllItems(callback) {
    const db = getDb();
    db.all("SELECT * FROM ITEMS", [], (err, rows) => {
      if (err) {
        throw err;
      }
      callback(rows);
    });
  }

// +++ FLOORS +++
function getAllFloors(callback) {
    const db = getDb();
    db.all("SELECT * FROM FLOORS", [], (err, rows) => {
      if (err) {
        throw err;
      }
      callback(rows);
    });
  }

// +++ CHRONICLES +++
function getAllChronicles(callback) {
    const db = getDb();
    db.all('SELECT * FROM chronicles', [], (err, rows) => {
      if (err) {
        throw err;
      }
      callback(rows);
    });
  }

function updateChronicleCounter(chronicle) {
    const db = getDb();
    db.run('UPDATE chronicles SET counter = ? WHERE name = ?', [chronicle.counter, chronicle.name], (err) => {
      if (err) {
        throw err;
      }
    });
}


  module.exports = {
    getAllItems,
    getAllFloors,
    getAllChronicles,
    updateChronicleCounter
  };