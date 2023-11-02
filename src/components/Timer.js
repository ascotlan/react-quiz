import { useEffect } from "react";

function Timer({ dispatch, action, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: action.TICK });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch, action.TICK]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}: {seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
