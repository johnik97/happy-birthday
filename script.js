// Hlavní DOM prvky
const introScreen = document.getElementById('intro');
const celebrationScreen = document.getElementById('celebration');
const giftButton = document.getElementById('giftButton');
const confettiContainer = document.getElementById('confettiContainer');
const balloonContainer = document.getElementById('balloonContainer');

const CONFETTI_COLORS = ['#ff4d6d', '#5ad8a6', '#4dabf7', '#ffd43b', '#a78bfa', '#ff922b'];
const BALLOON_COLORS = ['#ff6b6b', '#f06595', '#845ef7', '#4dabf7', '#40c057', '#fcc419', '#ffa94d'];

let confettiIntervalId;

// Plynulé přepnutí mezi úvodní a oslavnou obrazovkou.
const openGift = () => {
  introScreen.classList.add('is-leaving');

  setTimeout(() => {
    introScreen.style.display = 'none';
    celebrationScreen.classList.add('is-active');
    celebrationScreen.setAttribute('aria-hidden', 'false');

    createBalloons(9);
    startConfetti();
  }, 760);
};

// Vytvoří 1 částici konfety s náhodnými vlastnostmi.
const createConfettiPiece = () => {
  const confetti = document.createElement('span');
  confetti.className = 'confetti';

  const duration = (Math.random() * 2 + 2).toFixed(2); // 2-4 s
  const size = (Math.random() * 8 + 6).toFixed(0);

  confetti.style.left = `${Math.random() * 100}%`;
  confetti.style.backgroundColor =
    CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
  confetti.style.width = `${size}px`;
  confetti.style.height = `${Math.max(8, Number(size) * 1.4)}px`;
  confetti.style.animationDuration = `${duration}s`;

  confettiContainer.append(confetti);

  // Po skončení animace částici odstraníme z DOM.
  confetti.addEventListener('animationend', () => confetti.remove(), { once: true });
};

// Spouští pravidelné generování konfet.
const startConfetti = () => {
  for (let i = 0; i < 45; i += 1) {
    setTimeout(createConfettiPiece, i * 70);
  }

  confettiIntervalId = setInterval(() => {
    for (let i = 0; i < 7; i += 1) {
      createConfettiPiece();
    }
  }, 520);
};

// Připraví barevné balónky s různou rychlostí a zpožděním.
const createBalloons = (count) => {
  for (let i = 0; i < count; i += 1) {
    const balloon = document.createElement('div');
    const duration = (Math.random() * 5 + 8).toFixed(2); // 8-13 s
    const delay = (Math.random() * 5).toFixed(2); // 0-5 s

    balloon.className = 'balloon';
    balloon.style.left = `${Math.random() * 94}%`;
    balloon.style.animationDuration = `${duration}s`;
    balloon.style.animationDelay = `${delay}s`;
    balloon.style.backgroundColor = BALLOON_COLORS[i % BALLOON_COLORS.length];

    balloonContainer.append(balloon);
  }
};

giftButton.addEventListener('click', openGift);

// Úklid při opuštění stránky.
window.addEventListener('beforeunload', () => {
  if (confettiIntervalId) {
    clearInterval(confettiIntervalId);
  }
});
