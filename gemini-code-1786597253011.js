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

// 1. Teleport "No" button & increase "Yes" button size
function moveNoButton() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const subText = document.getElementById("subText");
  const mainGif = document.getElementById("mainGif");

  // Generate random X and Y positions within card bounds
  const card = document.getElementById("mainCard");
  const cardRect = card.getBoundingClientRect();

  const maxX = cardRect.width - noBtn.offsetWidth - 20;
  const maxY = cardRect.height - noBtn.offsetHeight - 20;

  const randomX = Math.floor(Math.random() * maxX) - (cardRect.width / 2) + 50;
  const randomY = Math.floor(Math.random() * maxY) - (cardRect.height / 2) + 50;

  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

  // Update teasers & GIF
  subText.innerText = teaseMessages[dodgeCount % teaseMessages.length];
  mainGif.src = dodgeGifs[dodgeCount % dodgeGifs.length];

  // Grow "Yes" button slowly to make it easier to click
  dodgeCount++;
  yesButtonScale += 0.12;
  yesBtn.style.transform = `scale(${yesButtonScale})`;
}

// 2. Trigger Confetti and Go to Stage 2
function handleYesClick() {
  // Fire confetti
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 }
  });

  document.getElementById("stage1").classList.remove("active");
  document.getElementById("stage2").classList.add("active");
}

// 3. Option Selection in Date Planner
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

// 4. Interactive Love Slider Logic
function updateLoveMeter(val) {
  const sliderText = document.getElementById("sliderValueText");
  const finalCard = document.getElementById("finalCard");

  if (val < 40) {
    sliderText.innerText = `Love Level: ${val}% (Evdha kami? Khupach unfair aahe re! 🥺)`;
    finalCard.classList.add("hidden");
  } else if (val < 90) {
    sliderText.innerText = `Love Level: ${val}% (Aura thoda vadhva, full 100% pahije! 😉)`;
    finalCard.classList.add("hidden");
  } else {
    sliderText.innerText = `Love Level: ${val}% (1000% Perfection! Maza prem pan evdhach aahe 🎉)`;
    finalCard.classList.remove("hidden");
    
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  }
}

// Background Floating Hearts Generator
function createBackgroundHearts() {
  const container = document.getElementById("heartsContainer");
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

createBackgroundHearts();