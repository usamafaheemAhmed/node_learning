const express = require('express');
const router = express.Router();
let employee_controller = require('../controller/employee');
const ROLES_LIST = require('../config/roles');
const verifyRoles = require('../middleWare/verifyRoles');



router.route("/")
    .get(employee_controller.get_all_employee)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employee_controller.post_all_employee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employee_controller.put_all_employee)
    .delete(verifyRoles(ROLES_LIST.Admin), employee_controller.delete_all_employee);

router.route("/:id")
    .get(employee_controller.get_id_all_employee);


module.exports = router;