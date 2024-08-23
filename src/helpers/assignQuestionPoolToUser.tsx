import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import type { Quiz, Question } from "@definitions/global";

// when we make a call to this function, we already know the user has no valid pools associated
// the purpose is to fetch the newest available question pool
export const assignQuestionPoolToUser = async (userId: string, week: number) => {
  const response = await fetch(`http://localhost:5183/questionPools?reference=${week}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  })
  .then(response => response.json())
  .then(json => {
    addAssignmentToUserPool(userId, json[0]);
    return json[0];
  })
  .catch((e: Error) => {
    console.log(e);
  });
  return response;
};

// once received the question pool, we create a copy of it for the user, so they can answer the questions
const addAssignmentToUserPool = async (userId: string, questionPool: Quiz) => {
  await fetch(`http://localhost:5183/userPool`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...questionPool,
      id: uuidv4(),
      userId,
      questions: questionPool.questions.map((question: Question) => {
        question.usersAnswers = [];
        return question;
      }),
      createdAt: dayjs().toISOString()})
    })
  .then(response => response.json())
  .catch((e: Error) => {
    console.log(e);
  });
};
