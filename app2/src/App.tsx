import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h2>Remote Application</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Remote count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
