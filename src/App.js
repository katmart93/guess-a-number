import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [playersNumber, setPlayersNumber] = useState(null);
  const [numTooLow, setNumTooLow] = useState(false);
  const [numTooHigh, setNumTooHigh] = useState(false);
  const [score, setScore] = useState(4);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  //drawing a random number
  const min = 1;
  const max = 20;
  const drawNumber = () => {
    if (!randomNumber) {
      setRandomNumber(Math.trunc(Math.random() * (max - min + 1)) + min);
    }
  };

  // console.log(randomNumber, playersNumber);
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

  // handling NaN entered by user in input
  useEffect(() => {
    if (isNaN(playersNumber)) {
      setNumTooLow(false);
      setNumTooHigh(false);
    }
  }, [playersNumber]);

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

  // handle background color
  const handleBGColor = () => {
    if (gameWon) {
      return {
        backgroundColor: "#0a4b4d",
      };
    } else if (gameOver) {
      return {
        backgroundColor: "#9f1e31",
      };
    }
  };

  return (
    <div className="App" style={handleBGColor()}>
      <div className="app-container">
        <h1>Guess a Number</h1>
        <div className="msg-container">
          {!randomNumber && (
            <div className="draw-a-number msg">
              <div>Draw a number by clicking on the box below</div>
            </div>
          )}
          {numTooLow && (
            <div className="num-too-low msg">
              <div>Your number -- {playersNumber} -- is too low!</div>
            </div>
          )}
          {numTooHigh && (
            <div className="num-too-high msg">
              <div>Your number -- {playersNumber} -- is too high!</div>
            </div>
          )}
          {gameWon && (
            <div className="game-won msg">
              <div>You win! 🎊</div>
              <button onClick={resetGame}>Play again</button>
            </div>
          )}
          {gameOver && (
            <div className="game-over msg">
              <div>You lose! 😖</div>
              <button onClick={resetGame}>Play again</button>
            </div>
          )}
        </div>
        <div className="game">
          {randomNumber && (
            <div className="players-number">
              <form onSubmit={(e) => e.preventDefault()}>
                <label>
                  <span>
                    Type a number from {`${min} to ${max}`} <br /> and hit Enter
                  </span>
                  <input
                    type="number"
                    onKeyUp={(e) =>
                      e.key === "Enter" &&
                      setPlayersNumber(parseInt(e.target.value))
                    }
                  />
                </label>
              </form>
              <div className="score">Number of guesses left: {score}</div>
              {isNaN(playersNumber) && (
                <div className="error-message" style={{ color: "#F70006" }}>
                  You must enter a number!
                </div>
              )}
            </div>
          )}
          <div className="random-number-box" onClick={drawNumber}>
            {gameWon ? <span>{randomNumber}</span> : <span>?</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
