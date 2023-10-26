// const userDB = {
//     user : require("../models/user.json"),
//     setUsers : function (data){this.user = data}
// };
// const fsPromise = require('fs').promises;
// const fs = require('fs');
// const path = require('path');
//  ^ up code if for when you are not using db you are using file to same data

const userDB = require('../models/mongoos/userMongoos');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleAuth = async (req, res) => {
    // console.log(req.body);
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
        
        // console.log(foundUser)
        const roles = Object.values(foundUser.roles)
        
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

        // const otherUser = userDB.user.filter(person => person.userName !== foundUser.userName);
        // const currentUsers = { ...foundUser, refreshToken };
        // userDB.setUsers([...otherUser, currentUsers]);
        
        // await fsPromise.writeFile(
        //     path.join(__dirname, "..", 'models', 'user.json')
        //     , JSON.stringify(userDB.user)
        // );
        //  ^ up code if for when you are not using db you are using file to same data

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
    } else {
        res.status(400).json({"massage":`password does't match`})
    };

}


module.exports={handleAuth}