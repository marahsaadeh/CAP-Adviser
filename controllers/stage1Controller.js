const Questions = require("../models/questions");
const QuestionsValue = require("../models/questionsValue");

exports.postStage1Page = async (req, res) => {
  const { questionNumber, answerChar } = req.body;

  const engineeringWeights = await QuestionsValue.findOne({
    "questions.questionNumber": questionNumber,
  }).select("questions.answers.weight.engineeringWeight");

  const engineeringWeightsArray = engineeringWeights.questions.flatMap((q) =>
    q.answers.map((a) => a.weight.map((w) => w.engineeringWeight))
  );

  const itWeights = await QuestionsValue.findOne({
    "questions.questionNumber": questionNumber,
  }).select("questions.answers.weight.itWeight");

  const itWeightsArray = itWeights.questions.flatMap((q) =>
    q.answers.map((a) => a.weight.map((w) => w.itWeight))
  );

  const notItWeights = await QuestionsValue.findOne({
    "questions.questionNumber": questionNumber,
  }).select("questions.answers.weight.notItWeight");

  const notItWeightsArray = notItWeights.questions.flatMap((q) =>
    q.answers.map((a) => a.weight.map((w) => w.notItWeight))
  );

  console.log(engineeringWeightsArray[Number(answerChar) - 1][0]);
  console.log(itWeightsArray[Number(answerChar) - 1][0]);
  console.log(notItWeightsArray[Number(answerChar) - 1][0]);
  console.log(questionNumber);

  const userEmail = req.session.userEmail || "not working";

  try {
    const existingQuestion = await Questions.findOne({
      "questions.userEmail": userEmail,
    });

    if (existingQuestion) {
      const lastQuestionNumber = Math.max(
        ...existingQuestion.questions.map((q) => q.questionNumber)
      );
      if (questionNumber <= lastQuestionNumber) {
        // The user has already answered this question, redirect to the next question
        const nextQuestionNumber = Number(questionNumber) + 1;
        if (nextQuestionNumber === 11) {
          return res.redirect("/stage1Result");
        } else {
          return res.redirect(`/stage1?questionNumber=${nextQuestionNumber}`);
        }
      } else {
        const questionToUpdate = existingQuestion.questions.find(
          (q) => q.questionNumber === lastQuestionNumber
        );
        questionToUpdate.questionNumber = questionNumber;
        questionToUpdate.totalEnginneringWeight +=
          engineeringWeightsArray[Number(answerChar) - 1][0];
        questionToUpdate.totalItWeight +=
          itWeightsArray[Number(answerChar) - 1][0];
        questionToUpdate.totalNotItWeight +=
          notItWeightsArray[Number(answerChar) - 1][0];
        existingQuestion.save();
        return res.redirect(
          `/stage1?questionNumber=${Number(questionNumber) + 1}`
        );
      }
    } else {
      const newQuestion = new Questions({
        questions: [
          {
            userEmail,
            questionNumber,
            totalEnginneringWeight:
              engineeringWeightsArray[Number(answerChar) - 1][0],
            totalItWeight: itWeightsArray[Number(answerChar) - 1][0],
            totalNotItWeight: notItWeightsArray[Number(answerChar) - 1][0],
          },
        ],
      });
      newQuestion.save();
      return res.redirect(`/stage1?questionNumber=${questionNumber}`);
    }
  } catch (error) {
    console.log(error);
    error.database = `Error saving user to database. ${error}`;
    return res.redirect(`/stage1?questionNumber=${questionNumber}`);
  }
};

exports.getStage1Page = async (req, res) => {
  try {
    const isAt = await Questions.findOne({
      "questions.userEmail": req.session.userEmail || "not working",
    }).select("questions.questionNumber");

    const questionNumberValue = isAt?.questions?.[0]?.questionNumber;

    console.log(questionNumberValue);

    const questionNumber = parseInt(questionNumberValue + 1) || 1;

    if (questionNumber >= 11) {
      return res.redirect("/stage1Result");
    }

    const questionsValue = await QuestionsValue.findOne({
      "questions.questionNumber": questionNumber,
    });
    if (!questionsValue) {
      return res.redirect("/stage1");
    }

    return res.render("stage1", {
      questionsValue: questionsValue,
      questionNumber: questionNumber,
    });
  } catch (err) {
    console.log(err);
    res.send("Error retrieving questions");
  }
};
