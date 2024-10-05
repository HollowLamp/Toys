function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
function operate(na, op, nb) {
  let numA = parseFloat(na);
  let numB = parseFloat(nb);
  let res;
  switch (op) {
    case '+': res = add(numA, numB); break;
    case '-': res = sub(numA, numB); break;
    case '×': res = mul(numA, numB); break;
    case '÷': {
      if (numB == 0) {
        alert('Try to divide 0!')
        na = undefined;
        nb = undefined;
        op = undefined;
        disp('');
        return '';
      }
      res = divide(numA, numB);
      break;
    }
  }
  return res;
}

function disp(str) {
  const screen = document.querySelector('#screen');
  screen.textContent = str;
}
function cal() {

}
let na, nb, op;
let done;
const handler = document.querySelector('#container');

handler.addEventListener('click', function (e) {
  const target = e.target;
  const text = target.textContent;
  switch (target.classList[0]) {
    case 'sp': {
      switch (text) {
        case 'AC': {
          na = undefined;
          nb = undefined;
          op = undefined;
          disp('');
          break;
        }
        case 'C': {
          let mod;
          let text = document.querySelector('#screen').textContent;
          if (text != '') mod = text.slice(0, text.length - 1);
          if (mod == '-') mod = '';
          document.querySelector('#screen').textContent = mod;
          if (na == text) na = mod == '' ? undefined : mod;
          else nb = mod == '' ? undefined : mod;
          break;
        }
        case '+/-': {
          let mod;
          let text = document.querySelector('#screen').textContent;
          if (text != '') {
            let num = Number(text);
            num = -1 * num;
            mod = String(num);
          }
          document.querySelector('#screen').textContent = mod;
          if (na == text) na = mod;
          else nb = mod;
          break;
        }
        case '%': {
          let mod;
          let text = document.querySelector('#screen').textContent;
          if (text != '') {
            let num = Number(text);
            num = 0.01 * num;
            if (!Number.isInteger(num)) {
              num = parseFloat(num.toFixed(12));
            }
            mod = String(num);
          }
          document.querySelector('#screen').textContent = mod;
          if (na == text) na = mod;
          else nb = mod;
          break;
        }
        case '.': {
          let mod;
          let text = document.querySelector('#screen').textContent;
          let num = parseFloat(text);
          if (!isNaN(num) && !Number.isInteger(num)) {
            break;
          }
          if (na == undefined) {
            mod = '0.';
            na = mod;
          } else if (op == undefined) {
            na += '.';
            mod = na;
          } else if (nb == undefined) {
            mod = '0.'
            nb = mod;
          } else {
            nb += '.';
            mod = nb;
          }
          document.querySelector('#screen').textContent = mod;
          break;
        }
        case '+/-': {
          let mod;
          let text = document.querySelector('#screen').textContent;
          if (!text.includes('.')) {
            let num = Number(text);
            num = -1 * num;
            mod = String(num);
          }
          document.querySelector('#screen').textContent = mod;
          if (na == text) na = mod;
          else nb = mod;
          break;
        }
      }
      break;
    }
    case 'op': {
      if (nb != undefined) {
        na = operate(na, op, nb).toString();
        disp(na);
        nb = undefined;
      }
      switch (text) {
        case '÷': {
          op = '÷';
          break;
        }
        case '×': {
          op = '×';
          break;
        }
        case '-': {
          op = '-';
          break;
        }
        case '+': {
          op = '+';
          break;
        }
      }
      break;
    }
    case 'num': {
      if (na == undefined) {
        na = text;
        disp(na);
      } else if (op == undefined) {
        na += text;
        disp(na);
      } else if (nb == undefined) {
        nb = text;
        disp(nb);
      } else {
        nb += text;
        disp(nb);
      }
      break;
    }
    case 'cal': {
      if (na !== undefined && op !== undefined && nb !== undefined) {
        const result = operate(na, op, nb).toString();
        disp(result);
        na = result;
        nb = undefined;
        op = undefined;
      }
      break;
    }
  }
});

