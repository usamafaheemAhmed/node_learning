// const userDB = {
//     user: require("../models/user.json"),
//     setUsers: function (data) { this.user = data }
// };


// const fsPromise = require('fs').promises;
// const fs = require('fs');
// const path = require('path');
//  ^ up code if for when you are not using db you are using file to same data

const userDB = require('../models/mongoos/userMongoos');

const handleLogout = async (req, res) => {
    // when client also delete the accessToken or want to log out
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(204).json({ "message": "No content" });
    }
    console.log(cookies.jwt);

    const refreshToken = cookies.jwt;


    const foundUser = await userDB.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.status(204).json({ "message": "User does't exist" });
    }

    //Delete refresh token in db

    // const otherUser = userDB.user.filter(person => person.refreshToken !== foundUser.refreshToken);
    // const currentUsers = { ...foundUser, refreshToken: "" };
    // userDB.setUsers([...otherUser, currentUsers]);
    // await fsPromise.writeFile(
    //     path.join(__dirname, "..", 'models', 'user.json')
    //     , JSON.stringify(userDB.user)
    // );
    //  ^ up code if for when you are not using db you are using file to same data

    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log(result);
    

    res.clearCookie('jwt', { httpOnly: true, sameSite:"None", secure:true }); //secure :true -only server on https!
    res.sendStatus(204);



}


module.exports = { handleLogout };
