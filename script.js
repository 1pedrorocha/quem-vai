const card = document.querySelector(".card");
const contorno = document.querySelector(".contorno");
const content = document.querySelector(".content");
const button = document.querySelector(".sortear");
const restartBtn = document.querySelector(".restart");

let randomNumber;
let previousCard;

// DEFINES RANDOM NUMBER
function drawNumber() {
  randomNumber = parseInt(Math.random() * 30);
}

// GETS THE ARRAY OF CARDS
async function defineCards() {
  drawNumber();
  const draw = await fetch("http://localhost:3000/cards");
  const cards = await draw.json();

  let cardCheck = cards[randomNumber].title;

  if (cardCheck === previousCard) {
    console.log("catch");
    drawNumber();
    cardCheck = cards[randomNumber].title;
  }

  content.innerHTML = `
  <h3>${cardCheck}</h3>`;
  previousCard = cardCheck;
}

// CHANGES THE LAYOUT OF THE CARD
function changeLayout() {
  card.classList.remove("card");
  card.classList.add("card-draw");

  contorno.classList.remove("contorno");
  contorno.classList.add("contorno-draw");
}

// DRAWS THE CARD
function drawCard() {
  defineCards();
  changeLayout();

  restartBtn.classList.remove("hidden");

  button.textContent = "DRAW AGAIN";
}

button.addEventListener("click", drawCard);

// RELOAD PAGE
function reloadPage() {
  location.reload();
}

restartBtn.addEventListener("click", reloadPage);
