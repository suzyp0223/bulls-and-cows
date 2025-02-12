const Logs = (props) => {
  return (
    <>
      <h2>기록</h2>
      <ol>
        {props.logs.map((log, idx) => {
          return <li key={`${log}_${idx}`}>{log}</li>;
        })}
      </ol>
    </>
  );
};

export default Logs;
