const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'attendance_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// API to get attendance details
app.get('/attendance/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    db.query(
        'SELECT * FROM Attendance WHERE student_id = ?',
        [studentId],
        (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(results);
            }
        }
    );
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
