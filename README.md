# node_learning
## Backend Important  
 Important topics one must cover while learning Backend Development
* File Managment
* Middle Wares
* Routs creation
* Role of file structure (recommended MVC Modle)
* User Authentication (note: Credentional checking only)
* User Authorization (note: wheather or not user is allowed to run access specific rout, api, and data)
* Role assing and restricting routs
* DB connection and how to create CRUD

# Commands to read and write files with node.js

## Operating System ('os')
 const os = require('os');  to require System details we can get following details from this 
```
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
```
## File Management ('fs')
```
const fs = require('fs'); 
```
to require file details we can perform following task

### read file
with this following code you can read any file you want in from node.js
```
fs.readFile(path.join(__dirname,'models/readFile.txt'), 'utf-8' ,(err, data) => {
    if (err) throw err;
    console.log("read successfully = ",data);
})
```
### write file
with this following code you can write any file you want in from node.js
```
fs.writeFile(path.join(__dirname,'models/writeFile.txt'), 'and i am your computer' ,(err) => {
    if (err) throw err;
    console.log("write fully");
})
```

### append file
with this following code you can Edit any file you want in from node.js
```
fs.appendFile(path.join(__dirname, 'models/writeFile.txt'), ' you are very handsome boy', (err) => {
    if (err) throw err;
    console.log("append fully");
})
```

### renaming file 
with this following code you can change name of any file you want in from node.js
```
fs.rename(path.join(__dirname, 'models/NewWriteFile.txt'), path.join(__dirname, 'models/writeFile.txt'), (err) => {
    if (err) throw err;
    console.log("append fully");
})
```

### note if address is not valid or file doesn't exist to get proper massage
```
process.on('uncaughtException', err => {
    console.log(`there was an error in ${err}`);
    process.exit(1);
})
```
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
```
const http = require('http');
```

we will provide port for the node server to run 

//defining Port
const PORT = process.env.PORT || 7000;

### function implantation
```
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
```
# Express library
##  how to import or use 
```
const express = require('express');
const app = express();
```

## how to start express sever
```
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```
## how to set routs 
```
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
```
## Middle Wares 

Error Handling / LogEvent 

we are creating a function to log if we get any errors in any api we can do same for the log event 
```
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    logEvents(`${req.method}\t${clientIP}\t${userAgent}\t${req.url}`, `errorlog.txt`);

    console.log(err.stack);
    res.status(500).send(err.message);
    next()
```

 ## Routs Creation
 
 We can creating a new  file to link it with serever with the help of express 

 * Server File 
```
app.use('/employee', require('./Routes/employee'));
```

 * New File 
 ```
 const express = require('express');
const router = express.Router();
let employee_controller = require('../controller/employee');
const ROLES_LIST = require('../config/roles');
const verifyRoles = require('../middleWare/verifyRoles');



router.route("/")
    .get(employee_controller.get_all_employee)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employee_controller.post_all_employee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employee_controller.put_all_employee)
    .delete(verifyRoles(ROLES_LIST.Admin), employee_controller.delete_all_employee);

router.route("/:id")
    .get(employee_controller.get_id_all_employee);


module.exports = router;
 ```


  ## Role of MVC
 
Modle View Controller provid us varius opertunities we can create new controllers for the functionality of api's and we can create more and link config fils, models, middleWares

Exmple of file structure following


~image


  ## Authentication
 
we can check wheather or not user enter correct Credentional

```
const { userName, pwd } = req.body;

    if (!userName || !pwd) {
        return res.status(400).json({ "message": "UserName and Password is required" });
    }

    const foundUser = await userDB.findOne({ userName: userName }).exec();
    // console.log("ma error hun",foundUser);

    if (!foundUser) return res.status(400).json({ "message": "User does't exist" });
    // console.log("kunjum kunjum");
    
    const match = await bcrypt.compare(pwd, foundUser.password);
    
    if (match) {
        
```

  ## Authorization

we can check wheather or not user is allowed to access perticular api of not
### Pakages
```
"bcrypt": "^5.1.1",
"cookie-parser": "^1.4.6",
"dotenv": "^16.3.1",
"jsonwebtoken": "^9.0.2",
```
we create 2 Tokens first accessToken and second RefreshToken 

```
  //saving token
        const accessToken = jwt.sign(
            {
                "Userinfo": {
                    "username": foundUser.userName,
                    "roles":roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "5min"  // in production make it 5 min or 10min 
            }
            
        );

                    
        const refreshToken = jwt.sign(
            { "username": foundUser.userName },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "30min"  // in production make it 5 min or 10min 
            }
        );
 foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: "None",secure: true,
            // maxAge: 24 * 60 * 60 * 1000
        });
        
        // res.status(201).json({"success":`user ${userName} logged in `})
        res.status(201).json({ accessToken });
```
* middleWare 
```
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ "message": "you don't have header authHeader" })
    // console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded.Userinfo.username;
            req.roles = decoded.Userinfo.roles;
            next();
        }
    )
}

module.exports = verifyJWT;
```
  ## Roles 
 we encripting roles of user in token
```
    const roles = Object.values(foundUser.roles)
```

## Role middleWare
```
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        console.log(req.roles);
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        // console.log(rolesArray);
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles
```

## DB connection

we can create online db but you can just connect with downloaded one like following 
```

const { default: mongoose } = require("mongoose");
// const Mongoose = require("mongoose");
const url = "mongodb://127.0.0.1/FirstDb";

const ConnectDB = async () => {
    try {
        await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = ConnectDB


```
* also add this in server
```

mongoose.connection.once("open", () => {
    console.log("MongoDB Connected!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});


```