const express = require("express");
const router = express.Router();
const usergradepController = require("../controllers/usergradepController");

router.get("/",usergradepController.getusergradepPage);
router.post("/successful", usergradepController.postusergradepPage);

module.exports = router;
