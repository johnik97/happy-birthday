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

  const music = document.getElementById("birthdayMusic");
  if (music) {
    music.volume = 0;
    music.play();

    let v = 0;
    const fade = setInterval(() => {
    v += 0.05;
    music.volume = Math.min(v, 0.5);
    if (v >= 0.5) clearInterval(fade);
    }, 150);
  }

  introScreen.classList.add('is-leaving');

  setTimeout(() => {
    introScreen.style.display = 'none';
    celebrationScreen.classList.add('is-active');

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

const popSound = new Audio("pop.mp3");
popSound.volume = 0.6;

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

    // POP na klik
    balloon.addEventListener("click", (e) => {
      e.stopPropagation();

      popSound.currentTime = 0;
      popSound.play().catch(() => {});

      balloon.classList.add("pop");
      setTimeout(() => balloon.remove(), 300);
    });

    balloonContainer.append(balloon);
  }
};

giftButton.addEventListener('click', openGift);

// Postupně se objevující text
const message = "Jsi ten nejkrásnější dárek v našem životě. Všechno nejlepší, lásko! ❤️";
let i = 0;

const el = document.querySelector(".message");

function type() {
  if (i < message.length) {
    el.textContent += message.charAt(i);
    i++;
    setTimeout(type, 125);
  }
}
type();

// Sekvence fotek
const photos = [
  "photo0.jpeg",
  "photo1.jpeg",
  "photo2.jpeg",
  "photo3.jpeg",
  "photo4.jpeg"
];

const imgs = document.querySelectorAll(".instax-img");
let index = 0;

// preload
photos.forEach(src => {
  const img = new Image();
  img.src = src;
});

setInterval(() => {
  const nextIndex = (index + 1) % photos.length;

  // připrav další fotku do skrytého img
  imgs[1].src = photos[nextIndex];

  // crossfade
  imgs[0].classList.remove("active");
  imgs[1].classList.add("active");

  // prohoď role (swap)
  [imgs[0].src, imgs[1].src] = [imgs[1].src, imgs[0].src];
  imgs[1].classList.remove("active");
  imgs[0].classList.add("active");

  index = nextIndex;
}, 5000);


// Dynamické růst a padání květů
document.addEventListener("DOMContentLoaded", () => {

  const flowerContainer = document.getElementById("flowers");
  const FLOWER_COLORS = [
  "#ff6b9a",  // růžová
  "#845ef7",  // fialová
  "#ff922b",  // oranžová
  "#4dabf7",  // modrá
  "#63e6be"   // mentolová (nová, jemná)
];

  function spawnFlower() {
    if (!flowerContainer) return;

    const f = document.createElement("div");
    f.className = "flower";

    const color =
      FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)];

    f.style.color = color;

    f.innerHTML = `
      <div class="petal"></div>
      <div class="petal"></div>
      <div class="petal"></div>
      <div class="petal"></div>
      <div class="flower-core"></div>
    `;

    flowerContainer.appendChild(f);

  // PO DOPADU začni fade
  setTimeout(() => {
    f.classList.add("fade");
  }, 6000);

  // ODSTRAŇ až po fade
  setTimeout(() => {
    f.remove();
  }, 6750);
  }

  // první květ
  spawnFlower();

  // nový květ vyrůstá dřív než starý dopadne
  setInterval(spawnFlower, 4500);

});

const FIREWORK_COLORS = [
  "#ff6b9a",
  "#ffd43b",
  "#845ef7",
  "#4dabf7",
  "#63e6be",
  "#ff922b"
];

function firework(x, y) {
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.className = "firework";

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 90 + 30;

    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.background =
      FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

    p.style.setProperty("--x", Math.cos(angle) * distance + "px");
    p.style.setProperty("--y", Math.sin(angle) * distance + "px");

    document.body.appendChild(p);

    setTimeout(() => p.remove(), 900);
  }
}

celebrationScreen.addEventListener("click", (e) => {
  firework(e.clientX, e.clientY);
});

// Úklid při opuštění stránky.
window.addEventListener('beforeunload', () => {
  if (confettiIntervalId) {
    clearInterval(confettiIntervalId);
  }
});
