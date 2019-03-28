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

function fixMonth(date){
    if(date.getMonth()+1 < 10){
        return "0" + (date.getMonth() +1);
    }
    else{
        return date.getMonth() + 1;
    }
}

app.patch('/entrance-scan', (req, res, next) => {
    const { ticketID } = req.body;
    let LoadingDate = new Date().toLocaleString({timeZone: "America/Chicago"}).split(", ")[0];
    let TDate = new Date().toLocaleString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"});
    console.log(TDate);
    //let LoadingDate = new Date();
    //LoadingDate = LoadingDate.getFullYear() + '-' + (fixMonth(LoadingDate)) + '-' + LoadingDate.getDate();
    initCommand = `SELECT Ticket_ID, Ticket_Valid_On, Entry_Time FROM ticket WHERE Ticket_ID=${ticketID}`;
    connection.query(initCommand, (retErr, retOutput) => {
        if(retOutput.length === 0){
            return res.json({
                error: retErr,
                status: 0
            });
        }
        /*
        else if(retOutput.Ticket_Valid_On.split("T")[0] !== LoadingDate){
            return res.json({
                error: retErr,
                status: 1
            });
        }
        */
        else if(retOutput.Entry_Time !== null){
            return res.json({
                error: retErr,
                status: 2
            });
        }
        else{
            return res.json({
                error: retErr,
                status: 3
            });
        }
    });
    /*
    let date = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"}).split(", ")[1];
    let hour = parseInt(date.split(":")[0]);
    if(date.includes("PM") && hour !== 12){
        date = ((hour + 12) + ":" + date.substring(date.indexOf(':')+1)).split(" ")[0];
    }
    else if(date.includes("AM") && hour === 12){
        date = (00 + ":" + date.substring(date.indexOf(':')+1)).split(" ")[0];
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
    */
});

app.listen(4000, () => {
    console.log(`Server listening on port 4000`)
});