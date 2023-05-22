const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
  questions: [
    {
      userEmail: {
        type: String,
        lowercase: true,
        trim: true,
      },
      questionNumber: {
        type: Number,
        lowercase: true,
        trim: true,
      },
      aiWeight: {
        type: Number,
        min: 0,
        max: 100,
        trim: true,
        default: 0,
      },
      swWeight: {
        type: Number,
        min: 0,
        max: 100,
        trim: true,
        default: 0,
      },
    },
  ],
});

const Stage2Result = mongoose.model("Stage2Result", questionsSchema);

module.exports = Stage2Result;
