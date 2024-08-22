import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card } from "antd";
import PageTitle from "@/components/pageTitle/PageTitle";

const ManageQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch(`http://giliards-macbook-pro-2.local:5183/questionPools`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      setQuizzes(json);
    })
    .catch((e: Error) => {
      // TODO: handle the error message
      console.log(e);
    })
    .finally(() => console.log(false));
  }, []);

  return (
    <>
      <Row>
        <Col span={24}>
          <PageTitle title="Manage Quiz" description="On this page you can see the existing quizzes, and act accordingly." />
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 50 }}>
        <Col
          span={6}
          style={{ minHeight: 200 }}
        >
          <Card
            title="Create a new quiz"
            hoverable
            bordered={true}
            style={{ minHeight: 200 }}
          >
            <div
              style={{ fontSize: 65, fontWeight: 200, color: "#36454F", display: "flex", justifyContent:"center", alignItems: "center" }}
              onClick={() => navigate("/quiz/create")}
            >+</div>
          </Card>
        </Col>
        {
          quizzes.map((quiz: any) => {
            return (
              <Col
                span={6}
                style={{ minHeight: 200 }}
              >
                <Card title={`Week ${quiz.reference}`} hoverable bordered={true} style={{ /*width: 300,*/ minHeight: "100%" }}>
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
