import { useState } from "react";
import reactLogo from "./assets/lemon.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Rspack + React</h1>
      <div className="card">
        <button
          type="button"
          className="lemon-button"
          onClick={() => setCount((count) => count + 1)}
        >
          <img src={reactLogo} alt="Lemon" className="lemon-icon" />
          count is {count}
        </button>
        <h1 className="title">
          Deployed application with
          <span className="zephyr">Zephyr</span>
          and
          <span className="mf">Module Federation</span>
        </h1>
      </div>
      <p className="footer">Created by Ramon 🍋</p>
    </div>
  );
}

export default App;
