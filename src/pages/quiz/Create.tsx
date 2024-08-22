import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Input, Select, Card, Statistic, Divider } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import PageTitle from "@/components/pageTitle/PageTitle";
import QuestionDesign from "@/components/questionDesign/QuestionDesign";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

// const { TextArea } = Input;

const CreateQuiz: React.FC = () => {
  // const navigate = useNavigate();

  const [componentsList, setComponentsList] = useState([]); // list of components presented on the screen
  const [quiz, setQuiz] = useState({
    reference: 23,
    questions: []
  });

  // listen for changes in the question design components, and update the quiz object
  // that will be the one being saved as a template
  const handleQuestionChanges = (data: any) => {
    setQuiz((oldObj: any) => ({
      ...oldObj,
      questions: oldObj.questions.find((question: any) => question.id === data.id) ?
      [
        ...oldObj.questions.filter((question: any) => question.id !== data.id),
        data
      ] :
      [
        ...oldObj.questions,
        data
      ]
    }));
  };

  const handleAddQuestion = () => {
    const questionNo = componentsList.length + 1;

    // creates a new question component for the user to fill in
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

  const fullyConfiguredQuestions = quiz.questions.reduce((total, question) => {
    if (question?.question && question?.possibleAnswers?.length > 0 && question?.correctAnswers?.length > 0) {
      total += 1;
    }

    return total;
  }, 0);

  const pendingQuestions = quiz.questions.reduce((total, question) => {
    if (!question?.question || question?.possibleAnswers?.length === 0 || question?.correctAnswers?.length === 0) {
      total += 1;
    }

    return total;
  }, 0);

  const handleSubmission = () => {
    fetch(`http://giliards-macbook-pro-2.local:5183/questionPools`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...quiz, id: uuidv4(), createdAt: dayjs().toISOString()})
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);

      setQuiz({
        reference: 23,
        questions: []
      });

      setComponentsList([]);

      // TODO: Move the notification code in to a helper function
      // when the credential has been verified, than based on the role, redirect them on to their page
      // openNotification("info", "Success", "Your new quiz has been created", "topRight");
    })
    .catch((e: Error) => {
      // TODO: handle the error message
      console.log(e);
    })
    .finally(() => console.log(false));
  };

  // by the default we present the first question component
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
      <Row style={{ marginTop: 20 }}>
        <Col span={24} style={{ fontSize: 18 }}>Reference:
            <Select
              defaultValue={23}
              variant="borderless"
              size="large"
              // style={{ width: "100%" }}
              // onChange={handleAnswerTypeChange}
              options={[
                { value: 23, label: 'Week 23' },
                { value: 24, label: 'Week 24', disabled: true }
              ]}
            />
            <div><small>You can create pools ahead of the time. Bear in mind that the last created pool was Week 22.</small></div>
        </Col>
      </Row>
      {componentsList}
      <Row
        gutter={[5, 16]}
        justify="end"
        align="bottom"
        style={{ marginTop: 50 }}
      >
        <Col span={24}>
          <Button type="link" size="large" block onClick={handleAddQuestion}>Add another question</Button>
        </Col>
        {/* {JSON.stringify(quiz)} */}
      </Row>
      <Row gutter={16} style={{ marginTop: 80 }}>
        <Col span={24} style={{ fontSize: 18, marginBottom: 20 }}>
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
      <Row gutter={[16, 16]} justify="start" align="middle" style={{ marginTop: 50 }}>
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
