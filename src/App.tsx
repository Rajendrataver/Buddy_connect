import { Routes, Route, useNavigate } from "react-router";
import "./App.css";
import Content from "./components/content";
import Login from "./components/login";
import { useEffect, useState } from "react";
import { createContext } from "react";

const LogInContext = createContext<any>(0);
function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      localStorage.getItem("role") !== "superAdmin"
    ) {
      setLoggedIn(false);
      navigate("/");
    } else {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  return (
    <LogInContext.Provider value={setLoggedIn}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Content />} />
        </Routes>
      </div>
    </LogInContext.Provider>
  );
}
export { LogInContext };
export default App;
