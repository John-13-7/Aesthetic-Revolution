import React, { useState } from "react";
import { BMRStyles } from "./Styles";
function BMR() {
  const [input, setInput] = useState({
    weight: "",
    height: "",
    age: "",
  });

  const [userBMR, setUserBMR] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bmr =
      //hombres
      66.5 +
      13.75 * parseFloat(input.weight) +
      5.003 * parseFloat(input.height) -
      6.755 * parseFloat(input.age);
    setUserBMR(bmr.toFixed(2));
  };

  return (
    <div>
      <BMRStyles onSubmit={handleSubmit}>
        <label htmlFor="weight">Weight(KG):</label>
        <input
          type="text"
          name="weight"
          value={input.weight}
          onChange={handleChange}
        />
        <label htmlFor="height">Height(CM):</label>
        <input
          type="text"
          name="height"
          value={input.height}
          onChange={handleChange}
        />
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          name="age"
          value={input.age}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </BMRStyles>
      <p>BMR: {userBMR}</p>
    </div>
  );
}

export default BMR;
