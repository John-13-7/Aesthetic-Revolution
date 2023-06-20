import React from "react";
import { LogoutDiv } from "./Styles";
import { useDispatch } from "react-redux";
import { logout } from "../Store/userSlice";

function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    fetch("http://localhost:4000/Users/logout", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
    dispatch(logout());
  };

  return (
    <LogoutDiv>
      <h1>Logout</h1>
      <div className="container">
        <button onClick={handleLogout}>Click to logout</button>
      </div>
    </LogoutDiv>
  );
}

export default Logout;
