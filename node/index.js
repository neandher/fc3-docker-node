const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

let sql = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`
connection.query(sql)

sql = `INSERT INTO people(name) values('Neandher')`
connection.query(sql)

let peoples = [];

sql = `SELECT id,name FROM people`
connection.query(sql, (error, results, fields) => {
    peoples = results
})

connection.end()

app.get('/', (req,res) => {
    let output = '<h1>Full Cycle Rocks!</h1><br>';

    output += '<ul>'
    peoples.forEach(e => {
        output += '<li>' + e.name + '</li>'
    });
    output += '</ul>'

    res.send(output)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})