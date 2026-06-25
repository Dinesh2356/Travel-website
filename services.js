/* =====================================================
   SERVICES PAGE SCRIPT
   Beginner note: this file makes the service cards tilt
   in 3D when you move your mouse over them — like the
   card is physically following your cursor. It does NOT
   use any external library, just plain JavaScript math.

   The navbar scroll/menu behavior and scroll-reveal
   animations are already handled by script.js, which
   this page also loads. The 3D globe lives in globe.js.
===================================================== */

// Grab every tilt card on the page.
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach(function (card) {
  const inner = card.querySelector(".tilt-card__inner");

  // "mousemove" fires continuously as the cursor moves across the card.
  card.addEventListener("mousemove", function (event) {
    // getBoundingClientRect() tells us the card's position and size on screen.
    const rect = card.getBoundingClientRect();

    // Find the mouse position RELATIVE to the card (0,0 = top-left of the card).
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Find the card's center point.
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // How far is the mouse from the center, as a percentage (-1 to 1)?
    // Example: mouse at the far right edge → percentX = 1
    //          mouse at the far left edge  → percentX = -1
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    // Convert that percentage into a rotation angle.
    // We keep this small (max ~10 degrees) so it feels subtle, not gimmicky.
    const maxRotation = 10;
    const rotateY = percentX * maxRotation;   // moving mouse left/right tilts the card left/right
    const rotateX = percentY * maxRotation * -1; // moving mouse up/down tilts the card up/down

    // Apply the rotation. translateZ slightly lifts the whole card forward,
    // which combined with the icon/text translateZ values in services.css
    // creates the "layered" 3D pop-out effect.
    inner.style.transform =
      "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateZ(8px)";
  });

  // When the mouse leaves the card, smoothly reset it back to flat.
  card.addEventListener("mouseleave", function () {
    inner.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
  });
});


