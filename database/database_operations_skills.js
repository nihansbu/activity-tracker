const sqlite3 = require('sqlite3').verbose();
const { openDatabase, getDb } = require('./database.js');

// Get all skills
function getAllSkills(callback) {
    const db = getDb();
    db.all('SELECT * FROM skills', (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
}

// Export

module.exports = {
    getAllSkills
};
