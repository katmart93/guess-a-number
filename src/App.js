import { useState } from "react";
import "./App.css";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);

  const drawNumber = () => {
    setRandomNumber(Math.trunc(Math.random() * 10) + 1);
  };
  console.log(randomNumber);

  return (
    <div className="App">
      <h1>Guess a Number</h1>
      <button onClick={drawNumber}>Draw a number</button>
      <div className="game">
        <div className="players-number">
          <form>
            <label>
              <span>Type a number (1 to 10)</span>
              <input type="text" />
            </label>
          </form>
        </div>
        <div className="random-number">
          <span>?</span>
        </div>
      </div>
    </div>
  );
}

export default App;
