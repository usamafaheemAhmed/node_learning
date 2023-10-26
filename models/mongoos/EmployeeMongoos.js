const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
});

module.exports = Mongoose.model('Employee', employeeSchema);
