const mongoose = require("mongoose");

const questionsValueSchema = new mongoose.Schema({

  questions: [{
      questionNumber: {
        type: Number,
        min:0,
        max:10,
        trim: true,
      },
      question:{
        type: String,
      },
      answers: [{
        answerChar:{
          type: String,
          enum: ["1", "2", "3"],
          required: true,
          trim: true,
        },
        answer:{
          type: String,
        },
        weight: [{
          engineeringWeight:{
            type: Number,
            min: 0,
            max: 9,
            trim: true,
            default:0
          },
          itWeight:{
            type: Number,
            min: 0,
            max: 9,
            trim: true,
            default:0
          },
          notItWeight:{
            type: Number,
            min: 0,
            max: 9,
            trim: true,
            default:0
          }
        }],
      }],

    },
  ],
});

const QuestionsValue = mongoose.model("QuestionsValue", questionsValueSchema);

module.exports = QuestionsValue;
