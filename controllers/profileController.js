const User = require("../models/user");

exports.postProfilePage = async (req, res) => {
  try {
    const userId = req.session.userId;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.email = req.body.email || user.email;
    user.full_name = req.body.full_name || user.full_name;

    user.gender = req.body.gender || user.gender || "";
    user.birthdate = req.body.birthdate || user.birthdate|| "";
    user.student_id = req.body.student_id || user.student_id;
    user.enrolled = req.body.enrolled === "on";
    user.languages =
      req.body.languages.split(",").map((lang) => lang.trim()) ||
      user.languages;

    const updatedUser = await user.save(); 

    res.render("profile", { user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getProfilePage = async (req, res) => {
  try {
    const userId = req.session.userId;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.render("profile", { user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
