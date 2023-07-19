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

// Function that calls the operator functions when it takes the above variables
function operate(value1, operator, value2) {
    const num1 = Number(value1);
    const num2 = Number(value2);
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
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

// Function that calculates the numbers and display the result in the calculator
function displayNumber(value) {
    switch (value) {
        case 'equal':
            let finalResult;
            if (digitArray.length === 1) {
                finalResult = digitArray[0];
            } else {
                combineNumberStart(digitArray);
                combineNumberEnd(digitArray);
                console.log(digitArray);
                let operateArray = digitArray.slice();
                 // Loop that calculates the left-most equation first when length is above 3
                for (;operateArray.length > 3;) {
                    let equationArray = operateArray.filter(checkEquation, {count: 0});
                    let equationResult = operate(...equationArray);
                    console.log(equationArray)
                    operateArray.splice(0, 3, equationResult);
                };
                console.log(operateArray);
                finalResult = operate(...operateArray);
                separateNumber(digitArray);
                console.log(digitArray);
            };
            displayResult.textContent = `${finalResult}`;
            break;
        case 'clear':
            display.textContent = '';
            displayResult.textContent = '';
            digitArray.splice(0);
            break;
        case 'remove':
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);
            digitArray.pop();
            break;
        default:
            if (value === '*') {
                display.textContent += 'x';
            } else if (value === '/') {
                display.textContent += '÷';
            } else {
                display.textContent += value;
            };
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
            for (let addNum = (i + 1) + 1; !(isNaN(arr[addNum]) && arr[addNum] !== '.') &&
            (addNum < arr.length);) {
                arr[i + 1] += arr[addNum];
                arr.splice(addNum, 1);
            };
        };
    });
};

function separateNumber(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].indexOf('.') !== -1) {
            const decimalValue = arr[i].split('').reverse();
            decimalValue.forEach((value, decimalI) => {
                if (decimalI === 0) {
                    arr.splice(i, 1, value);
                } else {
                    arr.splice(i, 0, value);
                };
            });
        };
    };
};

function checkEquation() {
    if (this.count < 3) {
        this.count++;
        return true;
    };
    return false;
};