let dodgeCount = 0;
let yesButtonScale = 1;
let noButtonScale = 1;

const QUESTION_TEXT = "Arey Pilla, Will you be my Valentine? 💖";
const TYPE_SPEED_MS = 45;

const teaseMessages = [
  "Arey re, 'No' click nahi honar! 😜",
  "Aga Shona, evdha bhaav nako khau! 😘",
  "Khup taagad lavli tari 'No' nahi honar! 😂",
  "Chukun pan 'No' dabayla jashil tar button palel! 🏃‍♀️",
  "Bas kar na pillu, Seedha 'HO' bol! ❤️",
  "Ata tar 'No' button gharach shodhat aahe! 🫣",
  "Itka try karun pan? Full dedication aahe tuza! 😆",
];

// Direct working Giphy CDN URLs (No 404/Not Available errors)
const dodgeGifs = [
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHY5ZjVrd2I0OGxrbnl4b3p4eTNxbXRwNDVraDF5MnFxdnVzOWg1eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L95234bOKJ6fDjyGL6/giphy.gif",
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3N2cml1a2pydmsya3o1bXgwbGF3cTFxOXlyMnV3ZW1rcmkyYTNzZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKoWXm3okO1kgHC/giphy.gif",
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGNva2Qxa25tYWVydmI3N2EwbzlxNWx1NG01czVjNzN1dXU1dTh4NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BEob506687u3C/giphy.gif",
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZsdTh2dTBqOHJhNHlyeHhhaDYzOWg3ZXJhOW9xMm1tNHIxdDByOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ISOckXUvpEy6c/giphy.gif"
];

// Tiny inline pink-heart SVG used whenever a remote GIF fails to load
const FALLBACK_HEART_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
      <rect width='100' height='100' rx='22' fill='#fff0f3'/>
      <text x='50' y='62' font-size='48' text-anchor='middle'>❤️</text>
    </svg>`
  );

document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");

  if (noBtn) {
    noBtn.addEventListener("mouseover", moveNoButton);
    noBtn.addEventListener("click", moveNoButton);
    noBtn.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        moveNoButton();
      },
      { passive: false }
    );
  }

  // Attach a fallback for every gif in case a CDN link ever breaks
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.src = FALLBACK_HEART_SRC;
    });
  });

  createBackgroundHearts();
  typeWriter(document.getElementById("questionText"), QUESTION_TEXT, TYPE_SPEED_MS);
});

// --- Typewriter effect for the headline ---
function typeWriter(el, text, speed) {
  if (!el) return;
  let i = 0;
  el.textContent = "";
  el.classList.remove("done");
  const interval = setInterval(() => {
    el.textContent = text.slice(0, i + 1);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      el.classList.add("done");
    }
  }, speed);
}

// --- Stage / progress dot control ---
function setStage(stageNumber) {
  document.querySelectorAll(".stage").forEach((s) => s.classList.remove("active"));
  document.getElementById("stage" + stageNumber).classList.add("active");

  document.querySelectorAll(".dot").forEach((dot) => {
    dot.classList.toggle("active", Number(dot.dataset.stage) <= stageNumber);
  });
}

// --- Strictly keeps dodging contained within card bounds so it doesn't leave screen ---
function moveNoButton() {
  const noBtn = document.getElementById("noBtn");
  const subText = document.getElementById("subText");
  const mainGif = document.getElementById("mainGif");
  const card = document.getElementById("mainCard");
  const counter = document.getElementById("dodgeCounter");

  if (!noBtn || !card) return;

  const cardRect = card.getBoundingClientRect();
  const btnWidth = noBtn.offsetWidth || 20;
  const btnHeight = noBtn.offsetHeight || 10;

  const maxX = cardRect.width - btnWidth - 30;
  const maxY = cardRect.height - btnHeight - 30;

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

  // Playful haptic buzz on devices that support it
  if (navigator.vibrate) {
    navigator.vibrate(35);
  }

  dodgeCount++;

  // "Yes" grows in confidence, "No" shrinks and gets shy
  yesButtonScale = Math.min(yesButtonScale + 0.1, 1.8);
  noButtonScale = Math.max(1 - dodgeCount * 0.07, 0.45);

  const yesBtn = document.getElementById("yesBtn");
  if (yesBtn) yesBtn.style.transform = `scale(${yesButtonScale})`;
  noBtn.style.transform = `scale(${noButtonScale})`;

  if (counter) {
    counter.innerText = dodgeCount === 1 ? "1 dodge so far 👀" : `${dodgeCount} dodges so far 👀`;
  }

  // After enough attempts, let the No button gracefully bow out
  if (dodgeCount >= 8) {
    noBtn.innerText = "Thak gaya main 🥲";
    noBtn.style.pointerEvents = "none";
    noBtn.style.opacity = "0.5";
    if (subText) subText.innerText = "Bas, ata Yes ch dabav lagel! 😄";
  }
}

function handleYesClick() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
    });
  }
  heartBurst();
  setStage(2);
}

// Small burst of rising hearts triggered at the moment of "Yes"
function heartBurst() {
  const container = document.getElementById("heartsContainer");
  if (!container) return;
  for (let i = 0; i < 14; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💗";
    heart.style.left = `${40 + Math.random() * 20}%`;
    heart.style.bottom = "40%";
    heart.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
    heart.style.animationDelay = `${Math.random() * 0.4}s`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 3500);
  }
}

function selectOption(button, optionName) {
  const allOptions = document.querySelectorAll(".option-btn");
  allOptions.forEach((btn) => btn.classList.remove("selected"));
  button.classList.add("selected");

  const nextBtn = document.getElementById("nextStageBtn");
  if (nextBtn) {
    nextBtn.classList.remove("hidden");
  }
}

function goToStage3() {
  setStage(3);
}

function goToStage4() {
  setStage(4);
}

function updateLoveMeter(val) {
  const sliderText = document.getElementById("sliderValueText");
  const loveHeart = document.getElementById("loveHeart");
  const toStage4Btn = document.getElementById("toStage4Btn");

  const numeric = Number(val);

  if (loveHeart) {
    const scale = 1 + numeric / 100;
    loveHeart.style.transform = `scale(${scale})`;
  }

  if (numeric < 40) {
    if (sliderText) sliderText.innerText = `Love Level: ${val}% (Evdha kami? Khupach unfair aahe re! 🥺)`;
  } else if (numeric < 90) {
    if (sliderText) sliderText.innerText = `Love Level: ${val}% (Aura thoda vadhva, full 100% pahije! 😉)`;
  } else {
    if (sliderText) sliderText.innerText = `Love Level: ${val}% (1000% Perfection! Maza prem pan evdhach aahe 🎉)`;
    if (typeof confetti === "function") {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    }
  }

  if (toStage4Btn) {
    toStage4Btn.classList.toggle("hidden", numeric < 90);
  }
}

// --- Generates a downloadable .ics calendar invite from the picked date/time ---
function downloadCalendarInvite() {
  const dateInput = document.getElementById("datePick");
  const timeInput = document.getElementById("timePick");
  const status = document.getElementById("calendarStatus");

  if (!dateInput.value) {
    if (status) status.innerText = "Pick a date first na! 🙈";
    return;
  }

  const time = timeInput.value || "19:00";
  const start = new Date(`${dateInput.value}T${time}:00`);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2-hour block

  const formatICSDate = (d) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//OurValentineDate//EN",
    "BEGIN:VEVENT",
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    "SUMMARY:Our Valentine Date 💘",
    "DESCRIPTION:Can't wait to see you!",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "our-valentine-date.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  if (status) status.innerText = "Added! Check your downloads 📥💘";
}

// --- Reset everything back to stage 1 ---
function restartExperience() {
  dodgeCount = 0;
  yesButtonScale = 1;
  noButtonScale = 1;

  const noBtn = document.getElementById("noBtn");
  if (noBtn) {
    noBtn.innerText = "Nako (No) 🙈";
    noBtn.style.pointerEvents = "auto";
    noBtn.style.opacity = "1";
    noBtn.style.transform = "scale(1)";
    noBtn.style.position = "static";
  }
  const yesBtn = document.getElementById("yesBtn");
  if (yesBtn) yesBtn.style.transform = "scale(1)";

  const counter = document.getElementById("dodgeCounter");
  if (counter) counter.innerText = "";

  document.querySelectorAll(".option-btn").forEach((b) => b.classList.remove("selected"));
  document.getElementById("nextStageBtn")?.classList.add("hidden");
  document.getElementById("toStage4Btn")?.classList.add("hidden");

  const slider = document.getElementById("loveSlider");
  if (slider) {
    slider.value = 50;
    updateLoveMeter(50);
  }

  setStage(1);
  typeWriter(document.getElementById("questionText"), QUESTION_TEXT, TYPE_SPEED_MS);
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