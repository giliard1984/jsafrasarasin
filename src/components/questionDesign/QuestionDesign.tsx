import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, Select } from "antd";
import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
import clsx from 'clsx';
import { ComponentType, Question, PossibleAnswer } from "@definitions/global";

import styles from "./QuestionDesign.module.scss";

const { TextArea } = Input;

interface Props {
  questionNo: number
  handleQuestionChanges: (data: Question) => void 
}

const QuestionDesign: React.FC<Props> = ({ questionNo, handleQuestionChanges }) => {
  const [value, setValue] = useState<string | undefined>();
  const [answerType, setAnswerType] = useState<ComponentType>("radio");
  const [possibleAnswerInput, setPossibleAnswerInput] = useState<undefined | string>();
  const [possibleAnswers, setPossibleAnswers] = useState<PossibleAnswer[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  // adds the newly possible answer to the state, so it gets available for users to see as an option
  const handleAddPossibleAnswer = () => {
    let element = (document.getElementById(`question-input-${questionNo}`) as HTMLInputElement)?.value;
    setPossibleAnswers((oldArray: PossibleAnswer[]) => [...oldArray, { value: element, label: element }]);
    setPossibleAnswerInput(undefined);
  };

  // when a possible answer is clicked, we might add or remove it from the correct answers state
  const handleAddAsCorrectAnswer = (value: string) => {
    if (!value) return;

    // radio only allows one answer to be selected
    if (answerType === "radio") {
      if (correctAnswers.includes(value)) {
        setCorrectAnswers((oldArray: string[]) => oldArray.filter((ca: string) => ca !== value));
      } else {
        setCorrectAnswers([value])
      }
    } else if (answerType === "checkbox") { // checkbox type allows users to select multiple answers
      if (correctAnswers.includes(value)) {
        setCorrectAnswers((oldArray: string[]) => oldArray.filter((ca: string) => ca !== value));
      } else {
        setCorrectAnswers((oldArray: string[]) => [...oldArray, value])
      }
    }
  };

  // when a new type is selected, the information gets stored to the state
  const handleAnswerTypeChange = (value: ComponentType) => {
    setAnswerType(value);
  };

  // when at least one of the attributes of the question changes, the information gets sent back (callback) to its parent
  useEffect(() => {
    if (value) {
      handleQuestionChanges({
        id: questionNo,
        type: answerType,
        question: value,
        possibleAnswers,
        correctAnswers
      });
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
            className="block"
            onChange={handleAnswerTypeChange}
            options={[
              { value: 'radio' as ComponentType, label: 'Radio Group' },
              { value: 'checkbox' as ComponentType, label: 'Checkbox', disabled: true }
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
          addonBefore={<EditOutlined />}
          onChange={(e) => setPossibleAnswerInput(e.target.value)}
        />
      </Col>
      <Col span={1}>
        <Button type="primary" size="large" block onClick={() => handleAddPossibleAnswer()}>+</Button>
      </Col>
      <Col span={24}>
        <Row gutter={[5, 0]}>
          <Col span={24} className={styles.possibleAnswerInfo}>
            { possibleAnswers?.length > 0 ?
              "You can find the list of possible answers below. You can select the correct answers by clicking." :
              "There are not possible answers at the moment."
            }
          </Col>
          {possibleAnswers.map((possibleAnswer: PossibleAnswer) =>
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
                  {correctAnswers.includes(possibleAnswer.value) && <CheckCircleOutlined className={styles.correctAnswerIcon} />}
                </Col>
                <Col span={1}>
                  {/* TODO: There is a bug when removing and adding an item back, it becomes the correct answer */}
                  <a onClick={() => {
                    setPossibleAnswers((oldArray: PossibleAnswer[]) => oldArray.filter((pa: PossibleAnswer) => pa.value !== possibleAnswer.value));
                    setCorrectAnswers((oldArray: string[]) => oldArray.filter((ca: string) => ca !== possibleAnswer.value));
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
