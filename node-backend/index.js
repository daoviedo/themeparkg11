const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();


const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'themeparkg11',
    database: 'themepark'
});

connection.connect(err => {
    if(err) {
        console.log(err);
        return err;
    } else {
        console.log("Successfully connected to the database");
    }
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send("Server is live");
});

app.get('/purchase', (req, res, next) => {
    const command = `INSERT INTO ticket VALUES(null, 35, "2019-03-26", null, "2019-04-26", null); INSERT INTO ticket VALUES(null, 35, "2019-03-26", null, "2019-04-26", null);`;
    connection.query(command, (err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.send("success");
        }
    });
});

app.listen(4000, () => {
    console.log(`Server listening on port 4000`)
});