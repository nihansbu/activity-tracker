const sqlite3 = require('sqlite3').verbose();
const { openDatabase, getDb } = require('./database.js');

// Get Player By ID
function getPlayerById(id, callback) {
    const db = getDb();
    db.get('SELECT * FROM players WHERE id = ?', [id], (err, row) => {
        if (err) {
            throw err;
        }
        callback(row);
    });
}

// USED in frontend/resource_component/component_navbar.js
async function getPlayerCurrentRap() {
    await openDatabase();
    const db = getDb();
    return new Promise((resolve, reject) => {
        db.get('SELECT currentRap FROM players', (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row.currentRap);
            }
        });
    });
}

function rewardPlayerRap(reward, callback) {
    const db = getDb();
    db.run('UPDATE players SET currentRap = currentRap + ?, totalRap = totalRap + ?', [reward, reward], (err) => {
        if (err) {
            throw err;
        }
        if (callback) {
            callback();
        }
    });
}

module.exports = {
    getPlayerById,
    rewardPlayerRap,
    getPlayerCurrentRap
};