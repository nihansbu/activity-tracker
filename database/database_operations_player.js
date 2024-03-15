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

// Spaghetti, Is currently used in chronicles/.
// Future: Replace with a more generic function that can be used for all rewards.
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

// Generic function that can be used for all rewards.
function modifyPlayerRap(amount, callback) {
    const db = getDb();
    db.get('SELECT currentRap FROM players WHERE id = 1', [], (err, row) => {
        if (err) {
            throw err;
        }
        const newRap = row.currentRap + amount;
        if (newRap < 0) {
            console.log('Not enough RAP to complete operation');
            return;
        }
        db.run('UPDATE players SET currentRap = ? WHERE id = 1', [newRap], (err) => {
            if (err) {
                throw err;
            }
            callback();
        });
    });
}

module.exports = {
    getPlayerById,
    rewardPlayerRap,
    getPlayerCurrentRap,
    modifyPlayerRap
};