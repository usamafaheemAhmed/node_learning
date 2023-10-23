

const data = {
sample : require("../models/employee.json"),
setEmployee : function (data){this.sample = data}
};

const get_all_employee = (req, res) => {
    res.json(data.sample);
}

const post_all_employee = (req, res) => {

    let newEmployee = {
        id: data.sample[data.sample.length - 1].id + 1 || 1,
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password
    }

    if (!newEmployee.email || !newEmployee.name || !newEmployee.password) {
        return res.status(400).json({"massage":"name email and Password is required"})
    }

    data.setEmployee([...data.sample, newEmployee]);

    res.status(201).json(data.sample);
}
const put_all_employee = (req, res) => {

    const employee = data.sample.find(emp => emp.id == parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({
            "massage":"this employee does not exist"
        })
    }

    if (req.body.name) employee.name = req.body.name; 
    if (req.body.email) employee.email = req.body.email; 
    if (req.body.password) employee.password = req.body.password; 

    const filteredArray = data.sample.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployee(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    res.json(data.sample);

}
const delete_all_employee = (req, res) => {
    const employee = data.sample.find(emp => emp.id == parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({
            "massage":"this employee does not exist"
        })
    }
    const filteredArray = data.sample.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployee([...filteredArray]);
    res.json(data.sample);
}
const get_id_all_employee = (req, res) => {
    const employee = data.sample.find(emp => emp.id == parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({
            "massage":"this employee does not exist"
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