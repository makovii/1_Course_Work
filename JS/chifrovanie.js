'use strict';
const btn = this.document.getElementById('copyText');
const btnforkey = this.document.getElementById('copyKey');
const uncopy = this.document.getElementById('uncopyText');
const text_input = this.document.getElementById('text_input');
const text_input1 = this.document.getElementById('text_input1');
const key_input = this.document.getElementById('key_input');
const text_out = this.document.getElementById('text_out');
const text_outkey = this.document.getElementById('text_out1');
const text_unencrypt = this.document.getElementById('unencrypt');
const button = this.document.getElementById('button');
const rad = this.document.getElementsByName('dzen');
text_out.innerHTML = '';
const characterSpan = this.document.createElement('span');
const characterSpan3 = this.document.createElement('span');
const allsymbols = '1234567890-=+[];/.<>~@#$^&()_!L:HAGWYIMNBCVXZSJ*"?№×÷|';
const string = allsymbols.split('');
text_unencrypt.innerHTML = '';
const characterSpan2 = this.document.createElement('span');
const checking = (expression) => {
  const english = /^[a-zA-Z0-9]+$/;
  const aftercheck = expression.split('');
  for (let i = 0; i < aftercheck.length; i += 1) {
    if (english.test(aftercheck[i])) {
      window.alert('Ангийский не подходит' );
      throw e;
    }
  }
  if (expression === null || expression === '') {
    alert('Вы ничего не ввели');
    throw e;
  }
};

function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
const randomsymbol = () => { // функция генерации символа
  const rand = randomInteger(1, string.length - 1);
  const symbol = string[rand];
  string.splice(rand, 1);
  return symbol;
};
const generatekey = () => { // функия генерирования ключа
  const key = [];
  let randomnum = 0;
  const side = randomInteger(1, 10);
  for (let c = 0; c < side; c += 1) {
    randomnum = randomInteger(0, 99);
    key.push(randomnum);
  }
  const result1 = key.join('');
  return result1;
};
const result = {
  key: {
    name: '',
    cod: 0,
  },
  coddingresult: 0,
};
const codding = () => { // функция кодировки
  const checks = checking(text_input.value);
  const alphabet = {
  };
  let res = text_input.value.split('');
  const lenght = res.length;
  let newalphabet = alphabet;
  if (rad[1].checked) {
    const generatedkey = generatekey();// генерируем ключ
    for (let j = 0; j < lenght; j += 1) { // создаём алфавит символов в тексте 
      alphabet[res[j]] = res[j];
    }
    for (const keys  of Object.keys(newalphabet)) { // генерируем рандомный символы для каждой буквы
      newalphabet[keys] = randomsymbol();
    }
    for (let i = 0; i < lenght; i += 1) { // кодируем наш текст
      for (const keys  of Object.keys(alphabet)) {
        if (res[i] == keys) {
          res[i] = newalphabet[keys];
        }
      }
    }
    res = res.join('');
    result.key.name = generatedkey;
    result.key.cod = newalphabet;
    result.coddingresult = res;
    characterSpan3.innerText = result.key.name;
    text_outkey.appendChild(characterSpan3);
    characterSpan.innerText = result.coddingresult;
    text_out.appendChild(characterSpan);
  }

  // }

  // вывод зашифрован текста
  // const uncodding = (key1, text) =>{ // функия раскодировки
  if (rad[0].checked) {
    if (key_input.value === result.key.name) {
      let resofuncoding = text_input1.value.split('');
      for (let i = 0; i < resofuncoding.length; i++ ) {
        for (const keys  of Object.keys(result.key.cod)) {
          if (resofuncoding[i] == result.key.cod[keys]) {
            resofuncoding[i] = keys;
          }
        }
            }
      resofuncoding = resofuncoding.join('');
      characterSpan2.innerText = resofuncoding;
      text_unencrypt.appendChild(characterSpan2);
    }
    else  alert('Wrong key');
}
};
btn.onclick = function copytext() {
  navigator.clipboard.writeText(result.coddingresult);
};

btnforkey.onclick = function copykey() {
  navigator.clipboard.writeText(result.key.name);
};

this.document.querySelector('button').onclick = codding;
