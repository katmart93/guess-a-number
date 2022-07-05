import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Guess a Number</h1>
      <button>Draw a number</button>
      <div className="game">
        <div className="users-number">
          <form>
            <label>
              <span>Type your number</span>
              <input type="text" />
            </label>
          </form>
        </div>
        <div className="random-number">?</div>
      </div>
    </div>
  );
}

export default App;
