let gameSeq = [];
let userSeq = [];
let btns = ["red", "green", "yellow", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

function playSound(color) {
  let audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

function btnFlash(color) {
  let btn = document.querySelector("#" + color);
  btn.classList.add("Flash");
  setTimeout(() => {
    btn.classList.remove("Flash");
  }, 300);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  gameSeq.push(randColor);

  setTimeout(() => {
    btnFlash(randColor);
    playSound(randColor);
  }, 500);
}

function checkAnswer(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    playSound("wrong");
    h2.innerText = `Game Over! Your Score: ${level - 1}\nPress any key to restart.`;
    document.body.classList.add("game-over");
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);
    resetGame();
  }
}

function handleBtnClick() {
  if (!started) return;

  let color = this.id;
  userSeq.push(color);
  btnFlash(color);
  playSound(color);
  checkAnswer(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => {
  btn.addEventListener("click", handleBtnClick);
});

function resetGame() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  started = false;
}
