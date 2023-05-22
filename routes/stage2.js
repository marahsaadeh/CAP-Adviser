const express = require('express');
const stageTwoConroller=require("../controllers/stageTwoController");
const router = express.Router();

// router.get('/general',stageTwoConroller.getGeneral);


router.get('/',stageTwoConroller.getStage2);

router.post('/',stageTwoConroller.postStage2);


module.exports = router;