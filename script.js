// Function that create sum of numbers
function add(...num) {
    return num.reduce((amount, item) => amount + item);
};

//Function that subtracts the numbers
function subtract(...num) {
    return num.reduce((amount, item) => amount - item);
};

//Function that multiplies numbers
function multiply(...num) {
    return num.reduce((amount, item) => amount * item);
};

//Function that divides numbers
function divide(...num) {
    return num.reduce((amount, item) => amount / item);
};

let num1;
let operator;
let num2;

// Function that calls the operator functions when it takes the above variables
function operate(num1, operator, num2) {
    switch (operator) {
        case '+':
            return add(+num1, +num2);
        case '-':
            return subtract(+num1, +num2);
        case '*':
            return multiply(+num1, +num2);
        case '/':
            return divide(+num1, +num2);
    };
};

// Function that displays the numbers and store that numbers in variable when clicked
const display = document.createElement('p');
const displayContainer = document.querySelector('.calculator-display');
displayContainer.appendChild(display);

const displayResult = document.createElement('p');
displayContainer.appendChild(displayResult);

let digitArray = [];

const digits = document.querySelectorAll('.columns button');
digits.forEach((digit) => {
    digit.addEventListener('click', () => {
        displayNumber(digit.value);
    });
});

function displayNumber(value) {
    switch (value) {
        case 'equal':
            console.log(digitArray)
            // Make a loop where if there are two or more digits before the operator, combine those digits into one
            for (let i = digitArray.length - 1; i >= 0; i--) {
                if (isNaN(digitArray[i])) {
                    for (let i2 = (i + 1) + 1; i2 < digitArray.length;) {
                        digitArray[i + 1] += digitArray[i2];
                        digitArray.splice(i2, 1);
                    };
                };
            };
            console.log(digitArray)
            let result = operate(...digitArray);
            console.log(digitArray)
            if (digitArray.length === 1) {
                result = digitArray[0];
            };
            displayResult.textContent = `${result}`;
            break;
        case 'clear':
            display.textContent = '';
            digitArray.splice(0);
            break;
        case 'remove':
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);
            digitArray.pop();
            break;
        default:
            display.textContent += value;
            digitArray.push(value);
    };
};
