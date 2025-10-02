import { useRef } from "react";

function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  // like this you can connect html elements (not happening here)
  // manage value that will not change when the component is executed again
  // avoid using useEffect
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    // this built-in method edits the array
    // Math.random() returns a value between 0 and 1 (1 us excluded)
    // negative value changes the order of the answers
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            {/* using <button> so each answer is clickable ||
            we use disabled so we cant change our answer when we pick one */}
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Answers;
