const sqlite3 = require('sqlite3').verbose();
const { openDatabase, getDb } = require('./database.js');
const { modifyPlayerRap } = require('./database_operations_player.js');

// Schema
// CREATE TABLE "skills" (
// 	"id"	INTEGER,
// 	"name"	TEXT NOT NULL DEFAULT 'skillName',
// 	"currentLevel"	INTEGER NOT NULL DEFAULT 1,
// 	"maxLevel"	INTEGER NOT NULL DEFAULT 120,
// 	"image"	TEXT NOT NULL DEFAULT 'default.png',
// 	PRIMARY KEY("id")
// )

// Get all skills for display
function getAllSkills(callback) {
    const db = getDb();
    db.all('SELECT * FROM skills', (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
}

// Calculate experience needed for next level
function calculateExperienceNeeded(currentLevel) {
    // Replace this with your actual formula for calculating experience
    return currentLevel * 100;
}

// Level Up Skill
function levelUpSkill(skill, callback) {
    const db = getDb();
    db.get('SELECT currentLevel FROM skills WHERE name = ?', [skill], (err, row) => {
        if (err) {
            throw err;
        }
        const requiredExperience = calculateExperienceNeeded(row.currentLevel);
        modifyPlayerRap(-requiredExperience, () => {
            db.run('UPDATE skills SET currentLevel = currentLevel + 1 WHERE name = ?', [skill], (err) => {
                if (err) {
                    throw err;
                }
                callback();
            });
        });
    });
}


// Export

module.exports = {
    getAllSkills,
    levelUpSkill
};
