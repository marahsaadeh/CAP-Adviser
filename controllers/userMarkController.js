const usergrade = require("../models/usergrade");

exports.CourseMark = async (req, res) => {
  try {
    const newusergrade = new usergrade({ Grades: req.body });
    const savedData = await newusergrade.save();
    console.log(newusergrade);
    return res.status(200).redirect("/stageSelect");
  } catch (error) {
    console.log("error", error);
    return res.status(400).send();
  }
};

exports.getCourseMark = (req, res) => {
  let courses = [
    { id: 1, name: "discrete" },
    { id: 2, name: "Calculs 1" },
    { id: 3, name: "Calculs 2" },
    { id: 4, name: "Probability" },
    { id: 5, name: "Programing for engineering" },
    { id: 6, name: "Computer architecture" },
    { id: 7, name: "Data Structures" },
    { id: 8, name: "Algorthim" },
    { id: 9, name: "Network" },
    { id: 10, name: "Web" },
    { id: 11, name: "Statistical Analysis" },
    { id: 12, name: "Software Engineering" },
    { id: 13, name: "Fundamentals of Artificial Intelligence" },
    { id: 14, name: "Machine Learning" },
    { id: 15, name: "Database" },
  ];

  res.render("marks", { courses: courses });
};
