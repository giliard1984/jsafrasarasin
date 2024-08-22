import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
// const currentWeek = dayjs().week();

export const assignQuestionPoolToUser = (userId: string, week: number) => {
  fetch(`http://giliards-macbook-pro-2.local:5183/questionPools?reference=${week}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  })
  .then(response => response.json())
  .then(json => {
    console.log(json[0]);
    addAssignmentToUserPool(userId, json[0]);
  })
  .catch((e: Error) => {
    // TODO: handle the error message
    console.log(e);
  });
  // .finally(() => console.log(false));
};

const addAssignmentToUserPool = (userId: string, questionPool: any) => {
  console.log(userId, questionPool);
  fetch(`http://giliards-macbook-pro-2.local:5183/userPool`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...questionPool, id: uuidv4(), userId, createdAt: dayjs().toISOString()})
  })
  .then(response => response.json())
  .then(json => {
    console.log(json);

    // TODO: Fetch the required pool
    // setQuestionPools(json[0]);
  })
  .catch((e: Error) => {
    // TODO: handle the error message
    console.log(e);
  });
  // .finally(() => console.log(false));
};
