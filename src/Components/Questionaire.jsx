import React, { useState, useEffect } from "react";
import { QDiv, QQuestions } from "./Styles";
function Questionaire() {
  const [indexStack, setIndexStack] = useState([0]);
  const [index, setIndex] = useState(0);

  const [answersStack, setAnswersStack] = useState([
    {
      goals: "",
      bulk: "",
      cut: "",
      isMeal: false,
      meals: [],
      allergies: [],
      types: [],
      days: "",
      focus: [],
    },
  ]);

  const answers = answersStack[answersStack.length - 1];

  const handleAnswer = (value, nextIndex, answerKey) => {
    const newAnswers = { ...answers, [answerKey]: value };
    setAnswersStack((prev) => [...prev, newAnswers]);
    setIndexStack((prev) => [...prev, nextIndex]);
    setIndex(nextIndex);
  };

  const handleReturn = () => {
    setIndexStack((prev) => {
      if (prev.length === 1) {
        return prev;
      }

      const newStack = [...prev];
      newStack.pop();
      setIndex(newStack[newStack.length - 1]); // set index here
      return newStack;
    });

    setAnswersStack((prev) => {
      if (prev.length === 1) {
        return prev;
      }

      const newStack = [...prev];
      newStack.pop();
      return newStack;
    });
  };

  useEffect(() => {
    console.log(indexStack, answersStack);
  }, [indexStack, answersStack]);

  const renderQuestion = () => {
    switch (index) {
      case 0:
        return (
          <QQuestions>
            <h1>Bulking or Cutting</h1>
            <button
              onClick={() => {
                handleAnswer("bulk", 1, "goals");
              }}
            >
              bulk
            </button>
            <button
              onClick={() => {
                handleAnswer("cut", 2, "goals");
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
                  handleAnswer(1, 3, "bulk");
                }}
              >
                1 pounds
              </button>
              <button
                onClick={() => {
                  handleAnswer(2, 3, "bulk");
                }}
              >
                2 pounds
              </button>
              <button
                onClick={() => {
                  handleAnswer(3, 3, "bulk");
                }}
              >
                3 pounds
              </button>
            </div>
            <div>
              <button onClick={() => handleReturn()}>previous</button>
            </div>
          </QQuestions>
        );
      //bulking
      case 2:
        return (
          <QQuestions>
            <h1>How shreddier weekly?</h1>
            <div>
              <button
                onClick={() => {
                  handleAnswer(1, 3, "cut");
                }}
              >
                1 pounds
              </button>
              <button
                onClick={() => {
                  handleAnswer(1.5, 3, "cut");
                }}
              >
                1.5 pounds
              </button>
              <button
                onClick={() => {
                  handleAnswer(2, 3, "cut");
                }}
              >
                2 pounds
              </button>
            </div>
            <div>
              <button onClick={() => handleReturn()}>previous</button>
            </div>
          </QQuestions>
        );
      //cutting
      case 3:
        return (
          <QQuestions>
            <h1>Would you like a meal plan?</h1>
            <div>
              <button onClick={() => handleAnswer(true, 4, "isMeal")}>
                yes
              </button>
              <button onClick={() => handleAnswer(false, 6, "isMeal")}>
                no
              </button>
            </div>
            <div>
              <button onClick={() => handleReturn()}>previous</button>
            </div>
          </QQuestions>
        );
      //yes or no
      case 4:
        return (
          <QQuestions>
            <div>
              <h1>Do you have any allergies? Select all that apply</h1>
              <button>nuts</button>
              <button>shellfish</button>
              <button>fish</button>
              <button>eggs</button>
              <button>milk</button>
              <button>soy</button>
              <button>wheat</button>
            </div>
            <div>
              <button onClick={() => handleReturn()}>prev</button>
              <button>next</button>
            </div>
          </QQuestions>
        );
      //nuts, shellfish, fish, eggs, milk, soy, and wheat
      case 5:
        return (
          <QQuestions>
            <div>
              <h1>Any specific types?</h1>
              <button>vegan</button>
              <button>vegetarian</button>
              <button>halal</button>
              <button>kosher</button>
              <button>keto</button>
            </div>
            <div>
              <button onClick={() => handleReturn()}>prev</button>
              <button>next</button>
            </div>
          </QQuestions>
        );
      //vegan, vegetarian, halal, keto, kosher
      case 6:
        return (
          <QQuestions>
            <div>
              <h1>Would you like a workout plan?</h1>
              <button>yes</button>
              <button>no</button>
            </div>
            <div>
              <button>prev</button>
            </div>
          </QQuestions>
        );
      //yes or no
      case 7:
        return (
          <QQuestions>
            <div>
              <h1>How many days a week do you want to train?</h1>
              <button>2</button>
              <button>3</button>
              <button>5</button>
            </div>
            <div>
              <button>prev</button>
            </div>
          </QQuestions>
        );
      // can be 2-7 days is fine?
      case 8:
        return (
          <QQuestions>
            <div>
              <h1>What are your weak points?</h1>
              <button>glutes</button>
              <button>hamstrings</button>
              <button>calves</button>
              <button>quads</button>
              <button>lats</button>
              <button>shoulders</button>
              <button>chest</button>
              <button>biceps</button>
              <button>triceps</button>
            </div>
          </QQuestions>
        );
      //glutes, hamstrings, calves, quads, lats, delts, shoulders, chest, biceps, triceps,
      default:
        return (
          <QQuestions>
            <button>Submit</button>
          </QQuestions>
        );
    }
  };
  return <QDiv>{renderQuestion()}</QDiv>;
}

export default Questionaire;
