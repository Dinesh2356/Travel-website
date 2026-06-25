
/* =====================================================
   ABOUT US PAGE SCRIPT
   Beginner note: this file does ONE thing — it animates
   the stat numbers (like "2000") counting up from 0,
   but only once the user actually scrolls to see them.
   All the other behavior (navbar scroll, mobile menu,
   fade-up animations) is already handled by script.js,
   which this page also loads.
===================================================== */

// Grab every element that has a data-count attribute, e.g. data-count="2000"
const statNumbers = document.querySelectorAll(".stat-card__number");

// This function animates ONE number element from 0 up to its target value.
function animateCount(el) {
  // Read the target number from the HTML attribute (it comes in as text, so we convert it).
  const target = Number(el.getAttribute("data-count"));

  const duration = 1500; // total animation time in milliseconds (1.5 seconds)
  const startTime = performance.now(); // a precise timestamp for "now"

  function updateNumber(currentTime) {
    // How much time has passed since we started, as a value between 0 and 1.
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // never let it go above 1

    // Calculate the current number to display based on progress.
    const currentValue = Math.floor(progress * target);
    el.textContent = currentValue.toLocaleString(); // adds commas, e.g. "150,000"

    if (progress < 1) {
      // Not finished yet — ask the browser to run this again on the next frame.
      requestAnimationFrame(updateNumber);
    } else {
      // Make sure it ends exactly on the target number (avoids rounding gaps).
      el.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(updateNumber);
}

// We only want the count-up animation to play once the stats section
// scrolls into view — not immediately when the page loads.
const statsObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statsObserver.unobserve(entry.target); // only animate once per number
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach(function (el) {
  statsObserver.observe(el);
});