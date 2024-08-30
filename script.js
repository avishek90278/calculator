const normalCalc = document.getElementById('normalCalc');
const scientificCalc = document.getElementById('scientificCalc');
const normalCalculator = document.getElementById('normalCalculator');
const scientificCalculator = document.getElementById('scientificCalculator');

normalCalc.addEventListener('click', () => {
    normalCalc.classList.add('active');
    scientificCalc.classList.remove('active');
    normalCalculator.style.display = 'block';
    scientificCalculator.style.display = 'none';
});

scientificCalc.addEventListener('click', () => {
    scientificCalc.classList.add('active');
    normalCalc.classList.remove('active');
    scientificCalculator.style.display = 'block';
    normalCalculator.style.display = 'none';
});

function setupCalculator(calculator) {
    const display = calculator.querySelector('.display');
    const buttons = calculator.querySelectorAll('button');
    let currentValue = '0';
    let operator = null;
    let previousValue = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            
            if (button.classList.contains('number')) {
                if (currentValue === '0') {
                    currentValue = value;
                } else {
                    currentValue += value;
                }
            } else if (button.classList.contains('operator')) {
                operator = value;
                previousValue = currentValue;
                currentValue = '0';
            } else if (button.classList.contains('equals')) {
                if (operator && previousValue) {
                    currentValue = calculate(previousValue, currentValue, operator);
                    operator = null;
                    previousValue = null;
                }
            } else if (button.classList.contains('clear')) {
                currentValue = '0';
                operator = null;
                previousValue = null;
            } else if (button.classList.contains('sign')) {
                currentValue = (parseFloat(currentValue) * -1).toString();
            } else if (button.classList.contains('percent')) {
                currentValue = (parseFloat(currentValue) / 100).toString();
            } else if (button.classList.contains('decimal')) {
                if (!currentValue.includes('.')) {
                    currentValue += '.';
                }
            } else if (button.classList.contains('function')) {
                currentValue = calculateFunction(currentValue, value);
            } else if (button.classList.contains('backspace')) {
                if (currentValue.length > 1) {
                    currentValue = currentValue.slice(0, -1);
                } else {
                    currentValue = '0';
                }
            }
            
            display.textContent = currentValue;
        });
    });
}

function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+': return (a + b).toString();
        case '-': return (a - b).toString();
        case '×': return (a * b).toString();
        case '÷': return (a / b).toString();
        default: return b.toString();
    }
}

function calculateFunction(value, func) {
    const num = parseFloat(value);
    switch (func) {
        case 'sin': return Math.sin(num).toString();
        case 'cos': return Math.cos(num).toString();
        case 'tan': return Math.tan(num).toString();
        case '√': return Math.sqrt(num).toString();
        case '^': return (num * num).toString(); // Square function
        default: return value;
    }
}

setupCalculator(normalCalculator);
setupCalculator(scientificCalculator);
