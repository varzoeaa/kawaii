document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function () {
    const container = document.querySelector('.container');
    const side = document.querySelector('.side-container');
    if (!card.classList.contains('flipped')) {
      card.classList.add('flipped');
      sparkleExplosion(card); 
    } else {
      side.appendChild(card);
      setTimeout(() => {
        card.classList.remove('flipped');
        updateCardPositions();
        updateSidePositions();
        checkAllCardsMoved();
      }, 300);
    }
  });
});

function updateCardPositions() {
  const cards = document.querySelectorAll('.container .card');
  cards.forEach((card, i) => {
    card.style.zIndex = i + 1;
    card.style.transform = `translate(${i * 8}px, ${i * 8}px)`;
  });
}

function updateSidePositions() {
  const cards = document.querySelectorAll('.side-container .card');
  cards.forEach((card, i) => {
    card.style.zIndex = i + 1;
    card.style.transform = `translate(${i * 8}px, ${i * 8}px)`;
  });
}

function sparkleExplosion(card) {
  const rect = card.getBoundingClientRect();
  const cardCenterX = rect.left + rect.width / 2 + window.scrollX;
  const cardCenterY = rect.top + rect.height / 2 + window.scrollY;
  const sparkleCount = 32;

  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    document.body.appendChild(sparkle);

    const angle = (Math.PI * 2 * i) / sparkleCount;
    const distance = 120 + Math.random() * 40;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    sparkle.style.left = `${cardCenterX}px`;
    sparkle.style.top = `${cardCenterY}px`;

    setTimeout(() => {
      sparkle.style.transform = `translate(${x}px, ${y}px) scale(${0.5 + Math.random()})`;
      sparkle.style.opacity = 0;
    }, 10);

    setTimeout(() => {
      sparkle.remove();
    }, 900);
  }
}

function checkAllCardsMoved() {
  const remaining = document.querySelectorAll('.container .card').length;
  if (remaining === 0) {
    document.getElementById('end-buttons').style.display = 'block';
  }
}

updateCardPositions();
updateSidePositions();

window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-music');

  const enableAudio = () => {
    audio.volume = 0.12; 
    audio.play().catch(() => {}); 
    document.removeEventListener('click', enableAudio);
  };

  document.addEventListener('click', enableAudio);
});

document.getElementById('music-btn').addEventListener('click', function() {
  document.getElementById('bg-music').play();
  this.style.display = 'none';
});

const noBtn = document.getElementById('no-btn');

noBtn.addEventListener('mouseenter', () => {
  const btnRect = noBtn.getBoundingClientRect();
  const padding = 10; 
  const maxLeft = window.innerWidth - btnRect.width - padding;
  const maxTop = window.innerHeight - btnRect.height - padding;

  const left = Math.random() * maxLeft;
  const top = Math.random() * maxTop;

  noBtn.style.position = 'fixed';
  noBtn.style.left = `${left}px`;
  noBtn.style.top = `${top}px`;
  noBtn.style.margin = '0';
});

noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

const yesBtn = document.getElementById('yes-btn');
const flowerVideo = document.getElementById('flower-video');

yesBtn.addEventListener('click', () => {
  yesBtn.style.display = 'none';
  flowerVideo.style.display = 'inline-block';
});

