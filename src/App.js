import { useEffect, useState } from "react";
import "./App.css";

/* validate input, onChange -> onEnter?? */

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [playersNumber, setPlayersNumber] = useState(null);
  const [gameWon, setGameWon] = useState(false);

  //drawing a random number
  const min = 1;
  const max = 20;
  const drawNumber = () => {
    if (!randomNumber) {
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
        {randomNumber && (
          <div className="players-number">
            <form onSubmit={(event) => event.preventDefault()}>
              <label>
                <span>Type a number: {`${min} to ${max}`}</span>
                <input
                  type="text"
                  onKeyUp={(e) =>
                    e.key === "Enter" &&
                    setPlayersNumber(parseInt(e.target.value))
                  }
                />
              </label>
            </form>
          </div>
        )}
        <div className="random-number">
          {gameWon ? <span>{randomNumber}</span> : <span>?</span>}
        </div>
      </div>
    </div>
  );
}

export default App;
