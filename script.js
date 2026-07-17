let num1;
let num2;
let operator;
let decimalUsed = false;

let calculationResult = document.getElementById("calculation-result");
calculationResult.focus();

let inputBtns = document.querySelector(".input");
let finalStr = "";
let btnText;
let errorDisplay = document.querySelector(".error-display");

const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");

function add(num1, num2) { return num1 + num2; }
function subtract(num1, num2) { return num1 - num2; }
function multiply(num1, num2) { return num1 * num2; }
function divide(num1, num2) { return num1 / num2; }
function exponent(num1, num2) { return num1 ** num2 }
function modulo(num1, num2) { return num1 % num2 }

function operate(num1, num2, operator) {
    if (operator === "+") return add(num1, num2);
    if (operator === "-") return subtract(num1, num2);
    if (operator === "*" || operator === "×") return multiply(num1, num2);
    if (operator === "/" || operator === "÷") return divide(num1, num2);
    if (operator === "^") return exponent(num1, num2);
    if (operator === "mod") return modulo(num1, num2);
}

function parseInput(str) {
    let parts = str.split(/\s*(?<![\+\-\*\/×÷\^\s])([\+\-\*\/×÷\^]|mod)\s*/);
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

function clearDisplay() {
    finalStr = "";
    calculationResult.value = "";
    decimalUsed = false;
    hideError();
}

function showToDisplay(result) {
    calculationResult.value = result;
    finalStr = result;
}

function addToDisplay(clickedBtn) {
    btnText = clickedBtn;
    finalStr += btnText;
    calculationResult.value = finalStr;
}

function handleInfinity(result) {
    if (result === Infinity) {
        showToDisplay(result);
        showError("Division by zero is undefined");
        return true;
    }
    return false;
}

function handleEquals() {
    parseInput(calculationResult.value);
    
    // User clicked equalsBtn without an operator
    if (operator === undefined) return;
    
    // Parsing did not match the right variables
    if (Number.isNaN(num1) || Number.isNaN(num2)) {
        showError("Invalid expression");
        return;
    }

    const result = operate(num1, num2, operator);
    decimalUsed = false;
    if (handleInfinity(result)) return;
    showToDisplay(result);
    
    hideError();
}

function handleOperator(operatorSymbol) {
    parseInput(calculationResult.value);
    addToDisplay(operatorSymbol);
    decimalUsed = false;

    // Ensures num2 is typed before calculation
    if (Number.isNaN(num2)) return;
    
    const result = operate(num1, num2, operator);
    showToDisplay(result)
    if (handleInfinity(result)) return;
    addToDisplay(operatorSymbol);
}

function handleDecimal(decimalSymbol) {
    if (decimalUsed) return;
    decimalUsed = true;
    addToDisplay(decimalSymbol);
}


inputBtns.addEventListener('click', (event) => {
    finalStr = calculationResult.value;
    const clickedBtn = event.target.closest(".key");
    if (!clickedBtn) {
        calculationResult.focus();
        return;
    }

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

    if (clickedBtn.classList.contains("decimal")) {
        handleDecimal(clickedBtn.textContent)
        return;
    }

    if (clickedBtn.classList.contains("operator")) {
        handleOperator(clickedBtn.textContent);
        return;
    }

    hideError();
    // Main appender of the clicked button
    addToDisplay(clickedBtn.textContent);
});


// Keyboard support
equalsBtn.addEventListener("click", () => {
    handleEquals();
})
clearBtn.addEventListener("click", () => {
    clearDisplay();
})
window.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        equalsBtn.click();
    }

    if (event.key === "Delete") {
        event.preventDefault();
        clearBtn.click();
    }
})

// Focus is always at the end of the line
calculationResult.addEventListener("focus", () => {
    const length = calculationResult.value.length; 
    calculationResult.setSelectionRange(length, length); 
});
document.addEventListener("click", (event) => {
    if (event.target !== calculationResult) {
        calculationResult.focus();
    }
})

// Decimals can only be typed once until a clear/equals
calculationResult.addEventListener("keydown", (event) => {
    if (event.key === " ") {
        event.preventDefault();
        return;
    }
    if (event.key === "." && decimalUsed) {
        event.preventDefault();
        return;
    }
    if (event.key === ".") {
        decimalUsed = true;
    }
});