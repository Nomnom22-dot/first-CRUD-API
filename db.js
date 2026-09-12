const Database = require('better-sqlite3')
const db = new Database('todos.db', {
    readonly: false,
    fileMustExist: false,
    timeout: 5000,
    verbose: console.log
});

db.prepare (`
    CREATE TABLE IF NOT EXISTS todos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    done Integer NOT null Default 0 )

    `).run();

    const row = db.prepare('SELECT COUNT (*) AS COUNT FROM todos').get();
    if(row.count === 0){
        const insertData = db.prepare('INSERT INTO todos (task, done) VALUES (?,?)');
        const data = [
            {task: "mAking an api", done: 0},
            {task: "Making Crud API", done: 0}
        ];
        data.forEach((item) => {
            insertData.run(item.task,item.done);
        });
    }



    module.exports = db;