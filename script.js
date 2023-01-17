const X_Class = "x";
const O_Class = "o";
let oTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boxes = document.querySelectorAll(".input-box");
const messageElement = document.getElementById("message");
const message = document.querySelector("[data-message]");
const turn = document.querySelector("[data-text]");
const newGameButton = document.getElementById("new-game-btn");

newGameButton.addEventListener("click", startGame);

startGame();

function startGame() {
  oTurn = false;
  boxes.forEach((box) => {
    box.classList.remove(X_Class);
    box.classList.remove(O_Class);
    box.removeEventListener("click", handleClick);
    box.addEventListener("click", handleClick, { once: true });
  });
  messageElement.classList.remove("show");
  turn.innerHTML = "Waiting for Player X to start";
}

function handleClick(e) {
  const box = e.target;
  const currentClass = oTurn ? O_Class : X_Class;
  placeChoice(box, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurns();
  }
}

function placeChoice(box, currentClass) {
  box.classList.add(currentClass);
}

function switchTurns() {
  oTurn = !oTurn;
  turn.innerText = `${oTurn ? "O's" : "X's"} Turn`;
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return boxes[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    message.innerText = `The game is a Draw!`;
  } else {
    message.innerText = `${oTurn ? "O's" : "X's"} Win!`;
  }
  messageElement.classList.add("show");
}

function isDraw() {
  return [...boxes].every((box) => {
    return box.classList.contains(X_Class) || box.classList.contains(O_Class);
  });
}
