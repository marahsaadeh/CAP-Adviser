const mongoose = require("mongoose");

const questionsValueSchema = new mongoose.Schema({
  questions: [
    {
      questionNumber: {
        type: Number,
        min: 0,
        max: 10,
        trim: true,
      },
      question: {
        type: String,
      },
      answers: [
        {
          answerChar: {
            type: String,
            enum: ["1", "2", "3"],
            required: true,
            trim: true,
          },
          answer: {
            type: String,
          },
          weight: [
            {
              aiWeight: {
                type: Number,
                min: 0,
                max: 9,
                trim: true,
                default: 0,
              },
              swWeight: {
                type: Number,
                min: 0,
                max: 9,
                trim: true,
                default: 0,
              },
            },
          ],
        },
      ],
    },
  ],
});

const stage2questionsvalues = mongoose.model("stage2questionsvalues", questionsValueSchema);

module.exports = stage2questionsvalues;
