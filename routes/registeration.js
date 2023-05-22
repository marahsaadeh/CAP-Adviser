const express = require("express");
const router = express.Router();
const registerationController = require("../controllers/registerationController");

router.get("/", registerationController.getRegisterationPage);
router.post("/", registerationController.postRegisterationPage);

module.exports = router;
