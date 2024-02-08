import React, { useState } from "react";
import "./App.css";

function App() {
  let [expression, setExpression] = useState("");
  let [total, setTotal] = useState(null);

  function handleActionClick(action) {
    setExpression(function (prevExpression) {
      return prevExpression + action;
    });
    setTotal(null);
  }

  function generateNumber(value) {
    setExpression(function (prevExpression) {
      return prevExpression + value;
    });
    setTotal(null);
  }

  function calculateResult(expression) {
    const parts = expression.split(/([+\-*/])/);
    let result = 0;
    let currentOperator = "+";

    for (let part of parts) {
      if (["+", "-", "*", "/"].includes(part)) {
        currentOperator = part;
      } else {
        const num = parseFloat(part);
        switch (currentOperator) {
          case "+":
            result += num;
            break;
          case "-":
            result -= num;
            break;
          case "*":
            result *= num;
            break;
          case "/":
            result /= num;
            break;
          default:
            break;
        }
      }
    }

    return result;
  }

  function result() {
    const resultValue = calculateResult(expression);
    setTotal(resultValue);
  }

  function clearOutput() {
    setExpression("");
    setTotal(null);
  }

  return (
    <div className="App flex justify-center items-center flex-col h-screen bg-gray-900 text-white">
      <div className="text-4xl mb-4">
        {expression} {total !== null ? `= ${total}` : ""}
      </div>
      <div className="grid grid-cols-4 gap-4 w-64">
        {[7, 8, 9, "/"].map(function (value) {
          return (
            <button
              key={value}
              className="bg-gray-700 text-white rounded-md p-2 w-full"
              onClick={function () {
                generateNumber(value);
              }}
            >
              {value}
            </button>
          );
        })}
        {[4, 5, 6, "*"].map(function (value) {
          return (
            <button
              key={value}
              className="bg-gray-700 text-white rounded-md p-2 w-full"
              onClick={function () {
                generateNumber(value);
              }}
            >
              {value}
            </button>
          );
        })}
        {[1, 2, 3, "-"].map(function (value) {
          return (
            <button
              key={value}
              className="bg-gray-700 text-white rounded-md p-2 w-full"
              onClick={function () {
                generateNumber(value);
              }}
            >
              {value}
            </button>
          );
        })}
        {[".", 0, "+"].map(function (value) {
          return (
            <button
              key={value}
              className="bg-gray-700 text-white rounded-md p-2 w-full"
              onClick={function () {
                generateNumber(value);
              }}
            >
              {value}
            </button>
          );
        })}
        <div>
          <button
            onClick={function () {
              if (expression) {
                result();
              }
            }}
            className="bg-green-500 text-white rounded-md p-2 w-full"
          >
            =
          </button>
        </div>
        <div>
          <button
            onClick={function () {
              clearOutput();
            }}
            className="bg-red-500 text-white rounded-md p-2 w-full"
          >
            CLEAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
