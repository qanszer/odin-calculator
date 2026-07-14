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
    let parts = str.split(/\s*([\+\-\*\/])\s*/);

    num1 = parseFloat(parts[0]);
    num2 = parseFloat(parts[2]);
    operator = parts[1];
}

let output = document.querySelector(".output");
let inputBtns = document.querySelector(".input");
let finalStr = "";

inputBtns.addEventListener('click', (event) => {
    const clickedBtn = event.target.closest(".key");
    if (!clickedBtn) return;
    if (clickedBtn.classList.contains("clear")) {
        finalStr = "";
        output.textContent = "";
        return;
    }
    if (clickedBtn.classList.contains("skip")) return;

    const btnText = clickedBtn.textContent;
    finalStr += btnText;
    output.textContent = finalStr;

});