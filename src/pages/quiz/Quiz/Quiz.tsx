import React, { useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import { assignQuestionPoolToUser } from "@/helpers/assignQuestionPoolToUser";
import { ConfigProvider, Radio, Space, Button, type RadioChangeEvent } from "antd";
import type { Quiz, Question, PossibleAnswer } from "@definitions/global";
import { fetchQuizByUserWeek, submitAnswers } from "@/services/userPool.service";
import { AppContext } from "@contexts/AppContext";

import styles from "./Quiz.module.scss";

const currentWeek = dayjs().week();

const QuizPage: React.FC = () => {
  const [questionPool, setQuestionPool] = useState<Quiz | undefined>();
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>();

  // retrieved states and methods associated with the app context
  const {
    session
  } = useContext(AppContext);

  // computed data
  const totalQuestions = questionPool?.questions?.length || 0;
  const nextQuestionId = currentQuestion ? currentQuestion?.id + 1 : 1;

  // if user pool is empty, then assign the latest pool if still valid
  useEffect(() => {
    if (session && !questionPool) {
      fetchQuizByUserWeek(session.id, currentWeek)
      .then(json => {
        // TODO: remove the correctAnswers attribute, so users can't cheat. This should be done when dealing with BE
        // in case there is no quiz assigned to the user, then we should fetch it from the questionPool and associate,
        // so the user can start answering those questions
        // TODO: guarantee that only one reference is created at the time, to prevent duplicity
        if (json?.length > 0) {
          setQuestionPool(json[0]);
        } else {
          const assignedQuestionPool = assignQuestionPoolToUser(session.id, currentWeek);
          assignedQuestionPool.then((res: Quiz) => {
            setQuestionPool(res);
          });
        }
      })
      .catch((e: Error) => {
        console.log(e);
      });
    }
  }, [session, questionPool]);

  // as soon as the questionsPools is updated, we select the first question
  useEffect(() => {
    if (!currentQuestion) setCurrentQuestion(questionPool?.questions?.find((question: Question) => question.id === 1));
  }, [questionPool, currentQuestion]);

  // function responsible for acting when the user click on an specific answer
  const onChange = (e: RadioChangeEvent) => {
    setQuestionPool((oldObj: any) => ({
      ...oldObj,
      questions: oldObj?.questions?.map((question: Question) => {
        if (question?.id === currentQuestion?.id) question.usersAnswers = [e.target.value];
        return question;
      })
    }))
  };

  // handles the click to go to the next question, or even submit the quiz, when dealing with the last question
  const handleNextQuestion = async () => {
    if (nextQuestionId <= totalQuestions) {
      setCurrentQuestion(questionPool?.questions?.find((question: Question) => question.id === nextQuestionId));
    } else if (questionPool) {
      const response = await submitAnswers(questionPool);
      setQuestionPool(response);
    }
  };

  return (
    <ConfigProvider
      theme={{ components: { Radio: { radioSize: 22 } } }}
    >
      {currentQuestion && !questionPool?.submittedAt ?
        <div className="alignToLeft">
          <div data-testid="question-number" className={styles.questionNo}>Question {currentQuestion.id}</div>
          <div className={styles.question}>{currentQuestion.question}</div>
          <Radio.Group
            key={`radio-group-question-${currentQuestion.id}`}
            size="large"
            onChange={onChange}
            value={(questionPool?.questions as any)?.find((question: Question) => question?.id === currentQuestion?.id)?.usersAnswers[0]}
          >
            <Space direction="vertical">
              {currentQuestion?.possibleAnswers.map((pa: PossibleAnswer, index: number) => <Radio key={`question-${currentQuestion?.id}-${index}`} style={{ fontSize: 16, margin: "5px 0px" }} value={pa.value}>{pa.label}</Radio>)}
            </Space>
          </Radio.Group>
          <div className="alignToRight spaceTopMD">
            <Button
              type="primary"
              size="large"
              style={{ width: 150 }}
              onClick={() => handleNextQuestion()}
            >
              {nextQuestionId <= totalQuestions ? "Next" : "Finish"}
            </Button>
          </div>
        </div> :
        <div className="alignToLeft">
          <div className={styles.result}>Result</div>
          <div className={styles.reference}>Week {questionPool?.reference}</div>
          <div>Total Questions: {questionPool?.statistics?.totalQuestions}</div>
          <div>Total Score: {questionPool?.statistics?.score.toFixed(2)}</div>
          <div>Correct Answers: {questionPool?.statistics?.correct}</div>
          <div>Wrong Answers: {
            questionPool?.statistics?.totalQuestions ?
              questionPool?.statistics?.totalQuestions - questionPool?.statistics?.correct :
              "Not Applicable"
          }</div>
        </div>
      }
    </ConfigProvider>
  );
};

export default QuizPage;
