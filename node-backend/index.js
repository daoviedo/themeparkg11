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
    if (err) {
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

app.post('/getEmployeeInfo', (req, res, next) => {
    const {
        userID
    } = req.body;
    const command = `SELECT Name, FirstName, LastName FROM deptEmployeeInfo WHERE EmployeeID=${userID}`;
    connection.query(command, (err, result) => {
            return res.json({
                data: result
            });
    });
});

app.post('/getDepartmentID', (req, res, next) => {
    const {
        userID
    } = req.body;
    const command = `SELECT dID FROM department_employee WHERE eID=${userID}`;
    connection.query(command, (err, result) => {
        return res.json({
            departmentID: result
        })
    })
})

app.post('/changePassword', (req, res, next) => {
    const {
        userID,
        password,
        newPassword
    } = req.body;
    const command = `SELECT * FROM useraccount WHERE userID=${userID} AND password='${password}'`;
    connection.query(command, (err, result) => {
        if (result.length === 0) {
            return res.json({
                status: 0
            });
        } else {
            const updateCommand = `UPDATE useraccount SET password='${newPassword}' WHERE userID=${userID} AND password='${password}'`;
            connection.query(updateCommand, (err, result) => {
                return res.json({
                    status: 1,
                });
            });
        }
    });
});


app.post('/login', (req, res, next) => {
    const {
        userID,
        password
    } = req.body;
    const command = `SELECT * FROM useraccount WHERE username='${userID}' AND password='${password}'`;
    connection.query(command, (err, result) => {
        if (result.length === 0) {
            return res.json({
                status: 0
            });
        } else {
            return res.json({
                status: 1,
                userID: result[0].userID
            });
        }
    });
});

app.post('/purchase', (req, res, next) => {
    const {
        numberOfTickets,
        entryDate,
        email
    } = req.body;
    const command = `INSERT INTO ticket VALUES ?`;
    let values = [];
    for (var i = 0; i < numberOfTickets; i++) {
        let val = [null, 35, email, entryDate, null, null];
        values.push(val);
    }
    connection.query(command, [values], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            const idnumlookup = result.insertId - 1;
            const returnCommand = `SELECT Ticket_ID FROM ticket WHERE Ticket_ID > ${idnumlookup} && Purchase_Email = "${email}"`;
            connection.query(returnCommand, (err1, result2) => {
                if (err1) {
                    return res.send(err1);
                } else {
                    return res.json({
                        results: result2
                    });
                }
            });
        }
    });
});

app.patch('/entrance-scan', (req, res, next) => {
    const {
        ticketID
    } = req.body;
    let TDate = new Date().toLocaleString("fr-CA", {
        timeZone: "America/Chicago"
    }).split(" ")[0];
    initCommand = `SELECT Ticket_ID, Ticket_Valid_On, Entry_Time FROM ticket WHERE Ticket_ID=${ticketID}`;
    connection.query(initCommand, (retErr, retOutput) => {
        //let TicketDate = retOutput[0].Ticket_Valid_On.toLocaleString("fr-CA").split(" ")[0];
        if (retOutput.length === 0) {
            return res.json({
                error: retErr,
                status: 0
            });
        } else if (retOutput[0].Entry_Time !== null) {
            return res.json({
                error: retErr,
                status: 2
            });
        } else if (retOutput[0].Ticket_Valid_On.toLocaleString("fr-CA").split(" ")[0] !== TDate) {
            return res.json({
                error: retErr,
                status: 1
            });
        } else {
            let date = new Date().toLocaleString("en-US", {
                timeZone: "America/Chicago"
            }).split(", ")[1];
            let hour = parseInt(date.split(":")[0]);
            if (date.includes("PM") && hour !== 12) {
                date = ((hour + 12) + ":" + date.substring(date.indexOf(':') + 1)).split(" ")[0];
            } else if (date.includes("AM") && hour === 12) {
                date = (00 + ":" + date.substring(date.indexOf(':') + 1)).split(" ")[0];
            } else {
                date = new Date().toLocaleString("en-US", {
                    timeZone: "America/Chicago"
                }).split(", ")[1].split(" ")[0];
            }
            const command = `UPDATE ticket SET Entry_Time='${date}' WHERE Ticket_ID=${ticketID}`;
            connection.query(command, (err, result) => {
                return res.json({
                    error: err,
                    status: 3
                });
            });
        }
    });
});

app.get('/concessionlist', (req, res, next) => {
    const Qcommand = `SELECT * FROM concession_stand`;
    connection.query(Qcommand, (err, result) => {
        return res.json({
            diningList: result
        });
    })
});


app.get('/ridelist', (req, res, next) => {
    const Qcommand = `SELECT * FROM ride`;
    connection.query(Qcommand, (err, result) => {
        return res.json({
            rideList: result
        });
    })
});

app.post('/new-ride', (req, res, next) => {
    const {
        rideName,
        runsBeforeMaintenance,
        numSeats
    } = req.body;
    const Qcommand = `INSERT INTO ride (RideName, Runsbeforemaintenance, NumSeats) VALUES('${rideName}', ${runsBeforeMaintenance}, ${numSeats})`;
    connection.query(Qcommand, (err, result) => {
        if (err) {
            return res.json({
                status: err
            });
        } else {
            return res.json({
                status: 1
            });
        }
    })
});

app.post('/ridescan', (req, res, next) => {
    const {
        rideID,
        ticketID
    } = req.body;
    const Qcommand = `INSERT INTO ticketscan (RideID, TicketID) VALUES(${rideID},${ticketID})`;
    connection.query(Qcommand, (err, result) => {
        if (err) {
            return res.json({
                status: 0
            });
        } else {
            return res.json({
                status: 1
            });
        }
    })
});

app.get('/maintenance_needed', (req, res, next) => {
    const Ncommand = `SELECT OrderID,DateCreated,DateCompleted,Rides_ID,RideName,Employee_ID,FirstName,LastName,Maintenance_Desc,CompletedBy_ID FROM employee AS E, maintenance_order AS M, ride AS R WHERE M.Employee_ID=E.EmployeeID AND M.Rides_ID=R.RideID AND DateCompleted IS NULL`;
    connection.query(Ncommand, (err, result) => {
        return res.json({
            mainList: result
        });
    })
});

app.post('/newmaintenance', (req, res, next) => {
    const {
        rideID,
        employeeID,
        description
    } = req.body;
    const Qcommand = `INSERT INTO maintenance_order (OrderID, Rides_ID, Employee_ID, Maintenance_Desc) VALUES(null, ${rideID}, ${employeeID}, '${description}')`;
    connection.query(Qcommand, (err, result) => {
        if (err) {
            return res.json({
                status: 0
            });
        } else {
            return res.json({
                status: 1
            });
        }
    })
});

app.patch('/fixmaintenance', (req, res, next) => {
    const {
        orderID,
        completedBy
    } = req.body;
    const Qcommand = `UPDATE maintenance_order SET DateCompleted=CURRENT_TIMESTAMP, CompletedBy_ID=${completedBy} WHERE OrderID=${orderID}`;
    connection.query(Qcommand, (err, result) => {
        if (err) {
            return res.json({
                status: 0
            });
        } else {
            return res.json({
                status: 1
            });
        }
    });
});

app.get('/getallemp/:deptID', (req, res, next) => {
    const deptID = req.params.deptID;
    connection.query(`SELECT * FROM deptEmployeeInfo WHERE DeptID=${deptID}`, (err, result) => {
        if (err) {
            return res.json({
                status: err
            });
        } else {
            return res.json({
                status: result
            });
        }
    });
});
app.get('/getallemps', (req, res, next) => {
    connection.query(`SELECT * FROM deptEmployeeInfo`, (err, result) => {
        if (err) {
            return res.json({
                status: err
            });
        } else {
            return res.json({
                status: result
            });
        }
    });
});

app.get('/departmentlist', (req, res, next) => {
    const Qcommand = 'Select * FROM department';
    connection.query(Qcommand, (err, result) => {
        return res.json({
            dList: result
        });
    })
});
app.get('/emplist', (req, res, next) => {
    const Qcommand = 'Select * FROM deptEmployeeInfo';
    connection.query(Qcommand, (err, result) => {
        return res.json({
            employeeList: result
        });
    })
});

app.post('/newemployee', (req, res, next) => {
    const {
        dept,
        firstname,
        lastname
    } = req.body;
    const Qcommand = `CALL newEmployee(${dept}, '${firstname}', '${lastname}')`;
    connection.query(Qcommand, (err, result) => {
        if (err) {
            return res.json({
                status: 0
            });
        } else {
            return res.json({
                status: 1
            });
        }
    })
});

app.get('/rainout', (req, res, next) => {
    const qcommand = `SELECT * FROM rainout WHERE rainoutDate=CURRENT_DATE`;
    connection.query(qcommand, (err, result) => {
        return res.json({
            rainedOut: result.length
        });
    })
});

app.get('/nrainout', (req, res, next) => {
    connection.query(`INSERT INTO rainout VALUES(CURRENT_DATE)`, (err1, res2) => {
        return res.json({
            rainedOut: 1
        });
    });
});


app.get('/selyear', (req, res, next) => {
    connection.query(`SELECT year FROM analytics GROUP BY year`, (err, result) => {
        return res.json({
            years: result
        });
    });
});

app.get('/selmonth/:year', (req, res, next) => {
    const year = req.params.year;
    connection.query(`SELECT MONTH(datetick), month FROM analytics WHERE year=${year} GROUP BY MONTH(datetick),month ORDER BY MONTH(datetick)`, (err, result) => {
        return res.json({
            data: result
        });
    });
});

app.get('/yearanalytics', (req, res, next) => {
    connection.query(`SELECT year,SUM(tickets_sold) tickets_sold FROM analytics GROUP BY year`, (err, result) => {
        return res.json({
            data: result
        });
    });
});

app.get('/monthanalytics/:year', (req, res, next) => {
    const year = req.params.year;
    connection.query(`SELECT MONTH(datetick),month, SUM(tickets_sold) tickets_sold FROM analytics WHERE year=${year} GROUP BY MONTH(datetick), month ORDER BY MONTH(datetick)
    `, (err, result) => {
        return res.json({
            data: result
        });
    });
});

app.get('/dayanalytics/:year/:month', (req, res, next) => {
    const year = req.params.year;
    const month = req.params.month;
    connection.query(`SELECT day, CONCAT(MONTH(datetick), '/', day) dayname,SUM(tickets_sold) tickets_sold FROM analytics WHERE year=${year} AND month='${month}' GROUP BY day, dayname ORDER BY day
    `, (err, result) => {
        return res.json({
            data: result
        });
    });
});

// Gets available year list from server.
app.get('/rideyearlist', (req, res, next) => {
    connection.query(`SELECT YEAR(RideTime) AS year FROM ride_analytics GROUP BY YEAR(RideTime) ORDER BY YEAR(RideTime)`, (err, result) => {
        return res.json({
            years: result
        });
    });
});

// Gets available month list per year from server.
app.get('/ridemonthlist/:year', (req, res, next) => {
    const year = req.params.year;
    connection.query(`SELECT MONTH(RideTime) as monthNumber, month FROM ride_analytics WHERE year=${year} GROUP BY MONTH(RideTime), month ORDER BY MONTH(RideTime)`, (err, result) => {
        return res.json({
            data: result
        });
    });
});

// Gets total rides per attraction per year.
app.get('/ridestotalyear', (req, res, next) => {
    connection.query(`SELECT RideName, year, sum(RideCounts) RideCounts from ride_analytics group by RideName, year`, (err, result) => {
        return res.json({
            data: result
        });
    });
});

// Gets total rides per attraction per months in a year.
app.get('/ridemonthinyear', (req, res, next) => {
    connection.query(`SELECT RideName, year, MONTH(RideTime) as monthNumber, month, sum(RideCounts) RideCounts from ride_analytics group by RideName, year, MONTH (RideTime), month ORDER BY MONTH(RideTime)`, (err, result) => {
        return res.json({
            data: result
        });
    });
});

// Gets total rides per attraction per month and day
app.get('/rideanalytics/:year/:month', (req, res, next) => {
    const year = req.params.year;
    const month = req.params.month;
    connection.query(`SELECT RideName, year, month, day, sum(RideCounts) RideCounts FROM ride_analytics WHERE year= ${year} AND month='${month}' group by RideName, year, month, day ORDER BY day asc`, (err, result) => {
        return res.json({
            data: result
        });
    });
});

app.get('/newridepivot', (req, res, next) => {
    connection.query(`SELECT RideName FROM ride`, (err, result) => {
        let pivotCommand = `SELECT year, month, MONTH(RideTime) as MonthNumber,\n`;
        result.forEach((element) => {
            console.log(element);
            pivotCommand += `SUM(RideName='${element.RideName}')AS '${element.RideName}',\n`
        });
        pivotCommand = pivotCommand.replace(/,\s*$/, "");
        pivotCommand += `FROM ride_analytics GROUP BY year, month , MONTH(RideTime)
          ORDER BY MONTH(RideTime) ASC`
        connection.query(pivotCommand, (err, result) => {
            return res.json({
                data: result
            });
        });
    });
});

app.get('/standmenu/:sID', (req, res, next) => {
    const id = req.params.sID
    const Qcommand = `Select * FROM standMenu WHERE Stand_ID=${id}`
    connection.query(Qcommand, (err, result) => {
        return res.json({
            itemList: result
        });
    })
});

app.get('/ridesbetween/:from&:to', (req, res, next) => {
    const from = req.params.from;
    const to = req.params.to;
    connection.query(`SELECT * FROM themepark.ride_analytics WHERE RideTime BETWEEN '${from}' AND '${to}';` , (err, result) => {
        return res.json({
            ridesBetween: result
        });
    })
});

app.get('/ticketsbetween/:from&:to', (req, res, next) => {
    const from = req.params.from;
    const to = req.params.to;
    connection.query(`SELECT * FROM themepark.analytics WHERE datetick BETWEEN '${from}' AND '${to}';` , (err, result) => {
        return res.json({
            ticketsBetween: result
        });
    })
});

app.get('/rainoutsbetween/:from&:to', (req, res, next) => {
    const from = req.params.from;
    const to = req.params.to;
    connection.query(`SELECT * FROM themepark.rainout WHERE rainoutDate BETWEEN '${from}' AND '${to}';` , (err, result) => {
        return res.json({
            rainBetween: result
        });
    })
});

app.get('/maintenancebetween/:from&:to', (req, res, next) => {
    const from = req.params.from;
    const to = req.params.to;
    connection.query(`SELECT * FROM themepark.maintenance_order WHERE DateCreated BETWEEN '${from}' AND '${to}';` , (err, result) => {
        return res.json({
            maintBetween: result
        });
    })
});

app.get('/itemlist', (req, res, next) => {
    const Qcommand = `Select * FROM concession_item_lookup`
    connection.query(Qcommand, (err, result) => {
        return res.json({
            itemList: result
        });
    })
});

app.listen(4000, () => {
    console.log(`Server listening on port 4000`)
});