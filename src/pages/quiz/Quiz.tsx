import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { assignQuestionPoolToUser } from "@/helpers/assignQuestionPoolToUser";

const currentWeek = dayjs().week();

const QuizPage: React.FC = () => {
  const [questionPools, setQuestionPools] = useState([]);

  // If user pool is empty, then assign the latest pool if still valid
  // console.log(currentWeek);
  useEffect(() => {
    fetch(`http://giliards-macbook-pro-2.local:5183/userPool?userId="3f66d43c-759a-483c-9ce0-91be8a36bb02"&&reference=${currentWeek}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(json => {
      // console.log(json);

      // in case there is no quiz assigned to the user, then we should fetch it from the questionPool and associate,
      // so the user can start answering those questions
      // TODO: guarantee that only one reference is created at the time, to prevent duplicity
      if (json?.length > 0) {
        setQuestionPools(json[0]);
      } else {
        // TODO: Assign the current week to the user
        // fetchCurrentQuestionPool();
        assignQuestionPoolToUser("3f66d43c-759a-483c-9ce0-91be8a36bb02", currentWeek);
      }
    })
    .catch((e: Error) => {
      // TODO: handle the error message
      console.log(e);
    });
    // .finally(() => console.log(false));

  }, []);

  return <>
    {questionPools?.questions?.map((question: any) => <div>{JSON.stringify(question)}</div>)}
  </>;
};

export default QuizPage;
