function NextButton({ answer, dispatch, action, index, numQuestions }) {
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: action.NEXT_QUESTION })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: action.FINISHED })}
      >
        Finished
      </button>
    );
}

export default NextButton;
