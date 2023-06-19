import styled from "styled-components";

export const BMRStyles = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input[type="text"] {
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  button[type="submit"] {
    padding: 10px;
  }
`;
