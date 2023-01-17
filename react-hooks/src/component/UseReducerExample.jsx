import { useState, useReducer } from "react";

const ACTION = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  NEW_USER_INPUT: "newUserInput",
  TG_COLOR: "tgColor",
};

const reducer = (state, action) => {
  // do something to our state, based on the action dispatched
  switch (action.type) {
    case ACTION.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTION.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTION.NEW_USER_INPUT:
      return { ...state, userInput: action.payload };
    case ACTION.TG_COLOR:
      return { ...state, color: !state.color };
    default:
      throw new Error(); // to handle unexpected action
  }
};

const initialState = {
  count: 0,
  userInput: "",
  color: false,
};

const UseReducerExample = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      {" "}
      <input
        type="text"
        value={state.userInput}
        onChange={(e) =>
          dispatch({ type: ACTION.NEW_USER_INPUT, payload: e.target.value })
        }
      />
      <br />
      <br />
      <p style={{ color: state.color ? "#FFF" : "#FFF952" }}>{state.count}</p>
      <section>
        <button onClick={() => dispatch({ type: ACTION.DECREMENT })}>-</button>
        <button onClick={() => dispatch({ type: ACTION.INCREMENT })}>+</button>
        <button onClick={() => dispatch({ type: ACTION.TG_COLOR })}>
          Color
        </button>
      </section>
      <br />
      <br />
      <p style={{ color: state.color ? "#FFF" : "#FFF952" }}>
        {state.userInput}
      </p>
    </div>
  );
};

export default UseReducerExample;
