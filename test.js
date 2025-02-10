import { useState, useEffect } from "react";
import "./App.css";
import { generateRandomNumber } from "./random";

const App = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [answer, setAnswer] = useState("");
  const [isSuccess, setSuccess] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    console.log(randomNumber);
  }, [randomNumber]);

  const handleAnswerChanged = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    const answers = answer.split("").map((item) => Number(item));

    if (answers.some((item) => isNaN(item))) {
      alert("숫자만 입력해주세요");
      return;
    }

    if (answers.length !== 4) {
      alert("4자리 숫자를 입력해주세요");
      return;
    }

    const isDuplicate = answers.some(function (x) {
      return answers.indexOf(x) !== answers.lastIndexOf(x);
    });

    if (isDuplicate) {
      alert("입력 값에 중복이 있어요.");
      return;
    }

    const { strike, ball } = randomNumber.reduce(
      (prev, number, index) => {
        // 같은 자리에 같은 수가 존재하면 스트라이크
        if (answers[index] === number) {
          return {
            ...prev,
            strike: prev.strike + 1,
          };
        }

        // 다른 자리에 수가 존재하면 볼
        if (answers.includes(number)) {
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
      alert("정답입니다!");
      setSuccess(true);
      setAnswer("");
      addLog({
        number: answer,
        strike,
        ball,
      });
      return;
    }

    setAnswer("");
    addLog({
      number: answer,
      strike,
      ball,
    });
  };

  const addLog = ({ number, strike, ball }) => {
    if (strike === 4) {
      const newMessage = `${number} (축하합니다. 정답입니다)`;
      setLogs([...logs, newMessage]);
      return;
    }

    if (strike === 0 && ball === 0) {
      const newMessage = `${number} (아웃)`;
      setLogs([...logs, newMessage]);
      return;
    }

    const newMessage = `${number} (strike: ${strike}, ball: ${ball})`;
    setLogs([...logs, newMessage]);
  };

  const handleRetry = () => {
    setRandomNumber(generateRandomNumber());
    setAnswer("");
    setLogs([]);
    setSuccess(false);
  };

  return (
    <main className="App">
      <h1>숫자 야구 게임</h1>
      <header style={{ marginBottom: "16px" }}>
        <span>{isSuccess ? randomNumber : "----"}</span>
      </header>
      <input
        type="text"
        value={answer}
        onChange={handleAnswerChanged}
        disabled={isSuccess}
      />
      {isSuccess ? (
        <button onClick={handleRetry}>다시하기</button>
      ) : (
        <button onClick={handleSubmit}>맞춰보기</button>
      )}
      <h2>기록</h2>
      <ol>
        {logs.map((message, index) => {
          return <li key={`${message}_${index}`}>{message}</li>;
        })}
      </ol>
    </main>
  );
};

export default App;
