import React, { useEffect, useState } from "react";
import { QConfirmationDiv, QConfirmatonList } from "./Styles";
function QuestionaireConfirmation() {
  const [userData, setUserData] = useState([]);

  const fetchUserData = () => {
    fetch("http://localhost:4000/Users/CurrentUser/details")
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          console.log("User not found:", data.message);
        } else {
          setUserData(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <QConfirmationDiv>
      <h1>Confirm Answers</h1>
      <QConfirmatonList>
        <h2>Maintenance calories: {userData.bmr}</h2>
        <h2>Bulking or cutting: {userData.goals}</h2>
        {userData.goals === "bulk" ? (
          <h2>Bulking pounds per week: {userData.bulkpounds}</h2>
        ) : (
          <h2>Cutting pounds per week: {userData.cutpounds}</h2>
        )}
        {userData.ismeal ? (
          <>
            <h2>Meal plan: yes</h2>
            <h2>Food allergies: {userData.foodallergies.join(", ")}</h2>
            <h2>Special type(s): {userData.foodtypes}</h2>{" "}
          </>
        ) : (
          <h2>Meal plan: no</h2>
        )}
        {userData.istrain ? (
          <>
            <h2>Training plan: yes</h2>
            <h2>Training days per week: {userData.trainingdays}</h2>
            <h2>Weak muscle(s): {userData.trainingfocus.join(", ")}</h2>
          </>
        ) : (
          <h2>Training plan: no</h2>
        )}
      </QConfirmatonList>
    </QConfirmationDiv>
  );
}

export default QuestionaireConfirmation;
