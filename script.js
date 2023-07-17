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
            // Make a loop where if there are two or more digits before the operator, combine those digits into one
            let result;
            if (digitArray.length === 1) {
                result = digitArray[0];
            } else {
                combineNumberStart(digitArray);
                combineNumberEnd(digitArray);
                result = operate(...digitArray);
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

function combineNumberStart(arr) {
    for (let addNum = 1; !(isNaN(arr[addNum]) && arr[addNum] !== '.');) {
        arr[0] += arr[addNum];
        arr.splice(addNum, 1);
    };
};

function combineNumberEnd(arr) {
    arr.forEach((num, i) => {
        if (isNaN(num) && num !== '.') {
            for (let addNum = (i + 1) + 1; !(isNaN(arr[addNum]) && arr[addNum] !== '.') ||
            (addNum < arr.length);) {
                arr[i + 1] += arr[addNum];
                arr.splice(addNum, 1);
            };
        };
    });
};

//Make a function/changes to code that if array length is longer than 3, it lets you make an array for the first equation, calculate that, and then calculate the rest of the equation like that one by one
