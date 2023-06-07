import { Routes, Route } from "react-router";
import "./App.css";
import Content from "./components/content";
import Login from "./components/login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Content />} />
      </Routes>
    </div>
  );
}

export default App;
