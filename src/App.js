import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [playersNumber, setPlayersNumber] = useState(null);
  const [gameWon, setGameWon] = useState(false);

  //drawing a random number
  const min = 1;
  const max = 20;
  const drawNumber = () => {
    if (!gameWon) {
      setRandomNumber(Math.trunc(Math.random() * (max - min + 1)) + min);
    }
  };

  console.log(randomNumber, playersNumber);
  // comparing numbers
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
              <span>Type a number {`${min} to ${max}`}</span>
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
