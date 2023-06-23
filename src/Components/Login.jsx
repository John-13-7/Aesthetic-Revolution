import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginDiv, LoginForm } from "./Styles";

function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    fetch("http://localhost:4000/Users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/");
          window.location.reload();
        } else {
          console.log("could not login");
        }
      })
      .then((data) => {
        console.log(data);
      });
    setPassword("");
    setUsername("");
    e.preventDefault();
  };
  return (
    <LoginDiv>
      <h1>Login</h1>
      <LoginForm onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          placeholder="username"
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          placeholder="password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        ></input>
        <button type="submit">Login</button>
        <div className="create-account">
          <h3>No account? </h3>
          <h2 onClick={() => navigate("/Register")}>Register</h2>
        </div>
      </LoginForm>
    </LoginDiv>
  );
}

export default Login;
