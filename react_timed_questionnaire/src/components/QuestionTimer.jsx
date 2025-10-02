import { useEffect, useState } from "react";

function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  // setting our timer that expires in timeout time
  // this is a side-effect
  // we have to wrap it in useEffect to avoid having
  // multiple timers co-existing because of the useState below
  useEffect(() => {
    const timer = setTimeout(() => {
      {
        onTimeout();
      }
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  // 100 milliseconds ~ our chosen frequency
  // this creates an infinite loop because we keep updating the state
  // so we need to use ~useEffect~
  // we dont have props or state values so our dependencies is []
  useEffect(() => {
    const interval = setInterval(() => {
      {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
      }
    }, 100);

    // we need Cleanup function to reset interval every time it runs
    // executes before running the function again or gets unmounted from the dom
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    ></progress>
  );
}

export default QuestionTimer;
