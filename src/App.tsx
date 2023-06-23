import { Routes, Route } from "react-router";
import "./App.css";
import Content from "./components/content";
import Login from "./components/login";
import { useEffect, useState } from "react";
import { createContext } from "react";

const LogInContext = createContext<any>(0);
function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);
  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      localStorage.getItem("role") !== "superAdmin"
    ) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  return (
    <LogInContext.Provider value={setLoggedIn}>
      <div className="App">
        <Routes>
          <Route path="*" element={loggedIn ? <Content /> : <Login />} />
        </Routes>
      </div>
    </LogInContext.Provider>
  );
}
export { LogInContext };
export default App;
