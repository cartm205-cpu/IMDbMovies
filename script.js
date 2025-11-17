// Run after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // ===== Play button scroll from Page 1 -> Page 2 =====
  const scrollBtn = document.getElementById("scrollToTop10");
  const top10Section = document.getElementById("page2");

  if (scrollBtn && top10Section) {
    scrollBtn.addEventListener("click", () => {
      top10Section.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ===== Star rating fill logic (10 discrete stars) =====
const ratingBlocks = document.querySelectorAll(".rating-stars");

ratingBlocks.forEach(block => {
  const rating = parseFloat(block.dataset.rating); // e.g., 9.3
  if (isNaN(rating)) return;

  const maxStars = 10;
  block.innerHTML = ""; // clear any existing content

  const fullStars = Math.floor(rating);        // 9
  const fraction = rating - fullStars;         // 0.3

  for (let i = 0; i < maxStars; i++) {
    const star = document.createElement("span");
    star.classList.add("star");
    star.textContent = "★";

    if (i < fullStars) {
      // completely filled star
      star.classList.add("filled");
    } else if (i === fullStars && fraction > 0) {
      // partial star
      star.classList.add("partial");
      star.style.setProperty("--fill", fraction); // 0–1
    }
    // else: empty star

    block.appendChild(star);
  }
});
/* =============================================
   Directors Page Image Fade-in Animations
   ============================================= */

const directorPanels = document.querySelectorAll(".directors-panel");

const directorObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("panel-visible");
            }
        });
    },
    { threshold: 0.25 }
);

directorPanels.forEach((panel) => directorObserver.observe(panel));

  // ===== Horizontal scroll with mouse wheel (nice extra for carousel) =====
  const carouselContainer = document.querySelector(".carousel-container");
  if (carouselContainer) {
    carouselContainer.addEventListener("wheel", (event) => {
      if (event.deltaY === 0) return;
      event.preventDefault();
      carouselContainer.scrollLeft += event.deltaY;
    }, { passive: false });
  }
});
/* ===== Page 4 fade-in on scroll ===== */
const genreElements = document.querySelectorAll('#page4 .fade-in');

function checkGenreVisibility() {
    genreElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkGenreVisibility);
checkGenreVisibility(); // run once on load
/* ========= PAGE 5 : RELEASE YEAR ANIMATIONS ========= */

// Animate release year bars when they scroll into view
const releaseSection = document.querySelector("#page5");
const releaseBars = releaseSection.querySelectorAll(".bar");

function animateReleaseBars(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            releaseBars.forEach(bar => {
                const targetWidth = bar.getAttribute("data-width");
                bar.style.width = targetWidth + "%";
            });
        }
    });
}

const releaseObserver = new IntersectionObserver(animateReleaseBars, {
    threshold: 0.4
});

releaseObserver.observe(releaseSection);
/* ---------- SCROLL REVEAL FOR PAGE 6 ---------- */
const revealElements = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
});
/* ----------- Sparkles Behind Formula Section ----------- */

const formulaSection = document.querySelector('.formula-section');

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    const size = Math.random() * 6 + 4; 
    const left = Math.random() * 90 + 5; 
    const duration = Math.random() * 4 + 4;

    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${left}%`;
    sparkle.style.animationDuration = `${duration}s`;

    formulaSection.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), duration * 1000);
}

setInterval(createSparkle, 900);
// Fade-in trailer on scroll
const trailer = document.getElementById("perfectMovieTrailer");
if (trailer) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trailer.style.opacity = "1";
                trailer.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.3 });

    observer.observe(trailer);
}
