const express = require("express");
const router = express.Router();
const s1ResultController = require("../controllers/stage1ResultController");

router.get("/", s1ResultController.getS1ResultPage);
router.post("/", s1ResultController.postS1ResultPage);

module.exports = router;
