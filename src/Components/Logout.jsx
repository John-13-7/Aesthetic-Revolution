import React from "react";
import { useNavigate } from "react-router-dom";
import { LogoutDiv } from "./Styles";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:4000/Users/logout", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => console.error(error));
    navigate("/");
    window.location.reload();
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
