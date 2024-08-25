import type { Quiz } from "@definitions/global";
import { fetchQuestionPoolByWeek } from "@/services/questionPool.service";
import { addUserPool } from "@/services/userPool.service";

// when we make a call to this function, we already know the user has no valid pools associated
// the purpose is to fetch the newest available question pool
export const assignQuestionPoolToUser = async (userId: string, week: number) => {
  const response = await fetchQuestionPoolByWeek(week)
  .then(async (json) => {
    const newlyAssignedPool = await addAssignmentToUserPool(userId, json[0]);
    json[0].id = newlyAssignedPool.id;
    json[0].questionPoolId = newlyAssignedPool.questionPoolId;

    return json[0];
  })
  .catch((e: Error) => {
    console.log(e);
  });
  return response;
};

// once received the question pool, we create a copy of it for the user, so they can answer the questions
const addAssignmentToUserPool = async (userId: string, questionPool: Quiz) => {
  const response = await addUserPool(userId, questionPool)
  .catch((e: Error) => {
    console.log(e);
  });

  return response;
};
