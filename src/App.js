import { useEffect, useState } from "react";
import "./App.css";

/* validate input, onChange -> onEnter?? */

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [playersNumber, setPlayersNumber] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [numTooLow, setNumTooLow] = useState(false);
  const [numTooHigh, setNumTooHigh] = useState(false);
  const [score, setScore] = useState(4);
  const [gameOver, setGameOver] = useState(false);

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
        setNumTooLow(false);
        setNumTooHigh(false);
      } else if (playersNumber < randomNumber) {
        setNumTooLow(true);
        setNumTooHigh(false);
        handleScore();
      } else if (playersNumber > randomNumber) {
        setNumTooHigh(true);
        setNumTooLow(false);
        handleScore();
      }
    }
  }, [randomNumber, playersNumber]);

  // handling game over
  useEffect(() => {
    if (score <= 0) {
      setGameOver(true);
      setNumTooLow(false);
      setNumTooHigh(false);
    }
  }, [score]);

  // resetting game
  const resetGame = () => {
    setRandomNumber(null);
    setPlayersNumber(null);
    setGameWon(false);
    setGameOver(false);
    setScore(4);
  };

  // handle score
  const handleScore = () => {
    setScore((prevScore) => prevScore - 1);
  };

  return (
    <div className="App">
      <h1>Guess a Number</h1>
      {!randomNumber && <div>Draw a number by clicking on the box below</div>}
      <div className="game">
        {randomNumber && (
          <div className="players-number">
            <form onSubmit={(e) => e.preventDefault()}>
              <label>
                <span>
                  Type a number from {`${min} to ${max}`} <br /> and hit Enter
                </span>
                <input
                  type="text"
                  onKeyUp={(e) =>
                    e.key === "Enter" &&
                    setPlayersNumber(parseInt(e.target.value))
                  }
                />
              </label>
            </form>
            <div className="score">Number of guesses left: {score}</div>
            {isNaN(playersNumber) && (
              <div style={{ color: "red" }}>You must enter a number!</div>
            )}
          </div>
        )}
        <div className="random-number" onClick={drawNumber}>
          {gameWon ? <span>{randomNumber}</span> : <span>?</span>}
        </div>
      </div>
      {gameWon && (
        <div className="game-won-message">
          <h1>You win! 🎊</h1>
          <button onClick={resetGame}>Play again</button>
        </div>
      )}
      {gameOver && (
        <div className="game-over-message">
          <h1>You lose! 😖</h1>
          <button onClick={resetGame}>Play again</button>
        </div>
      )}
      {numTooLow && (
        <div className="num-too-low">
          Your number -- {playersNumber} -- is too low!
        </div>
      )}
      {numTooHigh && (
        <div className="num-too-high">
          Your number -- {playersNumber} -- is too high!
        </div>
      )}
    </div>
  );
}

export default App;
