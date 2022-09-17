const screen = document.getElementById('display');
const topScreen = document.getElementById('topDisplay');
const numBut = document.querySelectorAll('.numbers');
const operationBut = document.querySelectorAll('.operation');
const bracketBut = document.querySelectorAll('.bracketButton');
const dotBut = document.querySelectorAll('.dot');
const equalBut = document.querySelector('#equal');
const acBut = document.querySelector('#ac');
const delBut = document.querySelector('#delete');


window.addEventListener('load', acFunc);

let calculation = [],
    showOnScreen = [];
const operators = ['+', '-', '*', '/'];


function calculate(equationArray) {
    return eval(equationArray.join(''))
}

function updateScreen() {
    topScreen.innerText = showOnScreen.join('');
}

acBut.addEventListener('click', acFunc);

function acFunc() {
    calculation = [];
    showOnScreen = [];
    screen.value = 0;
    updateScreen();
}

delBut.addEventListener('click', () => {
    calculation.pop();
    showOnScreen.pop();
    updateScreen();
})

numBut.forEach(element => {
    element.addEventListener('click', numButFunction);
})

function numButFunction(event) {
    calculation.push(event.target.innerText);
    showOnScreen.push(event.target.innerText);
    updateScreen();
}

operationBut.forEach(element => {
    element.addEventListener('click', operationButFunction);
})

function operationButFunction(event) {
    calculation.push(event.target.dataset.buttonSymbol);
    showOnScreen.push(event.target.innerText);
    updateScreen();

}

bracketBut.forEach(element => {
    element.addEventListener('click', bracketFunc);
});

function bracketFunc(event) {
    let bracketCount = 0;
    for (let value of calculation.join('')) {
        if (value == '(') {
            bracketCount++
        }
        if (value == ')') {
            bracketCount--
        }
    }

    if (isNaN(parseFloat(showOnScreen[showOnScreen.length - 1])) == false &&
        event.target.innerText == '(') {
        calculation.push('*');
    } else if (event.target.innerText == ')') {
        if (bracketCount == 0) {
            return
        }
    }

    calculation.push(event.target.innerText);
    showOnScreen.push(event.target.innerText);
    updateScreen();

}

function autoCloseBracket() {
    let startParenthesis = 0;
    let endParenthesis = 0;
    for (element of calculation) {
        element = element.toString();
        if (element.indexOf('(') != -1) {
            startParenthesis++
        } else if (element.indexOf(')') != -1) {
            endParenthesis++
        }
    }
    for (let i = endParenthesis; i < startParenthesis; i++) {
        calculation.push(')');
    }
}

equalBut.addEventListener('click', equalFunc);

function equalFunc() {
    autoCloseBracket();

    let answer = 0;
    try {
        answer = calculate(calculation).toString();

        // javascript floating calculation issue fix
        if (!answer.includes('e') &&
            answer.includes('.') &&
            answer.slice(0, -1).split('.')[1].endsWith('000000')) {
            answer = parseFloat(answer.slice(0, -1)).toString()
        }
    } catch (error) {
        if (error instanceof SyntaxError) {
            screen.value = 'Syntax Error!';
            return;
        }
    }

    calculation = [answer];
    showOnScreen = [answer];

    screen.value = answer;



    // clear answer when number button clicked
    numBut.forEach(element => {
        element.addEventListener('click', removeAns);
    })
}

// add keyboard functionality for computers

document.addEventListener('keydown', e => {
    let targetElement = e.key === 'Enter' ? equalBut :
        e.key === 'Backspace' ? delBut  :
            e.key === 'Delete' ? acBut :
                !isNaN(e.key) ? [...numBut].find(element => element.innerText === e.key)
                    : [...operationBut,...bracketBut,...dotBut].find(element => element.dataset.buttonSymbol === e.key);
    targetElement && e.preventDefault();
    targetElement && targetElement.click()
})