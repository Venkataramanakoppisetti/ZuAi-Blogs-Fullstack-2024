const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./ZuAi.db");


db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        post_id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_title TEXT NOT NULL,
        post_content TEXT NOT NULL,
        post_author TEXT NOT NULL,
        post_created_at DATETIME DEFAULT CURRENT_TIMESTAMP    
    )`, (error) => {
        if (error) {
            console.log("Error while creating posts table: ", error.message)
        }else {
            console.log("Posts Table is created successfully...")
        }
    })
})

module.exports = db;