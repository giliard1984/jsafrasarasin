import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import type { Quiz, Question } from "@definitions/global";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// retrieve the pool assigned to the user
export async function fetchQuizByUserWeek(userId: string, reference: number) {
  return (
    await fetch(`${BASE_URL}/userPool?userId=${userId}&reference=${reference}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
  )?.json();
};

// add a question pool to the user, so they can answer and submit the questions
export async function addUserPool(userId: string, questionPool: Quiz) {
  return (
    await fetch(`${BASE_URL}/userPool`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...questionPool,
        id: uuidv4(),
        questionPoolId: questionPool.id,
        userId,
        questions: questionPool.questions.map((question: Question) => {
          question.usersAnswers = [];
          return question;
        }),
        createdAt: dayjs().toISOString()})
      })
  )?.json();
};

// function responsable for persisting the submitted quiz
// also, storing the statistics related to the quiz
export async function submitAnswers(quiz: Quiz) {
  const totalQuestions = quiz.questions?.length;
  let correct = 0;

  quiz.questions.forEach((question: Question) => {
    if (question?.usersAnswers?.every((answer: string) => question.correctAnswers.includes(answer))) correct += 1;
  });

  return (
    await fetch(`${BASE_URL}/userPool/${quiz.id}`, { 
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
  )?.json();
};
