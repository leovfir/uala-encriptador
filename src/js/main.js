const text_in = document.querySelector("#input");
const text_out = document.querySelector("#output");
const note = document.querySelector("#msgAlert");
const result = document.querySelector("#result");
const wait = document.querySelector("#wait");

const code = { e: "enter", i: "imes", a: "ai", u: "ufat", o: "ober" };

function on() {
  wait.classList.add("no");
  result.classList.remove("no");
  note.classList.add("text-alert");
}

function off() {
  wait.classList.remove("no");
  result.classList.add("no");
  note.classList.remove("text-alert");
}

function valid(text) {
  return text === "" || /[\u00C0-\u00FF]/.test(text) || /[A-Z]/.test(text);
}

function change(text) {
  if (valid(text)) {
    off();
  } else {
    on();
    let newText = "";
    for (let i = 0; i < text.length; i++) {
      let letter = text[i];
      if (code[letter]) {
        newText += code[letter];
      } else {
        newText += letter;
      }
    }
    return (text_out.innerHTML = newText);
  }
}

function undo(text) {
  if (valid(text)) {
    off();
  } else {
    on();
    for (let letter in code) {
      const word = code[letter];
      text = text.replace(new RegExp(word, "g"), letter);
    }
    return (text_out.innerHTML = text);
  }
}

function copy(text) {
  navigator.clipboard.writeText(text.value);
}

function clear(input) {
  input.value = "";
  off();
  input.focus();
}

const buttonE = document.querySelector("#on");
const buttonD = document.querySelector("#off");
const buttonCopy = document.querySelector("#copy");
const buttonClear = document.querySelector("#clear");

buttonE.addEventListener("click", () => {
  change(text_in.value);
});
buttonD.addEventListener("click", () => {
  undo(text_in.value);
});
buttonCopy.addEventListener("click", () => {
  copy(text_out);
});
buttonClear.addEventListener("click", () => {
  clear(text_in);
});
