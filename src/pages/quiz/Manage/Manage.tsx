import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card } from "antd";
import PageTitle from "@/components/pageTitle/PageTitle";
import type { Quiz } from "@definitions/global";
import { fetchAllQuizzes } from "@/services/questionPool.service";

import styles from "./Manage.module.scss";

const ManageQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    fetchAllQuizzes()
    .then(json => {
      setQuizzes(json);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }, []);

  return (
    <>
      <Row>
        <Col span={24}>
          <PageTitle
            title="Manage Quiz"
            description="On this page you can see the existing quizzes, and act accordingly."
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="spaceTopLG">
        <Col span={6} className={styles.minHeight}>
          <Card
            title="Create a new quiz"
            hoverable
            bordered={true}
            className={styles.minHeight}
          >
            <div
              className={styles.create}
              onClick={() => navigate("/quiz/create")}
            >+</div>
          </Card>
        </Col>
        {/* TODO: Work on the statistics per card */}
        {
          quizzes.map((quiz: Quiz) => {
            return (
              <Col
                key={`quiz-statistic-${quiz.id}`}
                span={6}
                className={styles.minHeight}
              >
                <Card
                  title={`Week ${quiz.reference}`}
                  hoverable={false}
                  bordered={true}
                  className="blockHeight"
                >
                  <div>Total questions: {quiz.questions?.length}</div>
                  <div>Status: On going</div>
                  <div>Submissions: 0</div>
                </Card>
              </Col>
            ); 
          })
        }
      </Row>
    </>
  );
};

export default ManageQuiz;
