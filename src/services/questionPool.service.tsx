import type { Quiz } from "@definitions/global";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// retrieve all quizzes
export async function fetchAllQuizzes() {
  return (
    await fetch(`${BASE_URL}/questionPools`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
  )?.json();
};

// retrieve the question pool given a week reference
export async function fetchQuestionPoolByWeek(week: number) {
  return (
    await fetch(`${BASE_URL}/questionPools?reference=${week}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
  )?.json();
};

// once the user has finished, they can submit the quiz, that gets stored
export async function addQuiz(quiz: Pick<Quiz, "reference" | "questions">) {
  return (
    await fetch(`${BASE_URL}/questionPools`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...quiz, id: uuidv4(), createdAt: dayjs().toISOString()})
    })
  )?.json();
};