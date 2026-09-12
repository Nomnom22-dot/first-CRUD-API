const express = require('express');
const app = express();
const Database = require('better-sqlite3');
// const { query } = require('mongoose');
const db = new Database('test.db', {
    readonly: false,
    fielMustExist: false,
    timeout: 5000,
    verbose: console.log
});


// const query =  `
//     CREATE TABLE test(
//     id INTEGER NOT NULL,
//     name STRING NOT NULL,
//     username STRING NOT NULL UNIQUE
//     )
// `;

db.exec(query);

// INSERTING DATA
const data = [
    {name: "Arrehman", username: "lol"},
    {name: "Arrlift", username: "fitness"},
    {name: "freddy", username: "mameee"}
];

const Insertdata = db.prepare("INSERT INTO users (user,username) VALUE (?,?)");

data.forEach((user) => {
    Insertdata.run(user.name, user.username);
})

db.close();

// retrieving all the data
// const query = 'SELECT * FROM users';
// const users = db.prepare(query).all();

// console.log(users);

// const query = db.prepare('SELECT * FROM users WHERE id = ?').get(5);

// console.log(query);

app.get('/', (req,res) => { 
    const query = 'SELECT * FROM users';
    const users = db.prepare(query).all();
    res.json({ users: users});
})

