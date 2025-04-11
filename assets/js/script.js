// No variables created within global scope
// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
  // Get all button elements in the document
  let buttons = document.getElementsByTagName("button");
  // Loop through each button element
  for (let button of buttons) {
    // Add a click event listener to each button
    button.addEventListener("click", function () {
      // Check if the clicked button has a data-type attribute of "submit"
      if (this.getAttribute("data-type") === "submit") {
        // Run checkAnswer function
        checkAnswer();
      } else {
        // Get the value of the data-type attribute for other buttons
        let gameType = this.getAttribute("data-type");
        // Call the runGame function, passing in the game type as an argument
        runGame(gameType);
      }
    });
  }
  // Call the runGame function initially with "addition" as the default game type
  runGame("addition");
});

// Docstring for runGame function
/**
 * The Main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
// Define the main game function and accept a parameter called gameType to determine the type of game
function runGame(gameType) {
  // Generate two random numbers between 1-25 and assign them to num1 and num2
  let num1 = Math.floor(Math.random() * 25) + 1;
  let num2 = Math.floor(Math.random() * 25) + 1;

  // Check if the game type is "addition"
  if (gameType === "addition") {
    // If so, call the function to display an addition question using the two numbers
    displayAdditionQuestion(num1, num2);
  } else if (gameType === "multiplication") {
    // If so, call the function to display an multiplication question using the two numbers
    displayMultiplicationQuestion(num1, num2);
  } else {
    // If the game type is not recognized, alert the user
    alert(`Unknown game type: ${gameType}`);
    // Then throw an error to stop execution and signal the issue
    throw `Unknown game type: ${gameType}. Aborting!`;
  }
}

/**
 * Checks the user's answer against the correct answer,
 * gives feedback via alert, and restarts the game.
 */
function checkAnswer() {
  // Get the user's answer from the input box and convert it to an integer
  let userAnswer = parseInt(document.getElementById("answer--box").value);
  // Call the calculateCorrectAnswer function to get the actual correct answer and game type
  let calculatedAnswer = calculateCorrectAnswer();
  // Compare the user's answer to the correct answer
  let isCorrect = userAnswer === calculatedAnswer[0];
  if (isCorrect === true) {
    // If the answer is correct, alert the user with a success message
    alert("Hey! You got it right!");
    // Increment the score
    incrementScore();
  } else {
    // If the answer is incorrect, alert the user with the correct answer
    alert(
      `Sorry! ${userAnswer} was the incorrect answer, the correct answer was ${calculatedAnswer[0]}.`
    );
    // Increment the incorrect score
    incrementWrongAnswer();
  }
  // Start a new game using the same game type
  runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands and the operator directly from the DOM , and returns the correct answer
 */
function calculateCorrectAnswer() {
  // Get the numbers from the element with ids "operand1" and "operand2" and parseInt converts them to integers
  let operand1 = parseInt(document.getElementById("operand1").innerText);
  let operand2 = parseInt(document.getElementById("operand2").innerText);
  // Get the operator symbol (+, -, x, ÷) from the element with id "operator"
  let operator = document.getElementById("operator").innerText;
  // Check the operator and return the correct answer and game type
  if (operator === "+") {
    // If the operator is addition, return the sum and the string "addition"
    return [operand1 + operand2, "addition"];
  } else if (operator === "x") {
    // If the operator is multiplication, return the product and the string "multiplication"
    return [operand1 * operand2, "multiplication"];
  } else {
    alert(`Unimplemented operator ${operator}!`);
    // If the operator is not implemented, alert the user and throw an error
    throw `Unimplemented operator ${operator}, aborting!`;
  }
}

/**
 * Increments the user's correct answer score by 1
 * and updates the score display in the DOM.
 */
function incrementScore() {
  // Retrieve the current score from the DOM and convert it to an integer
  let oldScore = parseInt(document.getElementById("score").innerText);
  // Increment the score by 1 and update the DOM
  document.getElementById("score").innerText = ++oldScore;
}

/**
 * Increments the user's incorrect answer count by 1
 * and updates the incorrect answer display in the DOM.
 */
function incrementWrongAnswer() {
  // Retrieve the current incorrect answer count from the DOM and convert it to an integer
  let oldScore = parseInt(document.getElementById("incorrect").innerText);
  // Increment the incorrect answer count by 1 and update the DOM
  document.getElementById("incorrect").innerText = ++oldScore;
}

/**
 * Displays an addition question by updating the DOM elements
 * with the two operands and the addition operator.
 */
function displayAdditionQuestion(operand1, operand2) {
  // Set the text of the elements with ids "operand1" and "operand2" to the values of operand1 operand2
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  // Set the text of the element with id "operator" to the addition symbol
  document.getElementById("operator").textContent = "+";
}

function displaySubtractionQuestion() {}

function displayMultiplicationQuestion() {
  // Set the text of the elements with ids "operand1" and "operand2" to the values of operand1 operand2
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  // Set the text of the element with id "operator" to the multiplication symbol
  document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion() {}
