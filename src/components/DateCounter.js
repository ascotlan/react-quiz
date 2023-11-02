import { useReducer } from "react";

const ACTION = {
  DEC: "DEC",
  INC: "INC",
  SET_COUNT: "SET COUNT",
  SET_STEP: "SET STEP",
  RESET: "RESET",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.INC:
      return { ...state, count: state.count + action.payload };
    case ACTION.DEC:
      return { ...state, count: state.count - action.payload };
    case ACTION.SET_COUNT:
      return { ...state, count: action.payload };
    case ACTION.SET_STEP:
      return { ...state, step: action.payload };
    case ACTION.RESET:
      return action.payload;
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

function DateCounter() {
  const InitialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, InitialState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: ACTION.DEC, payload: step });
  };

  const inc = function () {
    dispatch({ type: ACTION.INC, payload: step });
  };

  const defineCount = function (e) {
    dispatch({ type: ACTION.SET_COUNT, payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: ACTION.SET_STEP, payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: ACTION.RESET, payload: InitialState });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
