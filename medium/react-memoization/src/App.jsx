import React, { useMemo, useState } from "react";
import "./styles.css";

// fib calculator
const fib = (inputNum) => {
  return inputNum <= 2 ? 1 : fib(inputNum - 1) + fib(inputNum - 2);
};

const App = () => {
  const [fibInp, setFibInp] = useState("");
  const [nameInp, setNameInp] = useState("");

  const fibNumber = useMemo(() => fib(fibInp), [fibInp]);
  // const fibNumber = fib(fibInp);

  return (
    <form className="form">
      <fieldset className="form__field">
        <label htmlFor="name" className="form__field-label">
          Fib
        </label>
        <input
          type="number"
          name="fib"
          className="form__field-input"
          value={fibInp}
          onChange={(e) => setFibInp(e.target.value)}
        />
        <p className="form__output">{fibNumber}</p>
      </fieldset>
      <fieldset className="form__field">
        <label htmlFor="name" className="form__field-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="form__field-input"
          value={nameInp}
          onChange={(e) => setNameInp(e.target.value)}
        />
        <p className="form__output">{nameInp}</p>
      </fieldset>
    </form>
  );
};

export default App;
