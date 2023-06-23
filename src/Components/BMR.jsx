import React, { useState, useEffect } from "react";
import { BMRDiv, BMRForm } from "./Styles";
function BMR() {
  const [user, setUser] = useState("");
  const [input, setInput] = useState({
    weight: "",
    height: "",
    age: "",
    ft: "",
    in: "",
  });
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [isCM, setIsCM] = useState(false);
  const [isFT, setIsFT] = useState(false);
  const [isLB, setIsLB] = useState(false);
  const [isKG, setIsKG] = useState(false);
  const [userBMR, setUserBMR] = useState("");

  const handleButtonChange = (value) => {
    switch (value) {
      case "kgs":
        setIsKG(true);
        setIsLB(false);
        break;
      case "lbs":
        setIsLB(true);
        setIsKG(false);
        break;
      case "cm":
        setIsCM(true);
        setIsFT(false);
        break;
      case "ft":
        setIsFT(true);
        setIsCM(false);
        break;
      case "male":
        setIsMale(true);
        setIsFemale(false);
        break;
      case "female":
        setIsFemale(true);
        setIsMale(false);
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    //gender
    let gender = 0;
    if (isMale && !isFemale) {
      gender = 66.5;
    } else if (isFemale && !isMale) {
      gender = -5;
    }

    //weight
    let weight;
    if (isKG && !isLB) {
      weight = input.weight;
    } else if (isLB && !isKG) {
      weight = parseFloat(input.weight) * 0.45359237;
    }

    //height
    let height;
    if (isCM && !isFT) {
      height = parseFloat(input.height);
    } else if (isFT && !isCM) {
      height = (12 * parseFloat(input.ft) + parseFloat(input.in)) * 2.54;
    }

    const bmr =
      gender +
      13.75 * parseFloat(weight) +
      5.003 * parseFloat(height) -
      6.755 * parseFloat(input.age);
    setUserBMR(Math.floor(bmr));
    updateUser();
    e.preventDefault();
  };

  const fetchUser = () => {
    fetch("http://localhost:4000/Users/CurrentUser")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUser(data);
        } else {
          console.log("Error getting current user", data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateUser = () => {
    fetch("http://localhost:4000/Users/CurrentUser/BMR", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: user,
        bmr: userBMR,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
        } else {
          console.log("could not login");
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  return (
    <BMRDiv>
      <h1>BMR Calculator</h1>
      <BMRForm onSubmit={handleSubmit}>
        <label htmlFor="weight">Weight</label>
        <div>
          <button
            className={`${isKG ? "active" : ""}`}
            onClick={() => handleButtonChange("kgs")}
          >
            kgs
          </button>
          <button
            className={`${isLB ? "active" : ""}`}
            onClick={() => handleButtonChange("lbs")}
          >
            lbs
          </button>
        </div>
        <input
          type="text"
          name="weight"
          placeholder="weight"
          value={input.weight}
          onChange={handleChange}
        />
        <label htmlFor="height">Height</label>
        <div>
          <button
            className={`${isCM ? "active" : ""}`}
            onClick={() => handleButtonChange("cm")}
          >
            cm
          </button>
          <button
            className={`${isFT ? "active" : ""}`}
            onClick={() => handleButtonChange("ft")}
          >
            ft/in
          </button>
        </div>
        {isFT && (
          <>
            <div>
              <input
                type="text"
                name="ft"
                placeholder="ft"
                value={input.ft}
                onChange={handleChange}
              ></input>
              <input
                type="text"
                name="in"
                placeholder="in"
                value={input.in}
                onChange={handleChange}
              ></input>
            </div>
          </>
        )}
        {isCM && (
          <input
            type="text"
            name="height"
            placeholder="cm"
            value={input.height}
            onChange={handleChange}
          />
        )}
        <label htmlFor="age">Age</label>
        <input
          type="text"
          name="age"
          placeholder="age"
          value={input.age}
          onChange={handleChange}
        />
        <label htmlFor="gender">Gender</label>
        <div>
          <button
            className={`${isMale ? "active" : ""}`}
            onClick={() => handleButtonChange("male")}
          >
            male
          </button>
          <button
            className={`${isFemale ? "active" : ""}`}
            onClick={() => handleButtonChange("female")}
          >
            female
          </button>
        </div>
        <button type="submit">Submit</button>
      </BMRForm>
      <h2>Calculated BMR {userBMR}</h2>
      <h2>Da user: {user}</h2>
    </BMRDiv>
  );
}

export default BMR;