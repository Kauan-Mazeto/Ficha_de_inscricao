const slides = document.querySelectorAll(".slide");
let current = 0;

const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

const defaultBg = "#3f3f3fff"; 

let isHoveringPrev = false;
let isHoveringNext = false;

function updateSlides() {
  slides.forEach((slide, i) => {
    slide.className = "slide";
    if (i === current) {
      slide.classList.add("active");
    } else if (i === (current - 1 + slides.length) % slides.length) {
      slide.classList.add("left");
    } else if (i === (current + 1) % slides.length) {
      slide.classList.add("right");
    } else if (i === (current - 2 + slides.length) % slides.length) {
      slide.classList.add("far-left");
    } else if (i === (current + 2) % slides.length) {
      slide.classList.add("far-right");
    }
  });
}

function addHoverEffect(button, hoverFlagSetter) {
  button.addEventListener("mouseenter", () => {
    hoverFlagSetter(true);
  });
  button.addEventListener("mouseleave", () => {
    hoverFlagSetter(false);
    button.style.background = defaultBg;
  });
}

btnPrev.addEventListener("click", () => {
  current = (current - 1 + slides.length) % slides.length;
  updateSlides();
});

btnNext.addEventListener("click", () => {
  current = (current + 1) % slides.length;
  updateSlides();
});


updateSlides();