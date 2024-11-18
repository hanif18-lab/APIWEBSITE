const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the User API!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
app.get('/users', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the users file.');
            return;
        }
        res.send(JSON.parse(data));
    });
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the users file.');
            return;
        }
        const users = JSON.parse(data);
        const user = Object.values(users).find(u => u.id === userId);

        if (user) {
            res.send(user);
        } else {
            res.status(404).send('User not found.');
        }
    });
});

app.get('/users/profession/:profession', (req, res) => {
    const profession = req.params.profession.toLowerCase();
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the users file.');
            return;
        }
        const users = JSON.parse(data);
        const matchedUsers = Object.values(users).filter(u => u.profession.toLowerCase() === profession);

        if (matchedUsers.length > 0) {
            res.send(matchedUsers);
        } else {
            res.status(404).send('No users found with the given profession.');
        }
    });
});

app.get('/users/name/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the users file.');
            return;
        }
        const users = JSON.parse(data);
        const user = Object.values(users).find(u => u.name.toLowerCase() === name);

        if (user) {
            res.send(user);
        } else {
            res.status(404).send('User not found.');
        }
    });
});
