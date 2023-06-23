import React from "react";
import { Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./Components/Styles";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import BMR from "./Components/BMR";
import Exercises from "./Components/Exercises";
import Meals from "./Components/Meals";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Register from "./Components/Register";
import Questionaire from "./Components/Questionaire";

function App() {
  return (
    <div>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BMR" element={<BMR />} />
        <Route path="/Exercises" element={<Exercises />} />
        <Route path="/Meals" element={<Meals />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Questionaire" element={<Questionaire />} />
      </Routes>
    </div>
  );
}

export default App;
