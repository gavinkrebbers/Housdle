import { useState } from "react";

const Calculator = () => {
  const [display, setDisplay] = useState("");

  const handleButtonClick = (key) => {
    setDisplay((prev) => {
      if (prev == "An Error ocurred") {
        return key;
      }
      return prev + key;
    });
  };

  const handleClear = () => {
    setDisplay("");
  };

  const handleCalculate = () => {
    let nums = [];
    let operations = [];
    let curNum = "";
    // if starts with operation sign
    if (isNaN(display[0])) {
      setDisplay("An Error ocurred");
      return;
    }
    for (let index = 0; index < display.length; index++) {
      let char = display[index];

      //   if there are two operation signs next to each other
      if (
        index < display.length - 1 &&
        isNaN(char) &&
        isNaN(display[index + 1])
      ) {
        setDisplay("An Error ocurred");
        return;
      }

      // if its a operation sign
      //   add opertaion and num to the correct array and reset cur nu

      //   else if we are at the end

      if (isNaN(char) && char != ".") {
        operations.push(char);
        nums.push(curNum);

        curNum = "";
      } else {
        curNum += char;

        if (index == display.length - 1) {
          nums.push(curNum);
        }
      }
    }

    setDisplay(performOperations(nums, operations));
  };

  const performOperations = (nums, operations) => {
    let intNums = nums.map((str) => parseFloat(str));

    let total = intNums[0];
    for (let index = 0; index < operations.length; index++) {
      switch (operations[index]) {
        case "+":
          total += intNums[index + 1];
          break;
        case "/":
          total /= intNums[index + 1];
          break;
        case "*":
          total *= intNums[index + 1];
          break;
        case "-":
          total -= intNums[index + 1];
          break;
        default:
          console.log("unknown operation");
      }
    }
    return total.toString();
  };

  return (
    <div className="max-w-xs mx-auto overflow-hidden bg-white shadow-md rounded-xl">
      <div className="p-4">
        <div className="p-4 mb-4 bg-gray-100 rounded-lg">
          <input
            type="text"
            className="w-full text-2xl font-bold text-right bg-transparent outline-none"
            value={display}
            readOnly
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9", "/"].map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
            >
              {btn}
            </button>
          ))}
          {["4", "5", "6", "*"].map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
            >
              {btn}
            </button>
          ))}
          {["1", "2", "3", "-"].map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
            >
              {btn}
            </button>
          ))}
          <button
            onClick={() => handleButtonClick("0")}
            className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          >
            0
          </button>
          <button
            onClick={() => handleButtonClick(".")}
            className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          >
            .
          </button>
          <button
            onClick={handleCalculate}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            =
          </button>
          <button
            onClick={() => handleButtonClick("+")}
            className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
          <button
            onClick={handleClear}
            className="col-span-4 px-4 py-2 mt-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
          >
            Clear
          </button>
          <button
            onClick={handleClear}
            className="col-span-4 px-4 py-2 mt-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
