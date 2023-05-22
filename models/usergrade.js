const mongoose = require("mongoose");
const usergradeSchema = new mongoose.Schema({
  
Grades:Object
});


const Usergrade = mongoose.model("usergradeschemas", usergradeSchema);// edit 

module.exports = Usergrade;




