/* =====================================================
   WANDERLY — HOMEPAGE SCRIPT
   Beginner note: this file has 4 independent parts.
   Each part is wrapped in comments explaining WHAT it
   does and WHY, so you can learn from it, not just copy it.
===================================================== */


/* ---------- PART 1: NAVBAR — change style on scroll ---------- */
// We grab the navbar element once and store it in a variable,
// so we don't have to search the page for it every time.
const navbar = document.getElementById("navbar");

// "scroll" is an event that fires every time the user scrolls the page.
window.addEventListener("scroll", function () {
  // window.scrollY tells us how many pixels we've scrolled from the top.
  if (window.scrollY > 40) {
    navbar.classList.add("is-scrolled"); // adds the CSS class that gives navbar a background
  } else {
    navbar.classList.remove("is-scrolled");
  }
});


/* ---------- PART 2: NAVBAR — mobile hamburger menu ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", function () {
  // classList.toggle() adds the class if it's missing, removes it if present.
  // This is perfect for "on/off" UI states like an open/closed menu.
  navLinks.classList.toggle("is-open");
});


/* ---------- PART 3: SCROLL-REVEAL ANIMATIONS ---------- */
// Any element with a data-animate="fade-up" attribute starts hidden (see CSS)
// and fades into view the moment it scrolls into the browser's viewport.

// 1. Collect every element that has the data-animate attribute.
const animatedElements = document.querySelectorAll("[data-animate]");

// 2. An IntersectionObserver watches elements and tells us when they
//    enter or leave the visible part of the screen.
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // The element is now visible on screen — reveal it.
        entry.target.classList.add("is-visible");
        // We only need to animate it once, so stop watching it.
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 } // fire when at least 15% of the element is visible
);

// 3. Tell the observer to start watching each animated element.
animatedElements.forEach(function (el) {
  observer.observe(el);
});


/* ---------- PART 4: HERO SEARCH FORM VALIDATION ---------- */
// This is the main form. We validate it field-by-field and show
// an error message under any field that fails, exactly like real
// booking sites (Agoda, Booking.com) do.

const searchForm = document.getElementById("searchForm");
const formSuccess = document.getElementById("formSuccess");

// Grab the input fields themselves...
const destinationInput = document.getElementById("destination");
const checkinInput = document.getElementById("checkin");
const checkoutInput = document.getElementById("checkout");
const guestsInput = document.getElementById("guests");

// ...and the little red error <span> that sits below each one.
const destinationError = document.getElementById("destinationError");
const checkinError = document.getElementById("checkinError");
const checkoutError = document.getElementById("checkoutError");
const guestsError = document.getElementById("guestsError");

// Helper function: shows an error message under a field.
// We reuse this for every field instead of repeating the same code 4 times.
function showError(inputEl, errorEl, message) {
  inputEl.closest(".field").classList.add("has-error");
  inputEl.closest(".field").classList.remove("is-valid");
  errorEl.textContent = message;
}

// Helper function: marks a field as valid and clears any old error.
function showValid(inputEl, errorEl) {
  inputEl.closest(".field").classList.remove("has-error");
  inputEl.closest(".field").classList.add("is-valid");
  errorEl.textContent = "";
}

// Each function below checks ONE field and returns true (valid) or false (invalid).

function validateDestination() {
  const value = destinationInput.value.trim(); // trim() removes extra spaces

  if (value === "") {
    showError(destinationInput, destinationError, "Please enter a destination.");
    return false;
  }
  if (value.length < 3) {
    showError(destinationInput, destinationError, "Destination must be at least 3 characters.");
    return false;
  }

  showValid(destinationInput, destinationError);
  return true;
}

function validateCheckin() {
  const value = checkinInput.value;

  if (value === "") {
    showError(checkinInput, checkinError, "Please choose a check-in date.");
    return false;
  }

  // Compare the chosen date to today's date so people can't pick the past.
  const today = new Date();
  today.setHours(0, 0, 0, 0); // ignore the time portion, compare dates only
  const chosenDate = new Date(value);

  if (chosenDate < today) {
    showError(checkinInput, checkinError, "Check-in date can't be in the past.");
    return false;
  }

  showValid(checkinInput, checkinError);
  return true;
}

function validateCheckout() {
  const value = checkoutInput.value;

  if (value === "") {
    showError(checkoutInput, checkoutError, "Please choose a check-out date.");
    return false;
  }

  // Check-out must be AFTER check-in (only makes sense if check-in is filled in).
  if (checkinInput.value !== "") {
    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(value);

    if (checkoutDate <= checkinDate) {
      showError(checkoutInput, checkoutError, "Check-out must be after check-in.");
      return false;
    }
  }

  showValid(checkoutInput, checkoutError);
  return true;
}

function validateGuests() {
  const value = guestsInput.value;

  if (value === "") {
    showError(guestsInput, guestsError, "Please enter number of guests.");
    return false;
  }

  const numberOfGuests = Number(value);

  if (numberOfGuests < 1) {
    showError(guestsInput, guestsError, "At least 1 guest is required.");
    return false;
  }
  if (numberOfGuests > 20) {
    showError(guestsInput, guestsError, "Max 20 guests per booking.");
    return false;
  }

  showValid(guestsInput, guestsError);
  return true;
}

// LIVE VALIDATION: check each field the moment the user leaves it (on "blur"),
// rather than waiting until they hit Submit. This gives instant feedback,
// which is exactly what you asked for ("validation below the field").
// destinationInput.addEventListener("blur", validateDestination);
// checkinInput.addEventListener("blur", validateCheckin);
// checkoutInput.addEventListener("blur", validateCheckout);
// guestsInput.addEventListener("blur", validateGuests);

// FINAL CHECK ON SUBMIT: re-validate everything when the form is submitted,
// in case the user never clicked into a field at all.
searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stops the page from refreshing (default form behavior)

  const isDestinationValid = validateDestination();
  const isCheckinValid = validateCheckin();
  const isCheckoutValid = validateCheckout();
  const isGuestsValid = validateGuests();

  const isFormValid = isDestinationValid && isCheckinValid && isCheckoutValid && isGuestsValid;

  if (isFormValid) {
    // All good! In a real site, this is where you'd send the data to
    // your backend/API. For now we just show a success message.
    formSuccess.classList.add("is-visible");

    // Hide the success message again after 4 seconds.
    setTimeout(function () {
      formSuccess.classList.remove("is-visible");
    }, 4000);

    console.log("Search submitted:", {
      destination: destinationInput.value,
      checkin: checkinInput.value,
      checkout: checkoutInput.value,
      guests: guestsInput.value,
    });
  } else {
    // If invalid, make sure the success message is hidden.
    formSuccess.classList.remove("is-visible");
  }
});


/* ---------- PART 5: NEWSLETTER EMAIL VALIDATION (simple bonus form) ---------- */
const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");

newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // A simple regular expression (pattern) that checks for "something@something.something"
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(newsletterEmail.value.trim())) {
    alert("Thanks for subscribing! 🎉");
    newsletterForm.reset(); // clears the input field
  } else {
    alert("Please enter a valid email address.");
  }
});

