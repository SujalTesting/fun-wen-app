let dodgeCount = 0;
let yesButtonScale = 1;

const teaseMessages = [
  "Arey re, 'No' click nahi honar! 😜",
  "Aga Shona, evdha bhaav nako khau! 😘",
  "Khup taagad lavli tari 'No' nahi honar! 😂",
  "Chukun pan 'No' dabayla jashil tar button palel! 🏃‍♀️",
  "Bas kar na pillu, Seedha 'HO' bol! ❤️"
];

// Direct working Tenor GIF CDN URLs
const dodgeGifs = [
  "https://media.tenor.com/gU212Jy334AAAAAC/milk-and-mocha-hug.gif",
  "https://media.tenor.com/ef301E03hX8AAAAC/bear-hug.gif",
  "https://media.tenor.com/2vA6YQvHnL4AAAAC/milk-and-mocha-kiss.gif",
  "https://media.tenor.com/x881k_M3_EAAAAAC/milk-and-mocha-bear.gif"
];

document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");

  if (noBtn) {
    noBtn.addEventListener("mouseover", moveNoButton);
    noBtn.addEventListener("click", moveNoButton);
    noBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      moveNoButton();
    }, { passive: false });
  }

  createBackgroundHearts();
});

// Precision dodge relative to button container
function moveNoButton() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const subText = document.getElementById("subText");
  const mainGif = document.getElementById("mainGif");
  const btnGroup = document.getElementById("btnGroup");

  if (!noBtn || !btnGroup) return;

  // Switch to absolute positioning on first dodge
  noBtn.style.position = "absolute";

  const groupWidth = btnGroup.clientWidth;
  const groupHeight = btnGroup.clientHeight;
  const btnWidth = noBtn.offsetWidth || 80;
  const btnHeight = noBtn.offsetHeight || 36;

  // Generate short relative jump
  const maxX = groupWidth - btnWidth;
  const maxY = groupHeight - btnHeight;

  const randomX = Math.max(0, Math.floor(Math.random() * maxX));
  const randomY = Math.max(-20, Math.floor(Math.random() * (maxY + 40)));

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  if (subText) {
    subText.innerText = teaseMessages[dodgeCount % teaseMessages.length];
  }
  if (mainGif) {
    mainGif.src = dodgeGifs[dodgeCount % dodgeGifs.length];
  }

  dodgeCount++;
  yesButtonScale = Math.min(yesButtonScale + 0.08, 1.5);
  if (yesBtn) {
    yesBtn.style.transform = `scale(${yesButtonScale})`;
  }
}

// Stage 1 -> Stage 2 Transition
function handleYesClick() {
  if (typeof confetti === "function") {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  }

  document.getElementById("stage1").classList.remove("active");
  document.getElementById("stage2").classList.add("active");
}

// Option selection
function selectOption(button, optionName) {
  const allOptions = document.querySelectorAll(".option-btn");
  allOptions.forEach(btn => btn.classList.remove("selected"));
  button.classList.add("selected");

  const nextBtn = document.getElementById("nextStageBtn");
  if (nextBtn) {
    nextBtn.classList.remove("hidden");
  }
}

// Stage 2 -> Stage 3 Transition
function goToStage3() {
  document.getElementById("stage2").classList.remove("active");
  document.getElementById("stage3").classList.add("active");
}

// Love Meter Slider
function updateLoveMeter(val) {
  const sliderText = document.getElementById("sliderValueText");
  const finalCard = document.getElementById("finalCard");

  if (val < 40) {
    if (sliderText) sliderText.innerText = `Love Level: ${val}% (Evdha kami? Khupach unfair aahe re! 🥺)`;
    if (finalCard) finalCard.classList.add("hidden");
  } else if (val < 90) {
    if (sliderText) sliderText.innerText = `Love Level: ${val}% (Aura thoda vadhva, full 100% pahije! 😉)`;
    if (finalCard) finalCard.classList.add("hidden");
  } else {
    if (sliderText) sliderText.innerText = `Love Level: ${val}% (1000% Perfection! Maza prem pan evdhach aahe 🎉)`;
    if (finalCard) finalCard.classList.remove("hidden");

    if (typeof confetti === "function") {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  }
}

function createBackgroundHearts() {
  const container = document.getElementById("heartsContainer");
  if (!container) return;

  for (let i = 0; i < 16; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${3 + Math.random() * 4}s`;
    heart.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(heart);
  }
}
