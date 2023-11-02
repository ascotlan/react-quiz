function FinishScreen({ maxPossiblePoints, points, highscore, dispatch, action }) {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji = null;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙂";
  if (percentage >= 0 && percentage < 50) emoji = "🙄";
  if (percentage === 0) emoji = "🤦🏽‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn btn-ui" onClick={() => dispatch({type:action.RESTART})}>Restart</button>
    </>
  );
}

export default FinishScreen;
