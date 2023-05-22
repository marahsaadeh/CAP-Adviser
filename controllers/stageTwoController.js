const stage2Result=require("../models/stage2Result");
const stage2Questions=require("../models/stage2Questions");

// exports.getGeneral=(req,res)=>{
//     res.render("stage2General");
// }

exports.getStage2 = async (req, res) => {
  try {
    const isAt = await stage2Result.findOne({
      "questions.userEmail": req.session.userEmail || "not working",
    }).select("questions.questionNumber");

    const questionNumberValue = isAt?.questions?.[0]?.questionNumber;

    console.log(questionNumberValue);

    const questionNumber = parseInt(questionNumberValue + 1) || 1;

    if (questionNumber >= 10) {
      return res.redirect("/stage2Result");
    }

    const questionsValue = await stage2Questions.findOne({
      "questions.questionNumber": questionNumber,
    });
    if (!questionsValue) {
      return res.redirect("/stage2");
    }

    return res.render("stage2", {
      questionsValue: questionsValue,
      questionNumber: questionNumber,
    });
  } catch (err) {
    console.log(err);
    res.send("Error retrieving questions");
  }
};

  exports.postStage2 = async (req, res) => {
    const { questionNumber, answerChar } = req.body;
  
    const aiWeights = await stage2Questions.findOne({
      "questions.questionNumber": questionNumber,
    }).select("questions.answers.weight.aiWeight");
  
    const aiWeightsArray = aiWeights.questions.flatMap((q) =>
      q.answers.map((a) => a.weight.map((w) => w.aiWeight))
    );
  
    const swWeights = await stage2Questions.findOne({
      "questions.questionNumber": questionNumber,
    }).select("questions.answers.weight.swWeight");
  
    const swWeightsArray = swWeights.questions.flatMap((q) =>
      q.answers.map((a) => a.weight.map((w) => w.swWeight))
    );
  
    console.log(aiWeightsArray[Number(answerChar) - 1][0]);
    console.log(swWeightsArray[Number(answerChar) - 1][0]);
    console.log(questionNumber);
    console.log("///////////////////////");
  
    const userEmail = req.session.userEmail || "not working";
  
    try {
      const existingQuestion = await stage2Result.findOne({
        "questions.userEmail": userEmail,
      });
  
      if (existingQuestion) {
        const lastQuestionNumber = Math.max(
          ...existingQuestion.questions.map((q) => q.questionNumber)
        );
        if (questionNumber <= lastQuestionNumber) {
          // The user has already answered this question, redirect to the next question
          const nextQuestionNumber = Number(questionNumber) + 1;
          if (nextQuestionNumber === 10) {
            return res.redirect("/stage2Result");
          } else {
            return res.redirect(`/stage2?questionNumber=${nextQuestionNumber}`);
          }
        } else {
          const questionToUpdate = existingQuestion.questions.find(
            (q) => q.questionNumber === lastQuestionNumber
          );
          questionToUpdate.questionNumber = questionNumber;
          questionToUpdate.aiWeight +=
            aiWeightsArray[Number(answerChar) - 1][0];

          questionToUpdate.swWeight +=
            swWeightsArray[Number(answerChar) - 1][0];

          existingQuestion.save();
          return res.redirect(
            `/stage2?questionNumber=${Number(questionNumber) + 1}`
          );
        }
      } else {
        const newQuestion = new stage2Result({
          questions: [
            {
              userEmail,
              questionNumber,
              aiWeight:
                aiWeightsArray[Number(answerChar) - 1][0],

              swWeight: swWeightsArray[Number(answerChar) - 1][0],
            },
          ],
        });
        newQuestion.save();
        return res.redirect(`/stage2?questionNumber=${questionNumber}`);
      }
    } catch (error) {
      console.log(error);
      error.database = `Error saving user to database. ${error}`;
      return res.redirect(`/stage2?questionNumber=${questionNumber}`);
    }
  };