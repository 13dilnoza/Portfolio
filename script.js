const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeIcon.textContent = "Kun";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeIcon.textContent = isDark ? "Kun" : "Tun";
  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
});

document.querySelector("#year").textContent = new Date().getFullYear();

const canvas = document.querySelector("#heroCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  createParticles();
}

function createParticles() {
  const count = Math.min(70, Math.floor(window.innerWidth / 18));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 2.2 + 0.8,
    speedX: (Math.random() - 0.5) * 0.45,
    speedY: (Math.random() - 0.5) * 0.45
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((particle, index) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < 0 || particle.x > window.innerWidth) particle.speedX *= -1;
    if (particle.y < 0 || particle.y > window.innerHeight) particle.speedY *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = document.body.classList.contains("dark")
      ? "rgba(102, 217, 255, 0.24)"
      : "rgba(81, 200, 242, 0.22)";
    ctx.fill();

    for (let next = index + 1; next < particles.length; next += 1) {
      const other = particles[next];
      const distance = Math.hypot(particle.x - other.x, particle.y - other.y);

      if (distance < 120) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = document.body.classList.contains("dark")
          ? `rgba(102, 217, 255, ${0.11 - distance / 1300})`
          : `rgba(81, 200, 242, ${0.12 - distance / 1200})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawParticles();
