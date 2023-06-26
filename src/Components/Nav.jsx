import React, { useEffect, useState } from "react";
import { StyledNav, StyledLink } from "./Styles";

function Nav() {
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userValidation = () => {
    if (currentUser !== "") {
      setIsLoggedIn(true);
    }
  };

  const fetchUser = () => {
    fetch("http://localhost:4000/Users/CurrentUser")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setCurrentUser(data);
          userValidation();
        } else {
          console.log("Error getting current user", data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, [currentUser]);

  return (
    <StyledNav>
      <StyledLink to="/">Aesthetic Revolution</StyledLink>
      <StyledLink to="/BMR">BMR</StyledLink>
      <StyledLink to="/Exercises">Exercises</StyledLink>
      <StyledLink to="/Meals">Meals</StyledLink>
      <StyledLink to="/Questionaire">Questionaire</StyledLink>
      {!isLoggedIn ? (
        <StyledLink to="/Login">Login</StyledLink>
      ) : (
        <StyledLink to="/Logout">Logout</StyledLink>
      )}
    </StyledNav>
  );
}

export default Nav;
