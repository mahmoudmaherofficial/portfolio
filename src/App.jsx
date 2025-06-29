import { Route, Routes } from "react-router";
import Home from "./Home";

function App() {
  return (
    <div id="App">
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </div>
  );
}

export default App;
