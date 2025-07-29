import React, { Suspense } from "react";
import "./App.css";

const RemoteApp = React.lazy(() => import("remote/App"));

function App() {
  return (
    <div className="App">
      <h1>Host Application</h1>
      <div>
        <h2>Remote Application below:</h2>
        <Suspense fallback="Loading remote app...">
          <RemoteApp />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
