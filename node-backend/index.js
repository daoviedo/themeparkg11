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
            return res.send(err);
        }
        else{
            const idnumlookup = result.insertId - 1;
            const returnCommand = `SELECT Ticket_ID FROM ticket WHERE Ticket_ID > ${idnumlookup} && Purchase_Email = "${email}"`;
            connection.query(returnCommand, (err1, result2) => {
                if(err1){
                    return res.send(err1);
                }
                else{
                    return res.json({
                        results: result2
                    });
                }
            });
        }
    });
});

app.patch('/entrance-scan', (req, res, next) => {
    const { ticketID } = req.body;
    let date = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"}).split(", ")[1];

    let testd = "4:30:45 PM"
        date1 = (parseInt(testd.split(":")[0])+ 12) + ":" +testd.substring(testd.indexOf(':')+1).split(", ")[1].split(" ")[0];
        console.log(date1);

    if(date.includes("PM")){
        date = (parseInt(date.split(":")[0])+ 12) + ":" +date.substring(date.indexOf(':')+1);
    }
    else{
        date = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"}).split(", ")[1].split(" ")[0];
    }
    const command = `UPDATE ticket SET Entry_Time='${date}' WHERE Ticket_ID=${ticketID}`;
    connection.query(command, (err, result) => {
        if(err){
            return res.json({
                error: err, 
                status: result
            });
        }
        else{
            return res.json({
                error: err, 
                status: result
            });
        }
    });
});

app.listen(4000, () => {
    console.log(`Server listening on port 4000`)
});