'use strict';
const resultEl = document.getElementById('resultado'),
  lengthEl = document.getElementById('tamanho'),
  uppercaseEl = document.getElementById('maiuscula'),
  lowercaseEl = document.getElementById('minuscula'),
  numbersEl = document.getElementById('numeros'),
  symbolsEl = document.getElementById('simbolos'),
  generateEl = document.getElementById('gerador'),
  copy = document.getElementById('copiar');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

copy.addEventListener('click', () => {
  const textarea = document.createElement('textarea'),
    password = resultEl.innerText;

  if (!password) return;

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Senha Copiada com Sucesso!');
});

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value,
    hasLower = lowercaseEl.checked,
    hasUpper = uppercaseEl.checked,
    hasNumber = numbersEl.checked,
    hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';
  const typesCount = lower + upper + number + symbol,
    typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );
  if (typesCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%*&(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
