import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td style={{ border: " 1px solid black" }}>{text}</td>
      <td style={{ border: " 1px solid black" }}>{text == "average" || text == "positive" ? value.toFixed(2) : value}{text == "positive" ? '%' : ''}</td>
    </tr>
  );
};

//Display statistics
const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  if (good + bad + neutral == 0)
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  else
    return (
      <div>
        <table style={{ border: " 1px solid black" }}>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine
            text="average"
            value={(bad * -1 + good + neutral * 0) / (good + bad + neutral)}
          />
          <StatisticLine
            text="positive"
            value={(good * 100) / (good + neutral + bad)}
          />
        </table>
      </div>
    );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div>
      <p>Give Feedback</p>

      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h3>statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
export default App;
