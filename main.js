const startButton = document.querySelector("#startButton");
const endButton = document.querySelector("#endButton");
const circles = document.querySelectorAll(".circle");
const scoreDisplay = document.querySelector(".score");
const muteButton = document.querySelector(".mute-button");

const overlay = document.querySelector(".overlay");
const paraz = document.querySelector(".one");
const parazz = document.querySelector(".two");
const parazzz = document.querySelector(".three");
const closeButton = document.querySelector(".close");
const modalScore = document.querySelector(".modal-score");

let score = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;
const Music = new Audio("Game A.mp3");

const generateNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const clickCircle = (i) => {
  if (i !== active) {
    return endGame();
  }
  let mySound = new Audio("Mario Jump - QuickSounds.com.mp3");
  mySound.play();
  mySound.volume = 0.1;

  rounds--;

  score += 10;

  modalScore.textContent = score;
  scoreDisplay.textContent = score;

  if (score <= 30) {
    document.querySelector(".final-msg").textContent =
      "I believe in you 🤥.Try harder 😬 ";
  } else if (score > 30 && score < 50) {
    document.querySelector(".final-msg").textContent =
      "Average 🫢.Keep going 🤛";
  } else {
    document.querySelector(".final-msg").textContent =
      "Awesome 🥳, you did it 🤪";
  }
};

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickCircle(i));
});

const enableEvents = () => {
  circles.forEach((circle) => {
    circle.style.pointerEvents = "auto";
  });
};

const startGame = () => {
  if (rounds >= 3) {
    return endGame();
  }

  endButton.style.display = "block";
  startButton.style.display = "none";

  enableEvents();

  const newActive = pickNew(active);

  circles[newActive].classList.toggle("active");

  circles[active].classList.remove("active");

  active = newActive;
  console.log(active);
  console.log(newActive);

  timer = setTimeout(startGame, pace);

  pace -= 10;
  rounds++;
  if (rounds > 3) {
  }

  function pickNew(active) {
    const newActive = generateNumbers(0, 3);
    if (newActive !== active) {
      return newActive;
    }
    return pickNew(active);
  }
};

const endGame = () => {
  let mySound = new Audio("Mario Death - QuickSounds.com.mp3");
  mySound.play();
  clearTimeout(timer);
  modalShow();
  stopMusic();
};

const resetGame = () => {
  window.location.reload();
};

const modalShow = () => {
  overlay.classList.toggle("visible");
};

const playMusic = () => {
  Music.play();
};

const playMusicWithGame = () => {
  playMusic();
  startGame();
};

const stopMusic = () => {
  Music.pause();
};

startButton.addEventListener("click", playMusicWithGame);
endButton.addEventListener("click", resetGame);
closeButton.addEventListener("click", resetGame);
overlay.addEventListener("click", resetGame);
muteButton.addEventListener("click", stopMusic);
