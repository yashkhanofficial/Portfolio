// ===== Smooth Scroll =====
function scrollToSection() {
  const section = document.getElementById("resources");
  section.scrollIntoView({ behavior: "smooth" });
}

// ===== Typing Effect =====
const text = "Advanced Security • Free Tools • Digital Awareness";
let index = 0;

function typeEffect() {
  const typingElement = document.getElementById("typing");

  if (!typingElement) return;

  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 50);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);

// ===== Counter Animation =====
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  counter.innerText = "0";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;

    const increment = target / 200;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCounter, 15);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});
