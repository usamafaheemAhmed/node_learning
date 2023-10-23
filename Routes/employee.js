const express = require('express');
const router = express.Router();
let employee_controller = require('../controller/employee');

router.route("/")
    .get(employee_controller.get_all_employee)
    .post(employee_controller.post_all_employee)
    .put(employee_controller.put_all_employee)
    .delete(employee_controller.delete_all_employee);

router.route("/:id")
    .get(employee_controller.get_id_all_employee);

    
 module.exports = router;