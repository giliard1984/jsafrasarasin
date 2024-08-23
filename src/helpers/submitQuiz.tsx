import dayjs from "dayjs";
import type { Quiz, Question } from "@definitions/global";

// function responsable for persisting the submitted quiz
// also, storing the statistics related to the quiz
export const submitQuiz = async (quiz: Quiz) => {
  // calculate the scores/stats
  const totalQuestions = quiz.questions?.length;
  let correct = 0;

  quiz.questions.forEach((question: Question) => {
    if (question?.usersAnswers?.every((answer: string) => question.correctAnswers.includes(answer))) correct += 1;
  })

  const response = await fetch(`http://localhost:5183/userPool/${quiz.id}`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...quiz,
      statistics: {
        totalQuestions,
        correct,
        score: (correct / totalQuestions) * 100
      },
      submittedAt: dayjs().toISOString()
    })
  })
  .then(response => response.json())
  .then(json => {
    return json;
  })
  .catch((e: Error) => {
    console.log(e);
  });

  return response;
};
