import "./App.css";
import { useState, useCallback } from "react";
import { questions } from "./Questions";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import MultiStepProgressBar from "./components/MultiStepProgressBar";
import { MultiStepForm } from "./components/MultiStepForm";
import { usernamePasswordValidator, othersValidator } from "./Validator";

const validatorPageIndexMap = {
  1: usernamePasswordValidator,
  2: othersValidator,
};

function App() {
  const totalPagesCount = questions?.length || 0;
  const [index, setIndex] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [pagesAnswers, setPagesAnswers] = useState({});

  const [validated, setValidated] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const nextStep = () => {
    let validator = validatorPageIndexMap[index];
    if (validator) {
      validator
        .validate(pagesAnswers[index], { abortEarly: false })
        .then((responseData) => {
          console.log(
            "🚀 ~ file: App.jsx:30 ~ onSubmit ~ responseData",
            responseData
          );
          goToNextPage();
        })
        .catch((err) => {
          console.log("🚀 ~ file: App.jsx:36 ~ onSubmit ~ err", err.errors);
          setValidated(false);
          setErrorMessage(err.errors.join("\r\n"));
        });
    } else {
      console.log("No more validation required");
      goToNextPage();
    }
  };

  // submission callback
  const onSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  const goToNextPage = () => {
    setValidated(true);
    if (index - 3) {
      setIndex((prevIndex) => prevIndex + 1);
    } else {
      window.alert(JSON.stringify(pagesAnswers));
      //clear form on submit
      setPagesAnswers({});
      setSubmitted(true);
    }
  };

  // previous button callback
  const prevButton = () => {
    index > 1 && setIndex((prevIndex) => prevIndex - 1);
  };

  // restart the submission
  const handleStart = () => {
    setIndex(1);
    setSubmitted(false);
  };

  // setup the answer state in the controlled form
  const onPageUpdate = useCallback(
    (step, answerObj) => {
      setPagesAnswers({
        ...pagesAnswers,
        [step]: {
          ...pagesAnswers[step],
          ...answerObj,
        },
      });
    },
    [pagesAnswers]
  );

  const renderError = () => {
    !validated && (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    );
  };

  const renderFormBodyAndFooter = () => {
    submitted ? (
      <>
        <Card.Body>
          <p>Your answers have been submitted!</p>
        </Card.Body>
        <Card.Footer>
          <Button onClick={handleStart}>Start Over</Button>
        </Card.Footer>
      </>
    ) : (
      <>
        <Card.Body>
          <MultiStepForm
            list={questions}
            step={index}
            onPageUpdate={onPageUpdate}
            pagesAnswers={pagesAnswers}
          />
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <Button onClick={prevButton} disabled={index === 1}>
            Previous
          </Button>
          <Button type="submit">
            {index === totalPagesCount ? "Submit" : "Next"}
          </Button>
        </Card.Footer>
      </>
    );
  };

  return (
    <main className="App">
      <Container className="h-100">
        <Row className="m-5">
          <Col className="align-self-center">
            <MultiStepProgressBar step={index} />
          </Col>
        </Row>

        <Row className="m-5">
          <Col className="align-self-center">{renderError()}</Col>
        </Row>

        <Form onSubmit={onSubmit}>
          <Card>{renderFormBodyAndFooter}</Card>
        </Form>
      </Container>
    </main>
  );
}

export default App;
