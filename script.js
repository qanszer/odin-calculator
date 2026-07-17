let num1;
let num2;
let operator;

let calculationResult = document.querySelector(".calculation-result");
let inputBtns = document.querySelector(".input");
let finalStr = "";
let btnText;
let errorDisplay = document.querySelector(".error-display");

function add(num1, num2) { return num1 + num2; }
function subtract(num1, num2) { return num1 - num2; }
function multiply(num1, num2) { return num1 * num2; }
function divide(num1, num2) { return num1 / num2; }

function operate(num1, num2, operator) {
    if (operator === "+") return add(num1, num2);
    if (operator === "-") return subtract(num1, num2);
    if (operator === "*" || operator === "×") return multiply(num1, num2);
    if (operator === "/" || operator === "÷") return divide(num1, num2);
}

function parseInput(str) {
    let parts = str.split(/\s*(?<![\+\-\*\/×÷\s])([\+\-\*\/×÷])\s*/);
    parts = parts.filter(part => part !== undefined && part !== "");

    num1 = parseFloat(parts[0]);
    num2 = parseFloat(parts[2]);
    operator = parts[1];
}

function showError(text) {
    errorDisplay.textContent = text;
    errorDisplay.style.display = "block";
}

function hideError() {
    errorDisplay.style.display = "none";
}

function handleInfinity(result) {
    if (result === Infinity) {
        showToDisplay(result);
        showError("Division by zero is undefined");
        return true;
    }
    return false;
}

function clearDisplay() {
    finalStr = "";
    calculationResult.textContent = "";
    hideError();
}

function showToDisplay(result) {
    calculationResult.textContent = result;
    finalStr = result;
}

function addToDisplay(clickedBtn) {
    btnText = clickedBtn;
    finalStr += btnText;
    calculationResult.textContent = finalStr;
}

function handleEquals() {
    parseInput(calculationResult.textContent);
    
    // User clicked equalsBtn without an operator
    if (operator === undefined) return;
    
    // Parsing did not match the right variables
    if (Number.isNaN(num1) || Number.isNaN(num2)) {
        showError("Invalid expression");
        return;
    }

    const result = operate(num1, num2, operator);
    if (handleInfinity(result)) return;
    showToDisplay(result);
    
    hideError();
}

function handleOperator(btnText) {
    parseInput(calculationResult.textContent);
    addToDisplay(btnText);

    // Ensures num2 is typed before calculation
    if (Number.isNaN(num2)) return;
    
    const result = operate(num1, num2, operator);
    showToDisplay(result)
    if (handleInfinity(result)) return;
    addToDisplay(btnText);
}


inputBtns.addEventListener('click', (event) => {
    const clickedBtn = event.target.closest(".key");
    if (!clickedBtn) return;

    if (clickedBtn.classList.contains("clear")) {
        clearDisplay();
        return;
    }
    if (clickedBtn.classList.contains("equals")) {
        handleEquals();
        return;
    }
    
    // Excludes the clear and equals buttons from parseInput()
    if (clickedBtn.classList.contains("skip")) return;

    if (clickedBtn.classList.contains("operator")) {
        handleOperator(clickedBtn.textContent);
        return;
    }

    hideError();

    // Main appender of the clicked button
    addToDisplay(clickedBtn.textContent);
});