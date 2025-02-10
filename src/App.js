import { useState, useEffect } from "react";
import "./App.css";
import { generateRandomNumber } from "./random";

function App() {
  const [randomNo, setRandomNo] = useState(generateRandomNumber());
  const [answer, setAnswer] = useState("");
  const [logs, setLogs] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    const answers = answer.split("").map((item) => Number(item));

    // if (answers.some((number) => isNaN(number))) {
    //   alert("숫자만 입력해주세요");
    //   return;
    // }

    // if (answers.length !== 4) {
    //   alert("4자리 숫자만 입력해주세요");
    //   return;
    // }

    const isDuplicate = answers.some((number) => {
      // [1,2,3,4] 앞에서 탐색했을때 index= 0
      // 뒤에서 탐색했을때 index= 0
      // [1,1,2,4] 앞에서 탐색했을때 index= 0
      // 뒤에서 탐색했을때 index= 1

      return answers.indexOf(number) !== answers.lastIndexOf(number);
    });

    if (isDuplicate) {
      alert("입력 값에 중복이 있어요");
      return;
    }

    console.log("isDuplicate: ", isDuplicate);

    const { strike, ball } = randomNo.reduce(
      (prev, number, idx) => {
        // 같은 자리에 같은 수가 존재하면 스트라이크
        if (answers[idx] === number) {
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
      alert("정답입니다🌟🎈");
      setLogs([...logs, `${answer} 축하합니다 정답입니다🎉🎈🌟`]);
      setIsSuccess(true);
      return;
    }

    setLogs((prevLogs) => [
      ...prevLogs,
      `${answer} (strike: ${strike}, ball: ${ball})`,
    ]);
  };

  const handleRetry = () => {
    setRandomNo(generateRandomNumber());
    setAnswer("");
    setLogs([]);
    setIsSuccess(false);
  };

  return (
    <div className="App">
      <h1>숫자 야구 게임</h1>
      <header className="header">
        {isSuccess ? `정답: ${answer}` : "------"}
      </header>
      <section>
        <input
          type="text"
          value={answer}
          onChange={handleAnswerChange}
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
          }
          maxLength={4}
          disabled={isSuccess}
        />
        {isSuccess ? (
          <button onClick={handleRetry}>다시하기</button>
        ) : (
          <button onClick={handleSubmit}>맞춰보기</button>
        )}
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
