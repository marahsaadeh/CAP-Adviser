const express = require("express");
const router = express.Router();
const userMarkController = require("../controllers/userMarkController");

router.get("/", userMarkController.getCourseMark);
router.post("/successful", userMarkController.CourseMark);



module.exports = router;









