const express = require("express");
const router = express.Router();
const User = require("./models/user");
const QuestionsValue = require("./models/questionsValue");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}).select("email full_name gender student_id enrolled languages github_account password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/values", async (req, res) => {
  try {
    const values = await QuestionsValue.find({}).select("questions");
    res.json(values);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
