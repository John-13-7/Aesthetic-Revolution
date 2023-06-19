import React from "react";
import {Route, Routes} from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import BMR from "./Components/BMR";
function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BMR" element={<BMR/>} />
      </Routes>
    </div>
  );
}

export default App;
