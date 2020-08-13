import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>
      {props.value}
      {props.percentage ? " %" : ""}
    </td>
  </tr>
);

const Button = (props) => {
  return (
    <div>
      <button onClick={() => props.handleClick("good")}>good</button>
      <button onClick={() => props.handleClick("neutral")}>neutral</button>
      <button onClick={() => props.handleClick("bad")}>bad</button>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (feedbackType) => {
    switch (feedbackType) {
      case "good":
        setGood(good + 1);
        break;

      case "neutral":
        setNeutral(neutral + 1);
        break;

      case "bad":
        setBad(bad + 1);
        break;

      default:
        break;
    }
  };

  let all = good + neutral + bad;
  let average = (good * 1 + bad * -1) / all || 0;
  let positive = (good / all) * 100 || 0;
  const statistics =
    all === 0 ? (
      <p>No feedback given</p>
    ) : (
      <div>
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={all} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={positive} percentage />
          </tbody>
        </table>
      </div>
    );

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClick} />
      <h1>statistics</h1>
      {statistics}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
