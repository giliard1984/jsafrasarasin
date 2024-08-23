import React, { useEffect, useState } from "react";
import { Row, Col, Button, Select, Statistic } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import PageTitle from "@/components/pageTitle/PageTitle";
import QuestionDesign from "@/components/questionDesign/QuestionDesign";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { v4 as uuidv4 } from "uuid";
import type { Quiz, Question } from "@definitions/global";

import styles from "./Create.module.scss";

dayjs.extend(weekOfYear);

// defines the reference list, used as weeks
const referenceList =
  Array.from({ length: 52}, (_value: string, index: number) => ({
    "value": index + 1,
    "label": `Week ${index + 1}`,
    "disabled": (index + 1) < dayjs().week()
  }));

const CreateQuiz: React.FC = () => {
  const [componentsList, setComponentsList] = useState<React.ReactElement[]>([]); // list of components presented on the screen
  const [quiz, setQuiz] = useState<Pick<Quiz, "reference" | "questions">>({
    reference: dayjs().week(),
    questions: []
  });

  const handleReferenceChange = (value: string) => {
    setQuiz((oldObj: any) => ({ ...oldObj, reference: value}));
  };

  // listen for changes in the question design components, and update the quiz object
  // that will be the one being saved as a template
  const handleQuestionChanges = (data: Question): void => {
    setQuiz((oldObj: any) => ({
      ...oldObj,
      questions: oldObj.questions.find((question: Question) => question.id === Number(data.id)) ?
      [
        ...oldObj.questions.filter((question: Question) => question.id !== Number(data.id)),
        data
      ] :
      [
        ...oldObj.questions,
        data
      ]
    }));
  };

  // function that renders a new question component for the users to setup
  const handleAddQuestion = () => {
    const questionNo = componentsList.length + 1;

    setComponentsList(
      componentsList.concat(
        <QuestionDesign
          key={`question-design-${questionNo}`}
          questionNo={questionNo}
          handleQuestionChanges={handleQuestionChanges}
        />
      )
    );
  };

  // the purpose here is to state that a question has been fully configured
  // e.g. Question, possible and correct answers are provided
  const fullyConfiguredQuestions = quiz.questions.reduce((total, question) => {
    if (question?.question && question?.possibleAnswers?.length > 0 && question?.correctAnswers?.length > 0) {
      total += 1;
    }

    return total;
  }, 0);

  // run a check to identify the total questions that are pending (missing some configuration)
  const pendingQuestions = quiz.questions.reduce((total, question) => {
    if (!question?.question || question?.possibleAnswers?.length === 0 || question?.correctAnswers?.length === 0) {
      total += 1;
    }

    return total;
  }, 0);

  // once the user has finished, they submit the quiz, that gets stored
  const handleSubmission = () => {
    fetch(`http://localhost:5183/questionPools`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...quiz, id: uuidv4(), createdAt: dayjs().toISOString()})
    })
    .then(response => response.json())
    .then(() => {
      setQuiz({
        reference: dayjs().week(),
        questions: []
      });

      setComponentsList([]);

      // TODO: Move the notification code in to a helper function
      // when the credential has been verified, than based on the role, redirect them on to their page
      // openNotification("info", "Success", "Your new quiz has been created", "topRight");
    })
    .catch((e: Error) => {
      console.log(e);
    })
    .finally(() => console.log(false));
  };

  // by default we present the first question component
  useEffect(() => {
    componentsList?.length === 0 && handleAddQuestion();
  }, [componentsList]);

  return (
    <>
      <Row>
        <Col span={24}>
          <PageTitle title="Create a new Quiz" description="On this page you can setup a new quiz and even schedule when it should become available." />
        </Col>
      </Row>
      <Row className="spaceTopMD">
        <Col span={24} style={{ fontSize: 18 }}>Reference:
            <Select
              defaultValue={dayjs().week()}
              variant="borderless"
              size="large"
              options={referenceList}
              onChange={handleReferenceChange}
            />
            <div><small>You can create pools ahead of the time. Bear in mind that the last created pool was Week {dayjs().subtract(7, "days").week()}.</small></div>
        </Col>
      </Row>
      {componentsList}
      <Row
        gutter={[5, 16]}
        justify="end"
        align="bottom"
        className="spaceTopMD"
      >
        <Col span={24}>
          <Button
            type="link"
            size="large"
            block
            onClick={handleAddQuestion}
          >Add another question</Button>
        </Col>
      </Row>
      <Row gutter={16} className="spaceTopXL">
        <Col span={24} className={styles.overview}>
          Overview
          <div><small>Bear in mind that questions not configured, are not taken into consideration.</small></div>
        </Col>
        <Col span={6}>
          <Statistic title="Reference" value={quiz.reference} prefix="Week " />
        </Col>
        <Col span={6}>
          <Statistic title="Total Questions" value={quiz.questions?.length} />
        </Col>
        <Col span={6}>
          <Statistic
            title="Fully-configured questions"
            value={fullyConfiguredQuestions}
            prefix={<LikeOutlined />}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Pending questions"
            value={pendingQuestions}
            prefix={<DislikeOutlined />}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="start" align="middle" className="spaceTopLG">
        <Col span={6}>
          Have you configured all the questions you wanted to? If so, you can hit the button create.
        </Col>
        <Col span={6}>
          <Button type="primary" size="large" block onClick={handleSubmission} disabled={pendingQuestions > 0}>Create</Button>
        </Col>
      </Row>
    </>
  );
};

export default CreateQuiz;
