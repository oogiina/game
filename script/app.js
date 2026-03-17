let score = JSON.parse(localStorage.getItem("score")) || {
  yalalt: 0,
  ylagdal: 0,
  tentssen: 0
};

function updateScoreElement() {
  // Score-г дэлгэцэнд харуулах
  document.querySelector(".js-score").innerHTML =
    `Ялалт: ${score.yalalt}, Ялагдал: ${score.ylagdal}, Тэнцсэн: ${score.tentssen}`;
}

updateScoreElement();

// Player товчлуурууд
document.querySelector(".js-haich-button")
  .addEventListener("click", () => playGame("haich"));
document.querySelector(".js-chuluu-button")
  .addEventListener("click", () => playGame("chuluu"));
document.querySelector(".js-daawuu-button")
  .addEventListener("click", () => playGame("daawuu"));

// Random computer move
function pickComputerMove() {
  const rand = Math.random();
  if (rand < 1/3) return "haich";
  else if (rand < 2/3) return "chuluu";
  else return "daawuu";
}

// Random move for Auto-play
function getRandomMove() {
  const moves = ["haich", "chuluu", "daawuu"];
  return moves[Math.floor(Math.random() * moves.length)];
}

// Main game function
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  // Үр дүнг зөвхөн нэг үгээр тодорхойлно
  if (playerMove === computerMove) result = "Тэнцлээ";
  else if (
    (playerMove === "haich" && computerMove === "daawuu") ||
    (playerMove === "chuluu" && computerMove === "haich") ||
    (playerMove === "daawuu" && computerMove === "chuluu")
  ) {
    result = "Яллаа";
  } else {
    result = "Ялагдлаа";
  }

  // Score-г нэмэх
  if (result === "Яллаа") score.yalalt++;
  else if (result === "Ялагдлаа") score.ylagdal++;
  else score.tentssen++;

  // LocalStorage-д хадгалах
  localStorage.setItem("score", JSON.stringify(score));

  // Дэлгэц дээр зөвхөн нэг үг гаргах
  document.querySelector(".result").innerHTML = result;

  // Тоглогч ба компьютерын хөдөлгөөнийг үзүүлэх
  document.querySelector(".js-moves").innerHTML = `
    Та <img src="images/${playerMove}.emoji.png" class="move-icon">
    <img src="images/${computerMove}.emoji.png" class="move-icon"> Компьютер
  `;

  // Score-г update хийх
  updateScoreElement();
}

// Reset button
document.querySelector(".reset-score-button").addEventListener("click", () => {
  score = { yalalt:0, ylagdal:0, tentssen:0 };
  localStorage.removeItem("score");
  updateScoreElement();
  document.querySelector(".result").innerHTML = "Үр дүн:";
  document.querySelector(".js-moves").innerHTML = "Та болон Компьютер";
});

// Auto play
let isAutoPlaying = false;
let intervalId;
document.querySelector(".auto-play-button").addEventListener("click", () => {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = getRandomMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
});