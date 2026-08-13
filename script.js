let dodgeCount = 0;
let yesButtonScale = 1;

const teaseMessages = [
  "Arey re, 'No' click nahi honar! 😜",
  "Aga Shona, evdha bhaav nako khau! 😘",
  "Khup taagad lavli tari 'No' nahi honar! 😂",
  "Chukun pan 'No' dabayla jashil tar button palel! 🏃‍♀️",
  "Bas kar na pillu, Seedha 'HO' bol! ❤️"
];

// Direct working Giphy CDN URLs (No 404/Not Available errors)
const dodgeGifs = [
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHY5ZjVrd2I0OGxrbnl4b3p4eTNxbXRwNDVraDF5MnFxdnVzOWg1eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L95234bOKJ6fDjyGL6/giphy.gif",
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3N2cml1a2pydmsya3o1bXgwbGF3cTFxOXlyMnV3ZW1rcmkyYTNzZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKoWXm3okO1kgHC/giphy.gif",
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGNva2Qxa25tYWVydmI3N2EwbzlxNWx1NG01czVjNzN1dXU1dTh4NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BEob506687u3C/giphy.gif",
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZsdTh2dTBqOHJhNHlyeHhhaDYzOWg3ZXJhOW9xMm1tNHIxdDByOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ISOckXUvpEy6c/giphy.gif"
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

// Strictly keeps dodging contained within card bounds so it doesn't leave screen
function moveNoButton() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const subText = document.getElementById("subText");
  const mainGif = document.getElementById("mainGif");
  const card = document.getElementById("mainCard");

  if (!noBtn || !card) return;

  // Calculate dodge relative to the inner dimensions of the white card
  const cardRect = card.getBoundingClientRect();
  const btnWidth = noBtn.offsetWidth || 100;
  const btnHeight = noBtn.offsetHeight || 45;

  const maxX = cardRect.width - btnWidth - 30;
  const maxY = cardRect.height - btnHeight - 30;

  // Random relative position inside the card container
  const randomX = Math.max(15, Math.floor(Math.random() * maxX));
  const randomY = Math.max(15, Math.floor(Math.random() * maxY));

  noBtn.style.position = "absolute";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  if (subText) {
    subText.innerText = teaseMessages[dodgeCount % teaseMessages.length];
  }
  if (mainGif) {
    mainGif.src = dodgeGifs[dodgeCount % dodgeGifs.length];
  }

  // Grow "Yes" button
  dodgeCount++;
  yesButtonScale = Math.min(yesButtonScale + 0.1, 1.8);
  if (yesBtn) {
    yesBtn.style.transform = `scale(${yesButtonScale})`;
  }
}

function handleYesClick() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });
  }

  document.getElementById("stage1").classList.remove("active");
  document.getElementById("stage2").classList.add("active");
}

function selectOption(button, optionName) {
  const allOptions = document.querySelectorAll(".option-btn");
  allOptions.forEach(btn => btn.classList.remove("selected"));
  button.classList.add("selected");

  const nextBtn = document.getElementById("nextStageBtn");
  if (nextBtn) {
    nextBtn.classList.remove("hidden");
  }
}

function goToStage3() {
  document.getElementById("stage2").classList.remove("active");
  document.getElementById("stage3").classList.add("active");
}

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
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    }
  }
}

function createBackgroundHearts() {
  const container = document.getElementById("heartsContainer");
  if (!container) return;

  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${3.5 + Math.random() * 3.5}s`;
    heart.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(heart);
  }
}
