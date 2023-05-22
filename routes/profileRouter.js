const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/", profileController.getProfilePage);
router.post("/", profileController.postProfilePage);

module.exports = router;
