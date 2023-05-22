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
      totalEnginneringWeight: {
        type: Number,
        min: 0,
        max: 100,
        trim: true,
        default: 0,
      },
      totalItWeight: {
        type: Number,
        min: 0,
        max: 100,
        trim: true,
        default: 0,
      },
      totalNotItWeight: {
        type: Number,
        min: 0,
        max: 100,
        trim: true,
        default: 0,
      },
    },
  ],
});

const Questions = mongoose.model("Questions", questionsSchema);

module.exports = Questions;
