// No variables created within global scope
// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    // Get all button elements in the document
    let buttons = document.getElementsByTagName("button");
    // Loop through each button element
    for (let button of buttons) {
        // Add a click event listener to each button
        button.addEventListener("click", function() {
            // Check if the clicked button has a data-type attribute of "submit"
            if (this.getAttribute("data-type") === "submit") {
                // Show an alert specific to the Submit button
                alert("You clicked Submit!");
            } else {
                // Get the value of the data-type attribute for other buttons
                let gameType = this.getAttribute("data-type");
                // Show an alert displaying which button was clicked
                alert(`You clicked ${gameType}`);
            };
        });
    };
});

function runGame() {

};

function checkAnswer() {

};

function calculateCorrectAnswer() {

};

function incrementScore() {

};

function incrementWrongAnswer() {

};

function displayAdditionQuestion() {

};

function displaySubtractionQuestion() {

};

function displayMultiplicationQuestion() {

};

function displayDivisionQuestion() {

};