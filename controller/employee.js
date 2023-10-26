

// const data = {
//     sample: require("../models/employee.json"),
//     setEmployee: function (data) { this.sample = data }
// };

const Employee = require('../models/mongoos/EmployeeMongoos');

const get_all_employee = async(req, res) => {
    const employee = await Employee.find()
    res.json(employee);
}

const post_all_employee = async (req, res) => {


    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ "massage": "name email and Password is required" })
    }

    let result = await Employee.create({
        // id: data.sample[data.sample.length - 1].id + 1 || 1,
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password
    });

    // console.log(result);

    // data.setEmployee([...data.sample, newEmployee]);

    res.status(201).json(result);
}
const put_all_employee = async (req, res) => {

    // const employee = data.sample.find(emp => emp.id == parseInt(req.body.id));
    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(400).json({
            "massage": "this employee does not exist"
        })
    }

    if (req.body.name) employee.name = req.body.name;
    if (req.body.email) employee.email = req.body.email;
    if (req.body.password) employee.password = req.body.password;

    const result = await employee.save();


    // const filteredArray = data.sample.filter(emp => emp.id !== parseInt(req.body.id));
    // const unsortedArray = [...filteredArray, employee];
    // data.setEmployee(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    res.json(result);

}
const delete_all_employee = async (req, res) => {

    const employee = await Employee.findOne({ _id: req.body.id }).exec();

    if (!employee) {
        return res.status(400).json({
            "massage": "this employee does not exist"
        })
    }

    // await Employee.deleteOne( req.body.id ).exec();

    // const filteredArray = data.sample.filter(emp => emp.id !== parseInt(req.body.id));
    // data.setEmployee([...filteredArray]);
    let result = `delete complete ${employee.name}`; 
    res.json(result);
}
const get_id_all_employee = async (req, res) => {

    const employee = await Employee.findOne({ _id: req.params.id }).exec();

    if (!employee) {
        return res.status(400).json({
            "massage": "this employee does not exist"
        })
    }

    res.json(employee);
}


module.exports = {
    get_all_employee,
    post_all_employee,
    put_all_employee,
    delete_all_employee,
    get_id_all_employee
}