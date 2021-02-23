// DECLARATION VARIABLES
const numbers = document.querySelectorAll('.number'),
      operators = document.querySelectorAll('.operator'),
      clearBtns = document.querySelectorAll('.clear-btn'),
      decimalBtn = document.getElementById('decimal'),
      resultBtn = document.getElementById('result'),
      display = document.getElementById('display'),
      rootBtn = document.getElementById('root'),
      signBtn = document.getElementById('sign');
let MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperator= '';

// EVENT LISTENING
for (let i = 0; i <numbers.length; i++) {
  let number = numbers[i];
number.addEventListener('click',function(e) {
  numberPress(e.target.textContent);
});
};

for (let i = 0; i <operators.length; i++) {
  let operator = operators[i];
operator.addEventListener('click', function(e) {
  operatorPress(e.target.textContent);
});
};

for (let i = 0; i <clearBtns.length; i++) {
  let clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function (e) {
    clearPress(e.srcElement.id);
  });
};

decimalBtn.addEventListener('click', decimalPress);

rootBtn.addEventListener('click', rootPress);

signBtn.addEventListener('click', signPress);

// FUNCTION
function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
};

function operatorPress(op) {
  let localOperationMemory = display.value;

  if (MemoryNewNumber && MemoryPendingOperator !== '=') {
    display.value = MemoryCurrentNumber;
    if ( op !== MemoryPendingOperator) {
      MemoryPendingOperator = op;
    }
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperator === '^') {
      MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, localOperationMemory);
    } else if (MemoryPendingOperator === '+') {
      MemoryCurrentNumber += +localOperationMemory;
    } else if (MemoryPendingOperator === '-') {
      MemoryCurrentNumber -= +localOperationMemory;
    }  else if (MemoryPendingOperator === '*') {
      MemoryCurrentNumber *= +localOperationMemory;
    }  else if (MemoryPendingOperator === '/') {
      if (localOperationMemory === '0') {
        alert('На ноль делить нельзя!');
      } else {
        MemoryCurrentNumber /= +localOperationMemory;
      };
    } else {
      MemoryCurrentNumber = +localOperationMemory;
    };

    if (Math.abs(MemoryCurrentNumber)> 0 || Math.abs(MemoryCurrentNumber) < 1) {
      MemoryCurrentNumber = Math.round(MemoryCurrentNumber * 1000000) / 1000000;
    };

  display.value = MemoryCurrentNumber;
  MemoryPendingOperator = op;
  }
};

function decimalPress(argument) {
  let localDecimalMemory = display.value;
  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    };
  };
  display.value = localDecimalMemory;
};

function clearPress(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperator = '';
  }
};

function rootPress() {
  let localRootMemory = display.value;
  if (localRootMemory < 0) {
    alert('Ошибка ввода');
  } 
  else {
    MemoryCurrentNumber = Math.sqrt(localRootMemory);
    MemoryNewNumber = false;
  };
  display.value = MemoryCurrentNumber;
  MemoryNewNumber = false;
  operatorPress('=');
};

function signPress() {
  display.value = -display.value;
}
