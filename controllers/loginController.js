const validator = require("validator");
const User = require("../models/user");

function validateFields({ email, password }) {
  let errors = {};

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      maxLength: 20,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    errors.password =
      "Password must be between 8 and 20 characters and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.";
  }

  // Validate email
  if (!validator.isEmail(email)) {
    errors.email = "Invalid email format.";
  }

  return errors;
}

exports.postLoginPage = async (req, res) => {
  const { email, password } = req.body;

  const errors = validateFields({ email, password });

  // Check for validation errors
  if (Object.keys(errors).length > 0) {
    return res.render("login", {
      errors,
      email,
      password,
    });
  } else {
    try {
      // Find the user with the given email address in the database
      const user = await User.findOne({ email });

      if (!user) {
        errors.email = "No user found with that email address.";
        return res.render("login", {
          errors,
          email,
          password,
        });
      }

      // Check if the password provided matches the user's password
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        errors.password = "Incorrect password.";
        return res.render("login", {
          errors,
          email,
          password,
        });
      }
      req.session.isSignedIn = true;
      req.session.userEmail = email;
      req.session.userId = user._id;

      const enrolled = await User.findOne({
        email: email,
      }).select("enrolled");

      console.log(enrolled["enrolled"]);

      if (enrolled["enrolled"] == "notInUni") {
        return res.redirect("/stageSelect");
      } else if (enrolled["enrolled"] == "inCap") {
        return res.redirect("/stageSelect");
      } else {
        return res.redirect("/stageSelect");
      }
    } catch (error) {
      console.error(error);
      errors.database = `Error saving user to database. ${error}`;
      return res.render("login", {
        errors,
        email,
        password,
      });
    }
  }
};

exports.getLoginPage = async (req, res) => {
  res.render("login", { errors: {} });
};
