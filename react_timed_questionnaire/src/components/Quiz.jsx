import { useCallback, useState } from "react";
import QUESTIONS from "../../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  // boolean value
  const quizCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });
  });

  // like useEffect but for functions to fix endless loops
  // because of the dependancies we wrap the function above
  // in useCallback aswell so no functions are recreated
  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (quizCompleted) {
    return <Summary userAnswers={userAnswers}></Summary>;
  }

  return (
    <div id="quiz">
      {/* we create our own key because the "key" word is occupied by
          react itself */}
      <Question
        key={activeQuestionIndex}
        ourKey={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}

export default Quiz;
