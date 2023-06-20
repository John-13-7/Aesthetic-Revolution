import styled from "styled-components";
import { Link } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body{
    font-family: "Open-sans", sans-serif;
  }
`;

//BMR
export const BMRStyles = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input[type="text"] {
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  button[type="submit"] {
    margin-top: 10px;
    padding: 10px;
  }

  label {
    margin-bottom: 10px;
  }
`;

//Nav
export const StyledNav = styled.nav`
  background-color: #f1f1f1;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;

  a {
    text-decoration: none;
  }
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  margin: 0 10px;
  font-weight: bold;

  &:hover {
    color: #666;
  }
`;

//Login
export const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;
export const LoginForm = styled.form`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(5, 4, 3, 0.5);
  background-color: #fff;

  label {
    margin-bottom: 10px;
  }

  input {
    margin-bottom: 10px;
  }

  button[type="submit"] {
    margin-top: 10px;
    padding: 5px 10px;
    font-size: 12px;
    text-align: center;
  }

  .create-account {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;

    h3 {
      margin-right: 10px;
    }
  }
`;

//Login
export const RegisterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;
export const RegisterForm = styled.form`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(5, 4, 3, 0.5);
  background-color: #fff;

  label {
    margin-bottom: 10px;
  }

  input {
    margin-bottom: 10px;
  }

  button[type="submit"] {
    margin-top: 10px;
    padding: 5px 10px;
    font-size: 12px;
    text-align: center;
  }
`;

//Logout
export const LogoutDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    box-shadow: 0 2px 4px rgba(0, 5, 0, 5);
    background-color: #fff;
    padding: 20px;
  }

  button {
    background: #000000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #e02ada;
    }
  }
`;
