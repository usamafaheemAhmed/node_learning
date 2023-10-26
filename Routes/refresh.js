const express = require('express');
const router = express.Router();
let refreshController = require('../controller/refreashtokenController');

router.get('/',refreshController.handleRefreshToken);
    
 module.exports = router;