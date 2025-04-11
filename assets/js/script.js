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
        // Show an alert specific to the Submit button
        alert("You clicked Submit!");
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
  } else {
    // If the game type is not recognized, alert the user
    alert(`Unknown game type: ${gameType}`);
    // Then throw an error to stop execution and signal the issue
    throw `Unknown game type: ${gameType}. Aborting!`;
  }
}

function checkAnswer() {}

function calculateCorrectAnswer() {}

function incrementScore() {}

function incrementWrongAnswer() {}

/**
 * Displays an addition question by updating the DOM elements
 * with the two operands and the addition operator.
 * @param {number} operand1 - The first number in the equation
 * @param {number} operand2 - The second number in the equation
 */
function displayAdditionQuestion(operand1, operand2) {
  // Set the text of the elements with ids "operand1" and "operand2" to the values of operand1 operand2
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  // Set the text of the element with id "operator" to the addition symbol
  document.getElementById("operator").textContent = "+";
}

function displaySubtractionQuestion() {}

function displayMultiplicationQuestion() {}

function displayDivisionQuestion() {}
