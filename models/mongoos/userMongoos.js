const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    roles: {
        User: {
            type:Number,
            default:2001
        },
        Editor: {
            type:Number,
            required:false,
        },
        Admin: {
            type:Number
        }
    },
    refreshToken: {
        type: String,
        required:false
    }
});

module.exports = Mongoose.model('User', userSchema);
