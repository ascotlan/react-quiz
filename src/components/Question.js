import Options from "./Options";

function Question({ question, dispatch, action, answer }) {
  const renderedOptions = question.options.map((option, index) => (
    <Options
      key={option}
      dispatch={dispatch}
      action={action}
      answer={answer}
      index={index}
      correctAnswer={question.correctOption}
    >
      {option}{" "}
    </Options>
  ));

  return (
    <div>
      <h4> {question.question}</h4>
      <div className="options">{renderedOptions}</div>
    </div>
  );
}

export default Question;
