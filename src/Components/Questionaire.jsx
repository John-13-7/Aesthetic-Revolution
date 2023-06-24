import React, { useState, useEffect } from "react";
import { QDiv, QQuestions } from "./Styles";
import { useNavigate } from "react-router-dom";

function Questionaire() {
  const [currentIndex, setIndex] = useState(0);
  const [enabledButtons, setEnabledButtons] = useState({});
  const [answers, setAnswers] = useState({
    goals: "", //bulk or cut
    bulkPounds: "", //1-2 pounds per week
    cutPounds: "", //1-2 pounds per week
    isMeal: false, //true or false whether the user wants a meal plan
    foodAllergies: [], //can be many or none of allergies
    foodTypes: "", //can be vegan, keto, etc...
    isTrain: false, //true or false whether you want a workout plan
    trainingDays: "", //how many days a week user trains
    trainingFocus: [], //weakpoints, like legs, chest, back etc
    mealPlan: [], // build the possible meals
    workoutPlan: [],
  });
  const navigate = useNavigate();

  const handleChange = (value, current, next) => {
    switch (current) {
      case 0: //bulk or cut
        setAnswers({ ...answers, goals: value });
        setIndex(next);
        break;
      case 1: //bulk
        setAnswers({ ...answers, bulkPounds: value });
        setIndex(next);
        break;
      case 2: //cut
        setAnswers({ ...answers, cutPounds: value });
        setIndex(next);
        break;
      case 3: //yes or no for meal plan
        setAnswers({ ...answers, isMeal: value });
        setIndex(next);
        break;
      case 4: //array of allergies or empty
        if (value === "next") {
          setIndex(next);
          break;
        }
        if (answers.foodAllergies.includes(value)) {
          setAnswers({
            ...answers,
            foodAllergies: answers.foodAllergies.filter(
              (item) => item !== value
            ),
          });
          setEnabledButtons({
            ...enabledButtons,
            [value]: !enabledButtons[value],
          });
        } else {
          setAnswers({
            ...answers,
            foodAllergies: [...answers.foodAllergies, value],
          });
          setEnabledButtons({
            ...enabledButtons,
            [value]: !enabledButtons[value],
          });
        }
        break;
      case 5: //vegan, keto...
        setAnswers({ ...answers, foodTypes: value });
        setIndex(next);
        break;
      case 6: //yes or no for training
        setAnswers({ ...answers, isTrain: value });
        setIndex(next);
        break;
      case 7: //2,3, or 5 days of training
        setAnswers({ ...answers, trainingDays: value });
        setIndex(next);
        break;
      case 8: //focus, legs, glutes, chest....
        if (value === "next") {
          setIndex(next);
          break;
        }
        if (answers.trainingFocus.includes(value)) {
          setAnswers({
            ...answers,
            trainingFocus: answers.trainingFocus.filter(
              (item) => item !== value
            ),
          });
          setEnabledButtons({
            ...enabledButtons,
            [value]: !enabledButtons[value],
          });
        } else {
          setAnswers({
            ...answers,
            trainingFocus: [...answers.trainingFocus, value],
          });
          setEnabledButtons({
            ...enabledButtons,
            [value]: !enabledButtons[value],
          });
        }
        break;
      case 9: //thanks
        break;
    }
  };

  const handleSubmit = () => {
    //write to file
    fetch("http://localhost:4000/Users/CurrentUser/Questionaire", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        goals: answers.goals,
        bulkpounds: answers.bulkPounds,
        cutpounds: answers.cutPounds,
        ismeal: answers.isMeal,
        foodallergies: answers.foodAllergies,
        foodtypes: answers.foodTypes,
        istrain: answers.isTrain,
        trainingdays: answers.trainingDays,
        trainingfocus: answers.trainingFocus,
        mealplan: answers.mealPlan,
        workoutplan: answers.workoutPlan,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to submit questionaire");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(answers);
    //navigate to confirmation page
    navigate("/Questionaire/confirmation");
  };

  const renderQuestion = () => {
    switch (currentIndex) {
      case 0:
        return (
          <QQuestions>
            <h1>Bulking or Cutting</h1>
            <button
              onClick={() => {
                //value, current index, next index
                handleChange("bulk", currentIndex, 1);
              }}
            >
              bulk
            </button>
            <button
              onClick={() => {
                handleChange("cut", currentIndex, 2);
              }}
            >
              cut
            </button>
          </QQuestions>
        );
      //bulking or cutting
      case 1:
        return (
          <QQuestions>
            <h1>How buffer weekly?</h1>
            <div>
              <button
                onClick={() => {
                  handleChange(1, currentIndex, 3);
                }}
              >
                1 pounds
              </button>
              <button
                onClick={() => {
                  handleChange(2, currentIndex, 3);
                }}
              >
                2 pounds
              </button>
              <button
                onClick={() => {
                  handleChange(3, currentIndex, 3);
                }}
              >
                3 pounds
              </button>
            </div>
          </QQuestions>
        );
      //bulking;
      case 2:
        return (
          <QQuestions>
            <h1>How shreddier weekly?</h1>
            <div>
              <button
                onClick={() => {
                  handleChange(1, currentIndex, 3);
                }}
              >
                1 pounds
              </button>
              <button
                onClick={() => {
                  handleChange(1.5, currentIndex, 3);
                }}
              >
                1.5 pounds
              </button>
              <button
                onClick={() => {
                  handleChange(2, currentIndex, 3);
                }}
              >
                2 pounds
              </button>
            </div>
          </QQuestions>
        );
      //cutting
      case 3:
        return (
          <QQuestions>
            <h1>Would you like a meal plan?</h1>
            <div>
              <button onClick={() => handleChange(true, currentIndex, 4)}>
                yes
              </button>
              <button onClick={() => handleChange(false, currentIndex, 6)}>
                no
              </button>
            </div>
          </QQuestions>
        );
      //yes or no
      case 4:
        return (
          <QQuestions>
            <div>
              <h1>Do you have any allergies? Select all that apply</h1>
              <button
                className={enabledButtons["nuts"] ? "highlighted" : ""}
                onClick={() => handleChange("nuts", currentIndex, 5)}
              >
                nuts
              </button>
              <button
                className={enabledButtons["shellfish"] ? "highlighted" : ""}
                onClick={() => handleChange("shellfish", currentIndex, 5)}
              >
                shellfish
              </button>
              <button
                className={enabledButtons["fish"] ? "highlighted" : ""}
                onClick={() => handleChange("fish", currentIndex, 5)}
              >
                fish
              </button>
              <button
                className={enabledButtons["eggs"] ? "highlighted" : ""}
                onClick={() => handleChange("eggs", currentIndex, 5)}
              >
                eggs
              </button>
              <button
                className={enabledButtons["milk"] ? "highlighted" : ""}
                onClick={() => handleChange("milk", currentIndex, 5)}
              >
                milk
              </button>
              <button
                className={enabledButtons["soy"] ? "highlighted" : ""}
                onClick={() => handleChange("soy", currentIndex, 5)}
              >
                soy
              </button>
              <button
                className={enabledButtons["wheat"] ? "highlighted" : ""}
                onClick={() => handleChange("wheat", currentIndex, 5)}
              >
                wheat
              </button>
            </div>
            <div>
              <button onClick={() => handleChange("next", currentIndex, 5)}>
                next
              </button>
            </div>
          </QQuestions>
        );
      //nuts, shellfish, fish, eggs, milk, soy, and wheat
      case 5:
        return (
          <QQuestions>
            <div>
              <h1>Any specific types?</h1>
              <button onClick={() => handleChange("none", currentIndex, 6)}>
                none
              </button>
              <button onClick={() => handleChange("vegan", currentIndex, 6)}>
                vegan
              </button>
              <button
                onClick={() => handleChange("vegetarian", currentIndex, 6)}
              >
                vegetarian
              </button>
              <button onClick={() => handleChange("halal", currentIndex, 6)}>
                halal
              </button>
              <button onClick={() => handleChange("kosher", currentIndex, 6)}>
                kosher
              </button>
              <button onClick={() => handleChange("keto", currentIndex, 6)}>
                keto
              </button>
            </div>
          </QQuestions>
        );
      //vegan, vegetarian, halal, keto, kosher
      case 6:
        return (
          <QQuestions>
            <div>
              <h1>Would you like a workout plan?</h1>
              <button onClick={() => handleChange("yes", currentIndex, 7)}>
                yes
              </button>
              <button onClick={() => handleChange("no", currentIndex, 9)}>
                no
              </button>
            </div>
          </QQuestions>
        );
      //yes or no
      case 7:
        return (
          <QQuestions>
            <div>
              <h1>How many days a week do you want to train?</h1>
              <button onClick={() => handleChange(2, currentIndex, 8)}>
                2
              </button>
              <button onClick={() => handleChange(3, currentIndex, 8)}>
                3
              </button>
              <button onClick={() => handleChange(5, currentIndex, 8)}>
                5
              </button>
            </div>
          </QQuestions>
        );
      // can be 2-7 days is fine?
      case 8:
        return (
          <QQuestions>
            <div>
              <h1>What are your weak points?</h1>
              <button
                className={enabledButtons["glutes"] ? "highlighted" : ""}
                onClick={() => handleChange("glutes", currentIndex, 9)}
              >
                glutes
              </button>
              <button
                className={enabledButtons["hamstrings"] ? "highlighted" : ""}
                onClick={() => handleChange("hamstrings", currentIndex, 9)}
              >
                hamstrings
              </button>
              <button
                className={enabledButtons["calves"] ? "highlighted" : ""}
                onClick={() => handleChange("calves", currentIndex, 9)}
              >
                calves
              </button>
              <button
                className={enabledButtons["quads"] ? "highlighted" : ""}
                onClick={() => handleChange("quads", currentIndex, 9)}
              >
                quads
              </button>
              <button
                className={enabledButtons["lats"] ? "highlighted" : ""}
                onClick={() => handleChange("lats", currentIndex, 9)}
              >
                lats
              </button>
              <button
                className={enabledButtons["shoulders"] ? "highlighted" : ""}
                onClick={() => handleChange("shoulders", currentIndex, 9)}
              >
                shoulders
              </button>
              <button
                className={enabledButtons["chest"] ? "highlighted" : ""}
                onClick={() => handleChange("chest", currentIndex, 9)}
              >
                chest
              </button>
              <button
                className={enabledButtons["biceps"] ? "highlighted" : ""}
                onClick={() => handleChange("biceps", currentIndex, 9)}
              >
                biceps
              </button>
              <button
                className={enabledButtons["triceps"] ? "highlighted" : ""}
                onClick={() => handleChange("triceps", currentIndex, 9)}
              >
                triceps
              </button>
              <button onClick={() => handleChange("next", currentIndex, 9)}>
                next
              </button>
            </div>
          </QQuestions>
        );
      case 9:
      //continue
      default:
        return (
          <QQuestions>
            <button onClick={handleSubmit}>Submit</button>
          </QQuestions>
        );
    }
  };
  return <QDiv>{renderQuestion()}</QDiv>;
}

export default Questionaire;
