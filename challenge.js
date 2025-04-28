 let cards = [
  '🍎', '🍎', '🍌', '🍌', '🍓', '🍓', '🍍', '🍍',
  '🍉', '🍉', '🍑', '🍑', '🍒', '🍒', '🍇', '🍇'
]; // icons made by ChatGpt

let flippedCards = [];
let matchedCards = [];
let moveCount = 0;
let matchCount = 0;
let timer;
let timeLeft = 60;
let gameEnded = false;

function shuffleCards() {
  cards = cards.sort(() => Math.random() - 0.5);
}

function createBoard() {
  shuffleCards();
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  flippedCards = [];
  matchedCards = [];
  moveCount = 0;
  matchCount = 0;
  gameEnded = false;
  timeLeft = 60;

  document.getElementById('move-count').textContent = moveCount;
  document.getElementById('match-count').textContent = matchCount;
  document.getElementById('message').textContent = '';
  document.getElementById('reset-btn').style.display = 'none';

  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index = index;
    cardElement.addEventListener('click', flipCard);
    board.appendChild(cardElement);
  });

  startTimer();
}

function startTimer() {
  clearInterval(timer);
  document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      if (!gameEnded) {
        window.location.href = 'loser.html';
      
      }
    }
  }, 1000);
}

function flipCard(event) {
  if (gameEnded) return;

  const cardElement = event.target;
  const index = cardElement.dataset.index;

  if (
    flippedCards.length < 2 &&
    !flippedCards.includes(index) &&
    !cardElement.classList.contains('flipped')
  ) {
    cardElement.textContent = cards[index];
    cardElement.classList.add('flipped');
    flippedCards.push(index);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  moveCount++;
  document.getElementById('move-count').textContent = moveCount;

  const [firstIndex, secondIndex] = flippedCards;
  if (cards[firstIndex] === cards[secondIndex]) {
    matchedCards.push(cards[firstIndex]);
    matchCount++;
    document.getElementById('match-count').textContent = matchCount;

    if (matchCount === cards.length / 2) {
      gameEnded = true;
      endGame();
    }

    flippedCards = [];
  } else {
    setTimeout(() => {
      document.querySelectorAll('.card').forEach(card => {
        if (
          !matchedCards.includes(card.textContent) &&
          flippedCards.includes(card.dataset.index)
        ) {
          card.classList.remove('flipped');
          card.textContent = '';
        }
      });
      flippedCards = [];
    }, 1000);
  }
}

function endGame() {
  clearInterval(timer);
  localStorage.setItem('Score', moveCount);
  localStorage.setItem('GameWon', 'true');
  window.location.href = 'gameover.html';
}

document.getElementById('reset-btn').addEventListener('click', () => {
  createBoard(); 
});

window.onload = () => {
  createBoard();
};
