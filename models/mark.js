const mongoose  = require('mongoose');
const markSchema = new mongoose.Schema({    
    dynamicData: {
        type: mongoose.Schema.Types.Mixed,
       // required: true
    }
});

const userMark = mongoose.model("markSchema", markSchema);

module.exports = userMark;