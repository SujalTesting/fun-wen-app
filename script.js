let dodgeCount = 0;
let yesButtonScale = 1;

// Marathi-English tease messages when she tries to click "No"
const teaseMessages = [
  "Arey re, 'No' work clicking allow nahi aahe! 😜",
  "Aga Shona, evdha bhaav nako khau! 😘",
  "Khup taagad lavli tari 'No' nahi honar! 😂",
  "Chukun pan 'No' dabayla jashil tar button palel! 🏃‍♀️",
  "Bas kar na pillu, Seedha 'HO' bol! ❤️"
];

// Cute GIFs for each dodge attempt
const dodgeGifs = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHY5ZjVrd2I0OGxrbnl4b3p4eTNxbXRwNDVraDF5MnFxdnVzOWg1eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L95234bOKJ6fDjyGL6/giphy.gif",
  "https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif",
  "https://media.giphy.com/media/BEob506687u3C/giphy.gif",
  "https://media.giphy.com/media/ISOckXUvpEy6c/giphy.gif"
];

// Run setup after page loads completely
document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");
  
  if (noBtn) {
    // Desktop hover & click
    noBtn.addEventListener("mouseover", moveNoButton);
    noBtn.addEventListener("click", moveNoButton);
    
    // Mobile touch support
    noBtn.addEventListener("touchstart", (e) => {
      e.preventDefault(); // Prevents actual touch click
      moveNoButton();
    });
  }

  createBackgroundHearts();
});

// Teleport "No" button & increase "Yes" button size
function moveNoButton() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const subText = document.getElementById("subText");
  const mainGif = document.getElementById("mainGif");
  const card = document.getElementById("mainCard");

  if (!noBtn || !card) return;

  // Make sure button uses fixed positioning within viewport padding
  const padding = 20;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
  const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

  noBtn.style.position = "fixed";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.zIndex = "999";

  // Update teasers & GIF
  if (subText) subText.innerText = teaseMessages[dodgeCount % teaseMessages.length];
  if (mainGif) mainGif.src = dodgeGifs[dodgeCount % dodgeGifs.length];

  // Grow "Yes" button slowly
  dodgeCount++;
  yesButtonScale += 0.12;
  if (yesBtn) yesBtn.style.transform = `scale(${yesButtonScale})`;
}

// Trigger Confetti and Go to Stage 2
function handleYesClick() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  }

  document.getElementById("stage1").classList.remove("active");
  document.getElementById("stage2").classList.add("active");
}

// Option Selection in Date Planner
function selectOption(button, optionName) {
  const allOptions = document.querySelectorAll(".option-btn");
  allOptions.forEach(btn => btn.classList.remove("selected"));
  button.classList.add("selected");

  document.getElementById("nextStageBtn").classList.remove("hidden");
}

function goToStage3() {
  document.getElementById("stage2").classList.remove("active");
  document.getElementById("stage3").classList.add("active");
}

// Interactive Love Slider Logic
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

// Background Floating Hearts
function createBackgroundHearts() {
  const container = document.getElementById("heartsContainer");
  if (!container) return;
  
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${4 + Math.random() * 4}s`;
    heart.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(heart);
  }
}
