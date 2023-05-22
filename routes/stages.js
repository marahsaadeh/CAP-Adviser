const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
    res.render('stageSelect');
});
module.exports = router;