import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import Signup from "../scenes/Signup";
import Login from "../scenes/login";
import MainContent from "../scenes/MainContent";

function App() {
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const Authenticated = Boolean(useSelector((state) => state.user));

  return (
    <>
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                isLoginScreen === true ? (
                  <Login changePage={setIsLoginScreen} />
                ) : (
                  <Signup changePage={setIsLoginScreen} />
                )
              }
            />
            <Route
              path="/home"
              element={
                Authenticated === true ? <MainContent /> : <Navigate to="/" />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
