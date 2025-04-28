 let cards = [
  '🍎', '🍎', '🍌', '🍌', '🍓', '🍓', '🍍', '🍍',
  '🍉', '🍉', '🍑', '🍑', '🍒', '🍒', '🍇', '🍇'// icons were created using ChatGpt.
];

let flippedCards = [];
let matchedCards = [];
let moveCount = 0;
let matchCount = 0;

function shuffleCards() {
  cards = cards.sort(() => Math.random() - 0.5);
}

function createBoard() {
  shuffleCards();
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index = index;
    cardElement.addEventListener('click', flipCard);
    board.appendChild(cardElement);
  });
}

function flipCard(event) {
  const cardElement = event.target;
  const index = cardElement.dataset.index;
  
  
  if (flippedCards.length < 2 && !flippedCards.includes(index) && !cardElement.classList.contains('flipped')) {
    cardElement.textContent = cards[index];
    cardElement.classList.add('flipped');
    flippedCards.push(index);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch(){
  moveCount++;
  document.getElementById('move-count').textContent = moveCount;

  const [firstIndex, secondIndex] = flippedCards;
  if (cards[firstIndex] === cards[secondIndex]) {
    matchedCards.push(cards[firstIndex]);
    matchCount++;
    document.getElementById('match-count').textContent = matchCount;

    if (matchCount === cards.length / 2) {
      endGame();
    }

    
    flippedCards = [];
  } else {
    
    setTimeout(() => {
      document.querySelectorAll('.card').forEach(card => {
        if (!matchedCards.includes(card.textContent) && flippedCards.includes(card.dataset.index)) {
          card.classList.remove('flipped');
          card.textContent = '';
        }
      });
      flippedCards = [];
    }, 1000);  
  }
}

function endGame() {
  const finalScore = moveCount;
  localStorage.setItem('Score', finalScore);
  window.location.href = 'gameover.html';
}

window.onload = () => {
  createBoard();
};
