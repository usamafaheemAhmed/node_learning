const mongoose = require("mongoose")

const usamaSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true, "please enter name"]
    },
    salary: {
        type: Number,
        default:0,
    },
    email: {
        type: String,
        required:[true,"Please enter email"]
    },
    phone: {
        type: String,
        required: [false],
        default:"xxxx-xxxxxxx"
    }
}, {
    timestamps:true
}

)

const usama_Model = mongoose.model("usama_Model", usamaSchema);
module.exports = usama_Model;