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

app.post('/purchase', (req, res, next) => {
    const { numberOfTickets, entryDate, email } = req.body;
    const command = `INSERT INTO ticket VALUES ?`;
    let values = [];
    for(var i = 0; i < numberOfTickets; i++){
        let val = [null, 35, email, entryDate, null, null];
        values.push(val);
    }
    connection.query(command, [values], (err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.send("success" + result);
        }
    });
});

app.listen(4000, () => {
    console.log(`Server listening on port 4000`)
});