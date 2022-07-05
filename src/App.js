import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [playersNumber, setPlayersNumber] = useState(null);
  const [gameWon, setGameWon] = useState(false);

  const drawNumber = () => {
    setRandomNumber(Math.trunc(Math.random() * 10) + 1);
  };
  console.log(randomNumber, playersNumber);

  useEffect(() => {
    if (randomNumber && playersNumber) {
      if (randomNumber === playersNumber) {
        setGameWon(true);
      }
    }
  }, [randomNumber, playersNumber]);

  return (
    <div className="App">
      <h1>Guess a Number</h1>
      <button onClick={drawNumber}>Draw a number</button>
      <div className="game">
        <div className="players-number">
          <form>
            <label>
              <span>Type a number (1 to 10)</span>
              <input
                type="text"
                onChange={(event) =>
                  setPlayersNumber(parseInt(event.target.value))
                }
              />
            </label>
          </form>
        </div>
        <div className="random-number">
          {gameWon ? <span>{randomNumber}</span> : <div>?</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
