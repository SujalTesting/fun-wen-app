let dodgeCount = 0;
let yesButtonScale = 1;

const teaseMessages = [
  "Arey re, 'No' click nahi honar! 😜",
  "Aga Shona, evdha bhaav nako khau! 😘",
  "Khup taagad lavli tari 'No' nahi honar! 😂",
  "Chukun pan 'No' dabayla jashil tar button palel! 🏃‍♀️",
  "Bas kar na pillu, Seedha 'HO' bol! ❤️"
];

// Emoji swapped on each dodge — no network request, so it can never break or 404
const dodgeEmojis = ["🙈", "😅", "😜", "🏃‍♀️", "😂"];

// --- "Love Fever" background song (Rajneesh Patel), controlled via YouTube IFrame API ---
// Swap this ID for a different official upload any time — everything else keeps working.
const SONG_VIDEO_ID = "7sJXzaN3RqI";

let ytPlayer = null;
let ytPlayerReady = false;
let songShouldPlay = false; // set true when Yes is clicked, even if player isn't ready yet
let songHasStopped = false; // true once the meter hits 100, so it never restarts by accident
let isMuted = false;

// Called automatically by the YouTube IFrame API once it finishes loading
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player("ytPlayer", {
    height: "1",
    width: "1",
    videoId: SONG_VIDEO_ID,
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      playsinline: 1,
      start: 35,
    },
    events: {
      onReady: () => {
        ytPlayerReady = true;
        if (songShouldPlay) {
          ytPlayer.playVideo();
        }
      },
    },
  });
}

function startSong() {
  songShouldPlay = true;
  songHasStopped = false;
  if (ytPlayerReady && ytPlayer) {
    ytPlayer.playVideo();
  }
  // If the API hasn't finished loading yet, onReady() above will start it
  // automatically because songShouldPlay is now true.
}

function stopSong() {
  songShouldPlay = false;
  songHasStopped = true;
  if (ytPlayerReady && ytPlayer) {
    ytPlayer.pauseVideo();
  }
}

function toggleMusicMute() {
  const btn = document.getElementById("musicToggle");
  if (!ytPlayerReady || !ytPlayer) return;

  isMuted = !isMuted;
  if (isMuted) {
    ytPlayer.mute();
    if (btn) btn.textContent = "🔇";
  } else {
    ytPlayer.unMute();
    if (btn) btn.textContent = "🔊";
  }
}

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

  const musicToggle = document.getElementById("musicToggle");
  if (musicToggle) {
    musicToggle.addEventListener("click", toggleMusicMute);
  }

  createBackgroundHearts();
});

// Precision dodge relative to button container
function moveNoButton() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const subText = document.getElementById("subText");
  const emojiChar = document.getElementById("mainEmojiChar");
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
  if (emojiChar) {
    emojiChar.textContent = dodgeEmojis[dodgeCount % dodgeEmojis.length];
    // retrigger the wiggle animation each dodge
    emojiChar.classList.remove("wiggle");
    void emojiChar.offsetWidth; // force reflow so the animation restarts
    emojiChar.classList.add("wiggle");
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

  // This click is real user interaction, so the browser allows sound to start here
  startSong();

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

    if (Number(val) >= 100 && !songHasStopped) {
      stopSong();
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
