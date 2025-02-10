import { useState, useEffect } from "react";
import "./App.css";
import { generateRandomNumber } from "./random";

function App() {
  const [randomNo] = useState(generateRandomNumber());
  const [answer, setAnswer] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    console.log("randomNo: ", randomNo);
  }, [randomNo]);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    // 스트라이크, 볼, 정답 유무

    const answers = answer.split("").map((item) => Number(item));

    const { strike, ball } = randomNo.reduce(
      (prev, cur, idx) => {
        // 같은 자리에 같은 수가 존재하면 스트라이크
        if (answers[idx] === cur) {
          return {
            ...prev,
            strike: prev.strike + 1,
          };
        }
        // 다른 자리에 수가 존재하면 볼
        if (answers.includes(cur)) {
          return {
            ...prev,
            ball: prev.ball + 1,
          };
        }

        return prev;
      },
      {
        strike: 0,
        ball: 0,
      }
    );

    if (strike === 4) {
      alert('정답입니다🌟🎈')
      setLogs([...logs, `${answer} 축하합니다 정답입니다🎉🎈🌟`]);
      return;
    }

    setLogs([...logs, `${answer} (strike: ${strike}, ball: ${ball})`]);
  };

  return (
    <div className="App">
      <h1>숫자 야구 게임</h1>
      <header className="header">{randomNo}</header>
      <section>
        <input type="text" value={answer} onChange={handleAnswerChange} />
        <button onClick={handleSubmit}>맞춰보기</button>
      </section>
      <h2>기록</h2>
      <ol>
        {logs.map((log, idx) => {
          // 반복문 사용시 key={} 키값 사용해야함 변경이 있을시 전부다 렌더링해야함. 키값으로 변경된것만 렌더링하기 위함.
          return <li key={`${log}_${idx}`}>{log}</li>;
        })}
      </ol>
    </div>
  );
}

export default App;
