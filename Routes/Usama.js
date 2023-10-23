const Express = require("express");
const MyRouter = Express.Router();

// const ClientDetails = require("../../Models/PersonalDetails/Client");
// const ClientSchema = require("../../Schema/PersonalDetails/Client");

MyRouter.get("/", async (req, res) => {
    console.log("i am usama")
});



module.exports = MyRouter;