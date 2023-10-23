const express = require('express');

const router = express.Router();

const path = require('path');



router.get(`^/$|/index(.html)?|/usama`, (req, res) => {
    res.sendFile(path.join(__dirname,"..",'view','usamabhai.jpg'));
})

router.get('/New-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,"..",'view','index.html'));
})


module.exports = router;