let dodgeCount = 0;
let yesButtonScale = 0.5;

// Marathi-English tease messages when she tries to click "No"
const teaseMessages = [
  "Arey re, 'No' click nahi honar! 😜",
  "Aga Shona, evdha bhaav nako khau! 😘",
  "Khup taagad lavli tari 'No' nahi honar! 😂",
  "Chukun pan 'No' dabayla jashil tar button palel! 🏃‍♀️",
  "Bas kar na pillu, Seedha 'HO' bol! ❤️"
];

// Cute GIFs for each dodge attempt
const dodgeGifs = [
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3djFiNDVucWxsZG1weTY3dmx1eXdkYmNqeDc4MW9kaGRjMGV4ZmM3NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XU5FEFsUuql8fLaFJ1/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTBkZmo1Z3Znam1sbDZ0bGQzM3hlMXY0MWcya3JqOGVtdGljMXo2diZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1vZeoJWjQfpOymFCKF/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTBkZmo1Z3Znam1sbDZ0bGQzM3hlMXY0MWcya3JqOGVtdGljMXo2diZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1msDUtCpBk1BihoOGD/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTBwbzAzejRmeTdqaW11emU3NHZiM3hpcGlzdDk0bGUxODFpZWVnZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6EQ8Z1teWoBswtLa/giphy.gif"
];

document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");

  if (noBtn) {
    // Desktop hover & click dodging
    noBtn.addEventListener("mouseover", moveNoButton);
    noBtn.addEventListener("click", moveNoButton);

    // Mobile touch dodging
    noBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      moveNoButton();
    }, { passive: false });
  }

  createBackgroundHearts();
});

// Precision Dodge Function
function moveNoButton() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const subText = document.getElementById("subText");
  const mainGif = document.getElementById("mainGif");

  if (!noBtn) return;

  // Trigger slight mobile haptic vibration if supported
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }

  // Calculate safe viewport boundaries with padding
  const padding = 20;
  const btnWidth = noBtn.offsetWidth || 100;
  const btnHeight = noBtn.offsetHeight || 45;

  const maxX = window.innerWidth - btnWidth - padding;
  const maxY = window.innerHeight - btnHeight - padding;

  const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
  const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

  noBtn.style.position = "fixed";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.zIndex = "9999";

  // Update text & GIF with small bump animation
  if (subText) {
    subText.style.color = "#c9184a";
    subText.innerText = teaseMessages[dodgeCount % teaseMessages.length];
  }
  if (mainGif) {
    mainGif.src = dodgeGifs[dodgeCount % dodgeGifs.length];
  }

  // Scale up "Yes" button progressively
  dodgeCount++;
  yesButtonScale = Math.min(yesButtonScale + 0.12, 1.9); // Cap max growth scale
  if (yesBtn) {
    yesBtn.style.transform = `scale(${yesButtonScale})`;
  }
}

// Stage 1 -> Stage 2 Transition
function handleYesClick() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });
  }

  // Smooth stage transition
  const stage1 = document.getElementById("stage1");
  const stage2 = document.getElementById("stage2");

  stage1.classList.remove("active");
  setTimeout(() => {
    stage1.classList.add("hidden");
    stage2.classList.remove("hidden");
    setTimeout(() => stage2.classList.add("active"), 50);
  }, 300);
}

// Option Selection in Date Planner
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
  const stage2 = document.getElementById("stage2");
  const stage3 = document.getElementById("stage3");

  stage2.classList.remove("active");
  setTimeout(() => {
    stage2.classList.add("hidden");
    stage3.classList.remove("hidden");
    setTimeout(() => stage3.classList.add("active"), 50);
  }, 300);
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
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    }
  }
}

// Background Floating Hearts
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
