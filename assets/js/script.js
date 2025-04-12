// Declare a global variable to track the currently selected game type
let currentGameType = "addition";

// Wait for the page to fully load before running any scripts
document.addEventListener("DOMContentLoaded", function () {
  // Get all the button elements in the document
  let buttons = document.getElementsByTagName("button");

  // Loop through each button element
  for (let button of buttons) {
    // Add a click event listener to each button
    button.addEventListener("click", function () {
      // If the button clicked has a data-type of "submit", check the answer
      if (this.getAttribute("data-type") === "submit") {
        checkAnswer(); // Run the checkAnswer function
      } else {
        // Otherwise, get the selected game type from the button
        currentGameType = this.getAttribute("data-type");
        // Start a new game using the selected game type
        runGame(currentGameType);
      }
    });
  }
  // Add an event listener to the answer input box to detect when the Enter key is pressed
  document
    .getElementById("answer--box")
    .addEventListener("keydown", function (event) {
      // If the key pressed is "Enter", submit the answer by calling checkAnswer
      if (event.key === "Enter") {
        checkAnswer();
      }
    });

  // Start the game with addition as the default when the page loads
  runGame(currentGameType);
});

/**
 * Runs a new round of the game with the given game type
 */
function runGame(gameType) {
  // Clear any previous answer from the input box
  document.getElementById("answer--box").value = "";
  // Move focus back to the input box for user convenience
  document.getElementById("answer--box").focus();
  // Declare variables to hold the two operands
  let num1, num2;
  if (gameType === "division") {
    // Generate numbers that guarantee an integer result for division
    // Pick a random number between 1 and 12 to use as the divisor
    num2 = Math.floor(Math.random() * 12) + 1;
    // Pick another random number between 1 and 12 to serve as the intended result
    let product = Math.floor(Math.random() * 12) + 1;
    // Multiply divisor and result to get a dividend that divides evenly
    num1 = num2 * product;
  } else {
    // For addition, subtraction, and multiplication, pick two random numbers between 1 and 25
    num1 = Math.floor(Math.random() * 25) + 1;
    num2 = Math.floor(Math.random() * 25) + 1;
  }
  // Depending on the game type, show the appropriate question
  if (gameType === "addition") {
    displayAdditionQuestion(num1, num2);
  } else if (gameType === "subtraction") {
    displaySubtractionQuestion(num1, num2);
  } else if (gameType === "multiplication") {
    displayMultiplicationQuestion(num1, num2);
  } else if (gameType === "division") {
    displayDivisionQuestion(num1, num2);
  } else {
    // If an unknown game type is passed, show an error
    alert(`Unknown game type: ${gameType}`);
    throw `Unknown game type: ${gameType}. Aborting!`;
  }
}

/**
 * Checks if the user's answer is correct and gives feedback
 */
function checkAnswer() {
  // Get the user's answer from the input box and convert it to a number
  let userAnswer = parseInt(document.getElementById("answer--box").value);
  // Calculate the correct answer based on the current game type
  let correctAnswer = calculateCorrectAnswer();
  // Check if the user's answer matches the correct answer
  let isCorrect = userAnswer === correctAnswer;
  // Give feedback based on whether the answer was correct or not
  if (isCorrect) {
    alert("Hey! You got it right!");
    incrementScore(); // Add to the correct score
  } else {
    alert(
      `Sorry! ${userAnswer} was incorrect. The correct answer was ${correctAnswer}.`
    );
    incrementWrongAnswer(); // Add to the incorrect score
  }
  // Start a new round using the same game type
  runGame(currentGameType);
}

/**
 * Returns the correct answer based on the operands and operator
 */
function calculateCorrectAnswer() {
  // Get the numbers shown in the question
  let operand1 = parseInt(document.getElementById("operand1").innerText);
  let operand2 = parseInt(document.getElementById("operand2").innerText);

  // Perform the correct calculation depending on the game type
  if (currentGameType === "addition") {
    return operand1 + operand2;
  } else if (currentGameType === "subtraction") {
    return operand1 - operand2;
  } else if (currentGameType === "multiplication") {
    return operand1 * operand2;
  } else if (currentGameType === "division") {
    return operand1 / operand2;
  } else {
    alert(`Unimplemented game type: ${currentGameType}`);
    throw `Unimplemented game type: ${currentGameType}`;
  }
}

/**
 * Increases the score shown on the page for correct answers
 */
function incrementScore() {
  // Get the current score from the page and convert to number
  let oldScore = parseInt(document.getElementById("score").innerText);
  // Increase it by 1 and update the page
  document.getElementById("score").innerText = ++oldScore;
}

/**
 * Increases the score shown on the page for incorrect answers
 */
function incrementWrongAnswer() {
  // Get the current incorrect score and convert to number
  let oldScore = parseInt(document.getElementById("incorrect").innerText);
  // Increase it by 1 and update the page
  document.getElementById("incorrect").innerText = ++oldScore;
}

/**
 * Displays an addition question with the two generated numbers
 */
function displayAdditionQuestion(operand1, operand2) {
  // Show operand1 and operand2 in the appropriate span elements
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  // Set the operator to "+"
  document.getElementById("operator").textContent = "+";
}

/**
 * Displays a subtraction question, making sure the result is not negative
 */
function displaySubtractionQuestion(operand1, operand2) {
  // Use the larger number as operand1 to avoid negative answers
  const largerOperand = operand1 > operand2 ? operand1 : operand2;
  const smallerOperand = operand1 > operand2 ? operand2 : operand1;
  // Show the values in the spans
  document.getElementById("operand1").textContent = largerOperand;
  document.getElementById("operand2").textContent = smallerOperand;
  // Set the operator to "-"
  document.getElementById("operator").textContent = "-";
}

/**
 * Displays a multiplication question with the two numbers
 */
function displayMultiplicationQuestion(operand1, operand2) {
  // Show both numbers
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  // Set the operator to "x"
  document.getElementById("operator").textContent = "x";
}

/**
 * Displays a division question, using larger number as numerator
 */
function displayDivisionQuestion(operand1, operand2) {
  // Avoid dividing by 0 and ensure numerator is greater than denominator
  const largerOperand = operand1 > operand2 ? operand1 : operand2;
  const smallerOperand = operand1 > operand2 ? operand2 : operand1 || 1;
  // Show the numbers
  document.getElementById("operand1").textContent = largerOperand;
  document.getElementById("operand2").textContent = smallerOperand;
  // Set the operator to "/"
  document.getElementById("operator").textContent = "/";
}
