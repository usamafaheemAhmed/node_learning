const express = require('express');
const router = express.Router();
let register_controller = require('../controller/user_auth');

router.route("/")
    .post(register_controller.handleAuth);
    
 module.exports = router;