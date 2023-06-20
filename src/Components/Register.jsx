import React, { useState } from "react";
import { RegisterDiv, RegisterForm } from "./Styles";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "confirmEmail":
        setConfirmEmail(value);
        break;
    }
  };

  const handleSubmit = (e) => {
    if (password === confirmPassword && email === confirmEmail) {
      fetch("http://localhost:4000/Users/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          password: password,
          email: email,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Could not register");
          }
        })
        .then((data) => {
          console.log("Token:", data.token);
        })
        .catch((error) => {
          console.log("Error:", error.message);
        });
    } else {
      console.log("User and password do not match");
    }
    setUsername("");
    setEmail("");
    setConfirmEmail("");
    setPassword("");
    setConfirmPassword("");
    e.preventDefault();
  };

  return (
    <RegisterDiv>
      <h1>Register</h1>
      <RegisterForm onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          placeholder="username"
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        ></input>
        <label>Email</label>
        <input
          placeholder="input email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        ></input>
        <input
          placeholder="retype email"
          type="email"
          name="confirmEmail"
          value={confirmEmail}
          onChange={handleChange}
        ></input>
        <label>Password</label>
        <input
          placeholder="password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        ></input>
        <input
          placeholder="retype password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        ></input>
        <button type="submit">Register</button>
      </RegisterForm>
      <h6>{password}</h6>
    </RegisterDiv>
  );
}

export default Register;
