function Options({ children, dispatch, answer, action, index, correctAnswer }) {
  const hasAnswer = answer !== null;
  
  return (
    <button
      className={`btn btn-option ${index === answer ? "answer" : ""} ${
        hasAnswer && index === correctAnswer ? "correct" : "wrong"
      }`}
      onClick={() => dispatch({ type: action.NEW_ANSWER, payload: index })}
      disabled={hasAnswer}
    >
      {children}
    </button>
  );
}

export default Options;
