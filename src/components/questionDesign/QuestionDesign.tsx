import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, Select } from "antd";
import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
import clsx from 'clsx';

import styles from "./QuestionDesign.module.scss";

const { TextArea } = Input;

interface Props {
  questionNo: number
  handleQuestionChanges: (data: any) => void
}

const QuestionDesign: React.FC<Props> = ({ questionNo, handleQuestionChanges }) => {
  const [value, setValue] = useState();
  const [answerType, setAnswerType] = useState("radio");
  const [possibleAnswerInput, setPossibleAnswerInput] = useState<undefined | string>();
  const [possibleAnswers, setPossibleAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const handleAddPossibleAnswer = () => {
    let el = document.getElementById(`question-input-${questionNo}`)?.value;
    setPossibleAnswers((oldArray: any) => [...oldArray, { value: el, label: el}]);
    setPossibleAnswerInput(undefined);
  };

  const handleAddAsCorrectAnswer = (value: string) => {
    if (!value) return;

    // radio only allows one answer to be selected
    if (answerType === "radio") {
      if (correctAnswers.includes(value)) {
        setCorrectAnswers((oldArray: any) => oldArray.filter((ca: string) => ca !== value));
      } else {
        setCorrectAnswers([value])
      }
    } else if (answerType === "checkbox") { // checkbox type allows users to select multiple answers
      if (correctAnswers.includes(value)) {
        setCorrectAnswers((oldArray: any) => oldArray.filter((ca: string) => ca !== value));
      } else {
        setCorrectAnswers((oldArray: any) => [...oldArray, value])
      }
    }
  };

  const handleAnswerTypeChange = (value: string) => {
    console.log(`selected ${value}`);
    setAnswerType(value);
  };

  useEffect(() => {
    if (value) {
      handleQuestionChanges({ id: questionNo, type: answerType, question: value, possibleAnswers, correctAnswers });
    }
  }, [value, answerType, possibleAnswers, correctAnswers]);

  return (
    <Row
      gutter={[5, 16]}
      justify="start"
      align="bottom"
      className={styles.wrapper}
    >
      <Col span={24}>
        <p>{`Question ${questionNo}`}</p>
        <TextArea
          size="large"
          variant="filled"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. How many days does it take for the Earth to orbit the Sun?"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Col>
      <Col span={24}>
        <p>Answer type</p>
        <div>
          <Select
            defaultValue="radio"
            variant="filled"
            size="large"
            style={{ width: "100%" }}
            onChange={handleAnswerTypeChange}
            options={[
              { value: 'radio', label: 'Radio Group' },
              { value: 'checkbox', label: 'Checkbox', disabled: true }
            ]}
          />
        </div>
      </Col>
      <Col span={23}>
        <p>Add an answer</p>
        <Input
          id={`question-input-${questionNo}`}
          size="large"
          variant="filled"
          placeholder="Please add a possible answer. No worries, the next step will be select the correct ones."
          value={possibleAnswerInput}
          addonBefore={<EditOutlined style={{ color: "#000" }} />}
          onChange={(e) => setPossibleAnswerInput(e.target.value)}
        />
      </Col>
      <Col span={1}>
        <Button type="primary" size="large" block onClick={() => handleAddPossibleAnswer()}>+</Button>
      </Col>
      <Col span={24}>
        <Row gutter={[5, 0]}>
          <Col span={24} style={{ margin: "15px 0px", fontSize: 14 }}>
            { possibleAnswers?.length > 0 ?
              "You can find the list of possible answers below. You can select the correct answers by clicking." :
              "There are not possible answers at the moment."
            }
          </Col>
          {
            possibleAnswers.map((possibleAnswer: any) =>
              <Col
                key={`possible-answer-${possibleAnswer.value}`}
                span={24}
                className={clsx(styles.possibleAnswer, {
                  [styles.highlight]: correctAnswers.includes(possibleAnswer.value)
                })}
                onClick={() => handleAddAsCorrectAnswer(possibleAnswer.value)}
              >
                <Row>
                  <Col span={22}>
                    {possibleAnswer.label}
                  </Col>
                  <Col span={1}>
                    {correctAnswers.includes(possibleAnswer.value) && <CheckCircleOutlined style={{ color: "green", fontSize: "20px" }} />}
                  </Col>
                  <Col span={1}>
                    {/* TODO: There is a bug when removing and adding an item back, it becomes the correct answer */}
                    <a style={{ cursor: "pointer" }} onClick={() => {
                      setPossibleAnswers((oldArray: any) => oldArray.filter((pa: string) => pa.value !== possibleAnswer.value));
                      setCorrectAnswers((oldArray: any) => oldArray.filter((ca: string) => ca !== possibleAnswer.value));
                    }}>
                      Delete
                    </a>
                  </Col>
                </Row>
              </Col>)
          }
        </Row>
      </Col>
    </Row>
  );
};

export default QuestionDesign;
