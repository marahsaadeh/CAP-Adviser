const usergrade = require('../models/usergrade');

exports.postusergradepPage = async (req, res) => {

  try {  

    const newusergrade = new usergrade({Grades:req.body});
    const savedData=await newusergrade.save();
    console.log(newusergrade);
    return res.status(200).redirect('/stageSelect')
    
  } catch (error) {

    console.log("error",error);
    return res.status(400).send();    
  }
}

exports.getusergradepPage = (req, res) => {
  let courses=
  [{"id":1,"name":"Discreate Math"},
  {"id":2,"name":"Calculs 1"},
  {"id":3,"name":"Calculs 2"},
  {"id":4,"name":"Probability"},
  {"id":5,"name":"Programing 1"},
  {"id":6,"name":"Programing 2"},
  {"id":7,"name":"Data Structures"},
  {"id":8,"name":"Algorthim"},
  {"id":9,"name":"Theory of Calculation"},
  {"id":10,"name":"Web 1"},
  {"id":11,"name":"Web 2"},
  {"id":12,"name":"Statistical Analysis"},
  {"id":13,"name":"Software Engineering"},
  {"id":14,"name":"Fundamentals of Artificial Intelligence"},
  {"id":15,"name":"Machine Learning"},
  {"id":16,"name":"Data Mining"},
  {"id":17,"name":"Database"},
  {"id":18,"name":"Network"}
  ]
  
  res.render("plan",{courses:courses});
}
