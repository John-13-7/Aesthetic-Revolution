import React from "react";
import { Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./Components/Styles";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import BMR from "./Components/BMR";
import Exercices from "./Components/Exercises";
import MealPlans from "./Components/MealPlans";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Register from "./Components/Register";
function App() {
  return (
    <div>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BMR" element={<BMR />} />
        <Route path="/Exercises" element={<Exercices />} />
        <Route path="/MealPlans" element={<MealPlans />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
