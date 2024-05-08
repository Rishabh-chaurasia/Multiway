const express = require('express');
const fs = require('fs');
const url = require('url');
const app = express();
const crypto = require('crypto');
const path = require('path');
const ejs = require('ejs'); // Correct import statement

const mysql = require('mysql2');
const multer = require('multer');  //for image upload
// const { resolve } = require('path/posix');
const mymulter = multer();


// Parse URL-encoded bodies (as used in the HTML form)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');

const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname)));        // help to follow path of directory, here used in image upload
app.use(express.json());


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    password: "123456",
    database: "multiway"
});


// home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(8080, () => {
    console.log(`Server running on http://localhost:8080`);
});



// login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// 
app.get('/book', (req, res) => {
    res.sendFile(__dirname + '/public/book.html');
});
// 
app.get('/track', (req, res) => {
    console.log(100);
    let userid33 = req.cookies.userid;
    console.log(11);
    if (userid33) {
        con.connect(function (err) {
            if (err) throw err;
            let sq12 = 'select * from track where userid = ?;';
            con.query(sq12, [userid33], function (err, result, fields) {
                if(err) throw err;

                if(result.length > 0){
                    
                    let tr = ``;
                                for(let i = 0; i < result.length; i++){
                                    tr += `<tr>
                                    <td>${result[0].trackingId}</td>
                                    <td>${result[i].currentLocation}</td>
                                    <td>${result[i].status}</td>
                                    <td>${result[i].expectedDeliveryDate}</td>
                                   
                                  </tr>`;
                                }
                                res.render('track', tr);
    
                }
                else{
                    res.render('track', {tr : ""});
                }
                   
                
            });
        });
    }
    else {
        res.redirect('/');
    }
});
// 

// 
app.get('/history', (req, res) => {
    res.sendFile(__dirname + '/public/history.html');
});



//login form when submibtn click

app.post('/login', mymulter.none(), (req, res) => {

    let data = req.body;
    const email = data.email;
    const password = crypto.createHash('sha256').update(data.password).digest('hex');
    con.connect(function (err) {
        if (err) throw err;

        let sql22 = `select * from signup where email = ? order by sign_date desc, sign_time desc;`;

        con.query(sql22, [email], (err, result) => {
            if (err) throw err;


            if(result.length == 0){
                res.json({ uniqueEmail: false });
            }
            else{
                if (password == result[0].password) {
                    let lcookie = result[0].userid;
                    res.json({ uniqueEmail: true, userid: lcookie });
                }
                else {
                    res.json({ uniqueEmail: false, password: false });
                }
            }
        });
    });
});


//signup form when submit btn click

app.post('/signup', mymulter.none(), (req, res) => {

    let data33 = req.body;
    const email33 = data33.email;
    const password33 = crypto.createHash('sha256').update(data33.confirm_password).digest('hex');
    console.log(email33);
    console.log(password33);

    con.connect(function (err) {
        if (err) throw err;

        let sql33 = `select * from signup where email = ? order by sign_date desc, sign_time desc;`;
        con.query(sql33, [email33], (err, result) => {
            if (err) throw err;
            console.log('a1');
            if (result.length == 0) {
                // generate userid
                const min = 100000;
                const max = 999999;
                const temp_code = Math.floor(Math.random() * (max - min + 1)) + min;
                var code2 = email33 + password33 + temp_code;
                var userid1 = crypto.createHash('sha256').update(code2).digest('hex');

                var data12 = [userid1, data33.name, data33.phone, email33, password33];

                var sql = `insert into signup ( userid, name, phone, email, password) values (?);`;
                con.query(sql, [data12], function (err, result) {
                    console.log('a3');
                    if (err) throw err;
                    console.log('a4');

                    res.json({ uniqueEmail: true, userid: userid1 });

                });
                console.log('a8');
            }
            else if (result.length > 0) {
                console.log('a9');
                res.json({ uniqueEmail: false });

            }
        });
    });
});

