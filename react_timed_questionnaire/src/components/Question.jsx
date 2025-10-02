import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers";
import { useState } from "react";
import QUESTIONS from "../../questions.js";

/* e.g. 10000 milliseconds = 10 seconds || null for an empty
    placeholder when no answer was selected ||
    we use the key value so we destroy and recreate the QuestionTimer 
    so we can recreate the progress bar whenever we change question */

function Question({ ourKey, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  // my chosen timer in milliseconds - 20 seconds
  let timer = 30000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[ourKey].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      {/* we use the key here to force the interval to be recreated */}
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[ourKey].text}</h2>
      <Answers
        answers={QUESTIONS[ourKey].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}

export default Question;
