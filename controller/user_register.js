const userDB = {
    user : require("../models/user.json"),
    setUsers : function (data){this.user = data}
};
    

const fsPromise = require('fs').promises;
const fs = require('fs');
const path = require('path');

const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    // console.log(req.body);
    const { userName, pwd } = req.body;

    if (!userName || !pwd) {
        return res.status(400).json({ "message": "UserName and Password is required" });
    }

    const duplicate = userDB.user.find(person => person.userName === userName);
    // console.log("ma error hun",duplicate);

    if (duplicate) return res.status(400).json({ "message": "User already exist" });
    // console.log("kunjum kunjum");

    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);

        const newUser = {
            "userName": userName,
            "password": hashedPwd,
        }

        // console.log(newUser);

        userDB.setUsers([...userDB.user, newUser]);

        // console.log(userDB.user);
        
        await fsPromise.writeFile(
            path.join(__dirname, "..", 'models', 'user.json')
            , JSON.stringify(userDB.user)
        );


        res.status(201).json({"success":`New user ${userName} created`})

    } catch (error) {
        res.status(500).json({ "message": error.message });
    }

}


module.exports={handleNewUser}