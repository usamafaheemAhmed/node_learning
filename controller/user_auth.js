const userDB = {
    user : require("../models/user.json"),
    setUsers : function (data){this.user = data}
};
    

const fsPromise = require('fs').promises;

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const handleAuth = async (req, res) => {
    // console.log(req.body);
    const { userName, pwd } = req.body;

    if (!userName || !pwd) {
        return res.status(400).json({ "message": "UserName and Password is required" });
    }

    const foundUser = userDB.user.find(person => person.userName === userName);
    // console.log("ma error hun",foundUser);

    if (!foundUser) return res.status(400).json({ "message": "User does't exist" });
    // console.log("kunjum kunjum");
    
    const match = await bcrypt.compare(pwd, foundUser.password);
    
    if (match) {
        
        const accessToken = jwt.sign(
            { "username": foundUser.userName },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "20s"  // in production make it 5 min or 10min 
            }
        );

        const refreshToken = jwt.sign(
            { "username": foundUser.userName },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "30min"  // in production make it 5 min or 10min 
            }
        );

 



        res.status(201).json({"success":`user ${userName} logged in `})
    } else {
        res.status(400).json({"massage":`password does't match`})
    };

}


module.exports={handleAuth}