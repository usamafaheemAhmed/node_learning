
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


