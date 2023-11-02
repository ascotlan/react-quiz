import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";

const initialState = {
  questions: [],
  status: "loading", //'loading', 'error', 'ready', 'active', 'finsihed'
  index: 0,
  answer: null,
  points: 0,
  highscore: 0
};

const ACTION = {
  DATA_RECEIVED: "DATA_RECEIVED",
  DATA_FAILED: "DATA_FAILED",
  ACTIVE: "ACTIVE",
  NEW_ANSWER: "NEW_ANSWER",
  NEXT_QUESTION: "NEXT_QUESTION",
  FINISHED: "FINISHED",
  RESTART: "RESTART"
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.DATA_RECEIVED:
      return { ...state, questions: action.payload, status: "ready" };
    case ACTION.DATA_FAILED:
      return { ...state, status: "error" };
    case ACTION.ACTIVE:
      return { ...state, status: "active" };
    case ACTION.NEW_ANSWER:
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case ACTION.NEXT_QUESTION:
      return { ...state, index: state.index + 1, answer: null };
    case ACTION.FINISHED:
        return { ...state, status: "finished", highscore: state.points > state.highscore ? state.points : state.highscore };
    case ACTION.RESTART:
        return { ...state, status:"ready", points: 0, index: 0, answer: null };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, curr) => acc + curr.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: ACTION.DATA_RECEIVED, payload: data }))
      .catch((err) => dispatch({ type: ACTION.DATA_FAILED }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
            action={ACTION}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              action={ACTION}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} action={ACTION} index={index} numQuestions={numQuestions} />
          </>
        )}
        {status === "finished" && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch} action={ACTION}/>}
      </Main>
    </div>
  );
}

export default App;
