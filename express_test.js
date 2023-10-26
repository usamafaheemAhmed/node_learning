const express = require('express');
const app = express();

const path = require('path');
var cors = require('cors');
const verifyJWT = require('./middleWare/verifyJWT');
const { logger } = require('./middleWare/logEvents');
let errorHandler = require('./middleWare/errorHandler');
// cookie parser 
let cookieParser = require('cookie-parser');
// const { callbackify } = require('util');
// const fs = require('fs');

const ConnectDB = require('./config/dbConnect');
const { default: mongoose } = require('mongoose');

ConnectDB();



const PORT = process.env.PORT || 7000;
//logs who when and why api hits custom middle ware
app.use(logger);


//********************************* need work **************************************/
// White list who can access the backend
const whiteList = [
    "https://www.google.com",   // Your domain name
    "http://localhost:7000"    // Local development address
];

// CORS callback function
const corsOptions = {
    origin: (origin, callback) => {
        // console.log("Origin data:", origin);
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('You are not allowed to access the API'));
        }
    },
    optionsSuccessStatus: 200
}

// CORS origin resource server middleware
app.use(cors(corsOptions));
//********************************* need work **************************************/


// app.use(cors());


app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());


app.use(`/`, express.static(path.join(__dirname, "./public")));
app.use(`/subRoute/New-page`, express.static(path.join(__dirname, "./public")));

app.use('/register', require('./Routes/register'));
app.use('/auth', require('./Routes/auth'));
app.use('/refresh', require('./Routes/refresh'));
app.use('/logout', require('./Routes/logout'));



app.use(verifyJWT);



app.use('/subRoute', require('./Routes/new_test_route'));

app.use('/employee', require('./Routes/employee'));


app.get(`^/$|/index(.html)?|/usama`, (req, res) => {
    // res.sendFile('./view/index.html',{root:__dirname});
    // res.sendFile(path.join(__dirname,'view','usamabhai.jpg'));
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
})

app.get('/New-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/New-page.html');
})


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'view', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);


mongoose.connection.once("open", () => {
    console.log("MongoDB Connected!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

