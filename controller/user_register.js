// const userDB = {
//     user: require("../models/user.json"),
//     setUsers: function (data) { this.user = data }
// };
// const fsPromise = require('fs').promises;
// const fs = require('fs');
// const path = require('path');
//  ^ up code if for when you are not using db you are using file to same data

const User = require('../models/mongoos/userMongoos');

const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    // console.log(req.body);
    const { userName, pwd } = req.body;
    if (!userName || !pwd) {
        return res.status(400).json({ "message": "UserName and Password is required" });
    }

    // const duplicate = userDB.user.find(person => person.userName === userName);
    //  ^ up line code if for when you are not using db you are using file to same data

    const duplicate = await User.findOne({ userName: userName }).exec();
    if (duplicate) return res.status(400).json({ "message": "User already exist" });
    // console.log("kunjum kunjum");

    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);

        const result = await User.create( {
            "userName": userName,
            "roles": req.body.roles || "",
            "password": hashedPwd
        })

        // console.log(result);
        // userDB.setUsers([...userDB.user, newUser]);  
        // console.log(userDB.user);
        // await fsPromise.writeFile(
        //     path.join(__dirname, "..", 'models', 'user.json')
        //     , JSON.stringify(userDB.user)
        // );
        //  ^ up line code if for when you are not using db you are using file to same data


        res.status(201).json({ "success": `New user ${userName} created` })

    } catch (error) {
        res.status(500).json({ "message": error.message });
    }

}


module.exports = { handleNewUser }