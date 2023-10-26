// const userDB = {
//     user: require("../models/user.json"),
//     setUsers: function (data) { this.user = data }
// };
// const fsPromise = require('fs').promises;
//  ^ up code if for when you are not using db you are using file to same data


const userDB = require('../models/mongoos/userMongoos');



const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async(req, res) => {

    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(400).json({ "message": "you don't have cookies" });
    }
    // console.log(cookies.jwt);

    const refreshToken = cookies.jwt;

    const foundUser = await userDB.findOne({ refreshToken:refreshToken }).exec();
    console.log("ma error hun",foundUser);

    if (!foundUser) return res.status(400).json({ "message": "User does't exist" });
    // console.log("kunjum kunjum");

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.userName !== decoded.username) return res.sendStatus(403);

            const roles = Object.values(foundUser.roles)

            const accessToken = jwt.sign(
                {
                    "Userinfo": {
                        "username": decoded.userName,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5min' }
            );
            res.json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken }
