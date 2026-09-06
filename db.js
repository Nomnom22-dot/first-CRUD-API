const Database = require('better-sqlite3')
const db = new Database('todos.db')


db.prepare (`
    CREATE TABLE IF NOT EXISTS todos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    done Integer NOT null Default 0 )

    `).run();

const row = db.prepare('Select COUNT(*) AS count from todos').get();
if( row.count === 0){
    const insert = db.prepare('Insert into todos (task,done) values (?, ?)');
    insert.run('Learn Express', 0);
    insert.run('Build CRUD API', 0);


}

    // const statements = {
    //     getAll:db.prepare('Select * FROM tasks'),
    //     getById:db.prepare('Select * FROM tasks Where id = ?'),
    //     Insert:db.prepare('Insert Into tasks (title) VALUES (?)'),
    //     update:db.prepare('Update tasks set title = ? Where id = ?'),
    //     delete:db.prepare('Delete from tasks Where id = ?')
    // };

    module.exports = db;