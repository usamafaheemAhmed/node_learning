const express = require('express');
const router = express.Router();
let refreshController = require('../controller/logoutController');

router.get('/', refreshController.handleLogout);

module.exports = router;