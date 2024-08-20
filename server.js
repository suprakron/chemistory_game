const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Use bodyParser to handle JSON data from the client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create or connect to SQLite database
const db = new sqlite3.Database('./quiz.db', (err) => {
    if (err) {
        console.error('Unable to connect to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Create 'scores' table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            class TEXT NOT NULL,
            level INTEGER NOT NULL,
            score INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating scores table:', err.message);
            } else {
                console.log('Scores table created or already exists.');
            }
        });
    }
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

// Route to serve leaderboard page
app.get('/leaderboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'leaderboard.html'));
});


// Route to handle saving quiz answers
app.post('/save-answers', (req, res) => {
    const { answer1, answer2, coinCount } = req.body;

    if (!answer1 || !answer2 || coinCount === undefined) {
        return res.status(400).json({ error: 'ข้อมูลไม่สมบูรณ์' });
    }

    const query = `INSERT INTO answers (answer1, answer2, coinCount) VALUES (?, ?, ?)`;
    db.run(query, [answer1, answer2, coinCount], function (err) {
        if (err) {
            console.error('เกิดข้อผิดพลาดในการบันทึกคำตอบ:', err.message);
            return res.status(500).json({ error: 'ไม่สามารถบันทึกคำตอบได้' });
        }

        res.status(200).json({ message: 'บันทึกคำตอบสำเร็จ', id: this.lastID });
    });
});






// Route to save score
app.post('/save-score', (req, res) => {
    const { name, class: userClass, level, score, answer1, answer2 } = req.body;

    if (!name || !userClass || level === undefined || score === undefined || answer1 === undefined || answer2 === undefined) {
        return res.status(400).json({ error: 'Incomplete data' });
    }

    const query = `INSERT INTO scores (name, class, level, score, answer1, answer2) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [name, userClass, level, score, answer1, answer2], function (err) {
        if (err) {
            console.error('Error saving score:', err.message);
            return res.status(500).json({ error: 'Unable to save score' });
        }

        res.status(200).json({ message: 'Score saved successfully', id: this.lastID });
    });
});

// Route to get leaderboard data
app.get('/leaderboard-data', (req, res) => {
    const query = `SELECT name, class, level, score, answer1, answer2 FROM scores ORDER BY level DESC, score DESC`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error retrieving leaderboard data:', err.message);
            return res.status(500).json({ error: 'Unable to retrieve data' });
        }

        // Add correct answers for comparison
        const correctAnswers = {
            question1: 3,  // Update with correct answer value
            question2: 2   // Update with correct answer value
        };

        // Add correct answer feedback
        rows.forEach(row => {
            row.correctAnswer1 = correctAnswers.question1;
            row.correctAnswer2 = correctAnswers.question2;
        });

        res.status(200).json(rows);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
