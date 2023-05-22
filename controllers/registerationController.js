const validator = require("validator");
const User = require("../models/user");

function validateFields({
  password,
  c_password,
  email,
  full_name,
  student_id,
}) {
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

  // Validate confirm password
  if (password !== c_password) {
    errors.c_password = "Passwords do not match.";
  }

  // Validate email
  if (!validator.isEmail(email)) {
    errors.email = "Invalid email format.";
  }

  // Validate full name
  if (full_name && !validator.matches(full_name, /^[\u0621-\u064A" ]+$/)) {
    errors.full_name =
      "Full name must contain only Arabic letters, double quotations, and spaces.";
  }

  // Validate student ID
  if (student_id && !validator.matches(student_id, /^\d{8}$/i)) {
    errors.student_id = "Student ID must be in the format ########.";
  }

  return errors;
}

exports.postRegisterationPage = async (req, res) => {
  const { password, c_password, email, full_name, student_id, enrolled } =
    req.body;

  const errors = validateFields({
    email,
    password,
    c_password,
    full_name,
    student_id,
    enrolled,
  });

  // Check for validation errors
  if (Object.keys(errors).length > 0) {
    return res.render("registeration", {
      errors,
      email,
      password,
      c_password,
      full_name,
      student_id,
      enrolled,
    });
  } else {
    try {
      // Update user object with on_cap, github_account and languages fields
      const user = new User({
        email,
        password,
        full_name,
        student_id,
        enrolled,
      });

      await user.save();

      return res.redirect("/login");
    } catch (error) {
      // If there was an error saving the user to the database, render the signup page with an error message
      console.log(error);
      errors.database = `Error saving user to database. ${error}`;
      return res.render("registeration", {
        errors,
        email,
        password,
        full_name,
        student_id,
      });
    }
  }
};

exports.getRegisterationPage = (req, res) => {
  return res.render("registeration", {
    errors: req.session.errors || {},
  });
};
