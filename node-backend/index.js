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
        console.log("Success");
    }
});


app.use(cors());
app.use(bodyParser.json());

app.listen(4000, () => {
    console.log(`Server listening on port 4000`)
});