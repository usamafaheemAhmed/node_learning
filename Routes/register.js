const express = require('express');
const router = express.Router();
let register_controller = require('../controller/user_register');

router.route("/")
    // .get(register_controller.get_all_employee)
    .post(register_controller.handleNewUser);
// .put(register_controller.put_all_employee)
// .delete(register_controller.delete_all_employee);

// router.route("/:id")
//     .get(employee_controller.get_id_all_employee);


module.exports = router;