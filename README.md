# node_learning
node_learning


# Commands to read and write files with node.js

## Operating System ('os')
 const os = require('os');  to require System details we can get following details from this 

 console.log(os.type());
 console.log(os.version());
 console.log(os.homedir());
 console.log(os.hostname());
 console.log(os.cpus());
 console.log(os.freemem());
 console.log(os.getPriority());
 console.log(os.platform());
 console.log(os.release());
 console.log(os.tmpdir());
 console.log(os.totalmem());
 console.log(os.userInfo());
 console.log(os.machine());

## File Management ('fs')

const fs = require('fs'); to require file details we can perform following task

### read file
fs.readFile(path.join(__dirname,'models/readFile.txt'), 'utf-8' ,(err, data) => {
    if (err) throw err;
    console.log("read successfully = ",data);
})

### write file
fs.writeFile(path.join(__dirname,'models/writeFile.txt'), 'and i am your computer' ,(err) => {
    if (err) throw err;
    console.log("write fully");
})

### append file
fs.appendFile(path.join(__dirname, 'models/writeFile.txt'), ' you are very handsome boy', (err) => {
    if (err) throw err;
    console.log("append fully");
})

### renaming file 
fs.rename(path.join(__dirname, 'models/NewWriteFile.txt'), path.join(__dirname, 'models/writeFile.txt'), (err) => {
    if (err) throw err;
    console.log("append fully");
})

### note if address is not valid or file doesn't exist to get proper massage

process.on('uncaughtException', err => {
    console.log(`there was an error in ${err}`);
    process.exit(1);
})

### note path.join(__dirname, 'models/NewWriteFile.txt') 
this is another way to give file path and we can use this by requiring 
const path = require('path');

### to see full code please visit test.js and test2.js
[./test.js]
[./test2.js]

# Npm and Node packages


npm init // you can put -y if you want to avoid all Questions

to install package globally you can use -g like following 
npm i nodemon -g 

## Server creation and Handling 
we will import http which is default 

const http = require('http');

we will provide port for the node server to run 

//defining Port
const PORT = process.env.PORT || 7000;

### function implantation

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    let newPath;
    if (req.url === "/" || req.url === "index.html") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        newPath = path.join(__dirname, '../view', 'index.html');
        fs.readFile(newPath, 'utf-8', (err, data) => {
            res.end(data);
        })
    }

})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

# Express library
##  how to import or use 
const express = require('express');
const app = express();

## how to start express sever
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

## how to set routs 

app.get(`^/$|/index(.html)?|/usama`, (req, res) => {
    // res.sendFile('./view/index.html',{root:__dirname});
    // res.sendFile(path.join(__dirname,'view','usamabhai.jpg'));
    res.sendFile(path.join(__dirname,'view','index.html'));
})

app.get('/New-page(.html)?', (req, res) => {
    // if(!fs.existsSync(path.join(__dirname, 'view', 'newIndex.html'))){
    // fs.writeFile(path.join(__dirname, 'view', 'newIndex.html'), "i am usama Faheem");}
    res.sendFile(path.join(__dirname,'view','index.html'));
})


app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/New-page.html');
})





 