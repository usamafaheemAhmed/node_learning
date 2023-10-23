const userDB = {
    user : require("../models/user.json"),
    setUsers : function (data){this.user = data}
};
    

const fsPromise = require('fs').promises;
const fs = require('fs');
const path = require('path');

const bcrypt = require('bcrypt');


const handleAuth = async (req, res) => {
    // console.log(req.body);
    const { userName, pwd } = req.body;

    if (!userName || !pwd) {
        return res.status(400).json({ "message": "UserName and Password is required" });
    }

    const duplicate = userDB.user.find(person => person.userName === userName);
    // console.log("ma error hun",duplicate);

    if (!duplicate) return res.status(400).json({ "message": "User does't exist" });
    // console.log("kunjum kunjum");
    
    const match = await bcrypt.compare(pwd, duplicate.password);
    
    if (match) {
        res.status(201).json({"success":`user ${userName} logged in `})
    } else {
        res.status(400).json({"massage":`password does't match`})
    };

}


module.exports={handleAuth}