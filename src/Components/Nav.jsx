import React, { useState, useEffect } from "react";
import { StyledNav, StyledLink } from "./Styles";
import { useSelector } from "react-redux";

function Nav() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");

  const userValidation = () => {
    if (userData !== "") {
      setIsLoggedIn(true);
    }
  };

  const fetchUser = () => {
    fetch("http://localhost:4000/Users/CurrentUser")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUserData(data);
          userValidation();
          console(userData);
        } else {
          console.log("Error getting current user", data);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchUser();
  }, [userData]);

  return (
    <StyledNav>
      <StyledLink to="/">Aesthetic Revolution</StyledLink>
      <StyledLink to="/BMR">BMR</StyledLink>
      <StyledLink to="/Exercises">Exercises</StyledLink>
      <StyledLink to="/MealPlans">Meal Plans</StyledLink>
      <StyledLink to="/Login">Login</StyledLink>
      <StyledLink to="/Logout">Logout</StyledLink>
      {isLogged || isLoggedIn ? <h5>{userData}</h5> : <h4>guest</h4>}
    </StyledNav>
  );
}

export default Nav;
