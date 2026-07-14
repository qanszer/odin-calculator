let errorDisplay = document.querySelector(".error-display");
let num1;
let num2;
let operator;

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

let calculationResult = document.querySelector(".calculation-result");
let inputBtns = document.querySelector(".input");
let finalStr = "";
let btnText;

inputBtns.addEventListener('click', (event) => {
    const clickedBtn = event.target.closest(".key");
    errorDisplay.textContent = "Invalid expression";
    if (!clickedBtn) return;
    if (clickedBtn.classList.contains("clear")) {
        finalStr = "";
        calculationResult.textContent = "";
        errorDisplay.style.display = "none";
        return;
    }
    // if (errorDisplay.style.display === "block") return;
    if (clickedBtn.classList.contains("equals")) {
        parseInput(calculationResult.textContent);
        console.log("num1: " + num1);
        console.log("num2: " + num2);
        console.log("operator: " + operator);
        if (operator === undefined) return;
        if (Number.isNaN(num1) || Number.isNaN(num2)) {
            errorDisplay.style.display = "block";
            return;
        }
        let result = operate(num1, num2, operator);
        if (result === Infinity) {
            calculationResult.textContent = result;
            finalStr = result;  
            errorDisplay.textContent = "Division by zero is undefined";
            errorDisplay.style.display = "block";
            return;
        }
        calculationResult.textContent = result;
        finalStr = result;
        errorDisplay.style.display = "none";
        return;
    }
    if (clickedBtn.classList.contains("skip")) return;
    if (clickedBtn.classList.contains("operator")) {
        parseInput(calculationResult.textContent);
        console.log("num1: " + num1);
        console.log("num2: " + num2);
        console.log("operator: " + operator);

        btnText = clickedBtn.textContent;
        finalStr += btnText;
        calculationResult.textContent = finalStr;
        if (Number.isNaN(num2)) {
            return;
        }
        
        let result = operate(num1, num2, operator);
        calculationResult.textContent = result;
        finalStr = result;

        if (result === Infinity) {
            errorDisplay.textContent = "Division by zero is undefined";
            errorDisplay.style.display = "block";
            return;
        }

        btnText = clickedBtn.textContent;
        finalStr += btnText;
        calculationResult.textContent = finalStr;

        return;
    }

    console.log(finalStr);
    errorDisplay.style.display = "none";
    btnText = clickedBtn.textContent;
    finalStr += btnText;
    calculationResult.textContent = finalStr;

    
});