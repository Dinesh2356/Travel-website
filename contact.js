/* =====================================================
   CONTACT US PAGE SCRIPT
   Beginner note: this page has THREE independent parts.

     PART 1 — validates the SMALL quick form in the hero.
     PART 2 — validates the FULL detailed form below.
     PART 3 — the FAQ accordion (click a question, its
              answer slides open).

   Both forms, when valid, save their data into
   localStorage and redirect to thank-you.html — exactly
   the same pattern, just with different field names.

   HOW DATA TRAVELS TO THE NEXT PAGE:
   Browsers don't let one HTML page directly "hand over"
   data to another page like a function call. Instead we
   use localStorage — a small storage box built into the
   browser that any page on the SAME website can read from
   and write to. So the flow is:
     1. User fills a form and clicks Submit.
     2. We validate it.
     3. If valid, we save the values into localStorage
        under the key "wanderlyContactSubmission".
     4. We redirect to thank-you.html.
     5. thank-you.js reads that same key and builds a
        table from it.
===================================================== */


/* ---------- Shared helper functions (used by both forms) ---------- */

// Shows a red error message below a field and marks it invalid.
function showError(inputEl, errorEl, message) {
  inputEl.closest(".field").classList.add("has-error");
  inputEl.closest(".field").classList.remove("is-valid");
  errorEl.textContent = message;
}

// Clears the error and marks a field as valid (green border).
function showValid(inputEl, errorEl) {
  inputEl.closest(".field").classList.remove("has-error");
  inputEl.closest(".field").classList.add("is-valid");
  errorEl.textContent = "";
}

// Reusable check: does this string look like a valid email address?
function isValidEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value);
}

// Reusable check: is this string a valid 10-digit phone number?
function isValidPhone(value) {
  const phonePattern = /^[0-9]{10}$/;
  return phonePattern.test(value);
}


/* ====================================================
   PART 1: SMALL QUICK FORM (inside the hero)
==================================================== */

const quickForm = document.getElementById("quickForm");
const quickNameInput = document.getElementById("quickName");
const quickContactInput = document.getElementById("quickContact");
const quickMessageInput = document.getElementById("quickMessage");

const quickNameError = document.getElementById("quickNameError");
const quickContactError = document.getElementById("quickContactError");
const quickMessageError = document.getElementById("quickMessageError");

function validateQuickName() {
  const value = quickNameInput.value.trim();
  if (value === "") {
    showError(quickNameInput, quickNameError, "Please enter your name.");
    return false;
  }
  if (value.length < 2) {
    showError(quickNameInput, quickNameError, "Name looks too short.");
    return false;
  }
  showValid(quickNameInput, quickNameError);
  return true;
}

function validateQuickContact() {
  const value = quickContactInput.value.trim();
  if (value === "") {
    showError(quickContactInput, quickContactError, "Enter your email or phone.");
    return false;
  }
  // Accept EITHER a valid email OR a valid 10-digit phone number.
  if (!isValidEmail(value) && !isValidPhone(value)) {
    showError(quickContactInput, quickContactError, "Enter a valid email or 10-digit phone.");
    return false;
  }
  showValid(quickContactInput, quickContactError);
  return true;
}

function validateQuickMessage() {
  const value = quickMessageInput.value.trim();
  if (value === "") {
    showError(quickMessageInput, quickMessageError, "Please write a short message.");
    return false;
  }
  showValid(quickMessageInput, quickMessageError);
  return true;
}

quickNameInput.addEventListener("blur", validateQuickName);
quickContactInput.addEventListener("blur", validateQuickContact);
quickMessageInput.addEventListener("blur", validateQuickMessage);

quickForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const isNameValid = validateQuickName();
  const isContactValid = validateQuickContact();
  const isMessageValid = validateQuickMessage();

  if (isNameValid && isContactValid && isMessageValid) {
    const submissionData = {
      fullName: quickNameInput.value.trim(),
      email: quickContactInput.value.trim(), // could be email OR phone, that's fine
      phone: "—",
      subject: "Quick Message",
      destination: "—",
      message: quickMessageInput.value.trim(),
      submittedAt: new Date().toLocaleString(),
    };

    localStorage.setItem("wanderlyContactSubmission", JSON.stringify(submissionData));
    window.location.href = "thank-you.html";
  }
});


/* ====================================================
   PART 2: FULL DETAILED FORM
==================================================== */

const fullContactForm = document.getElementById("fullContactForm");

const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const subjectInput = document.getElementById("subject");
const destinationInput = document.getElementById("destination");
const messageInput = document.getElementById("message");

const fullNameError = document.getElementById("fullNameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const subjectError = document.getElementById("subjectError");
const destinationError = document.getElementById("destinationError");
const messageError = document.getElementById("messageError");

function validateFullName() {
  const value = fullNameInput.value.trim();
  if (value === "") {
    showError(fullNameInput, fullNameError, "Please enter your full name.");
    return false;
  }
  if (value.length < 3) {
    showError(fullNameInput, fullNameError, "Name must be at least 3 characters.");
    return false;
  }
  showValid(fullNameInput, fullNameError);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (value === "") {
    showError(emailInput, emailError, "Please enter your email address.");
    return false;
  }
  if (!isValidEmail(value)) {
    showError(emailInput, emailError, "Please enter a valid email address.");
    return false;
  }
  showValid(emailInput, emailError);
  return true;
}

function validatePhone() {
  const value = phoneInput.value.trim();
  if (value === "") {
    showError(phoneInput, phoneError, "Please enter your phone number.");
    return false;
  }
  if (!isValidPhone(value)) {
    showError(phoneInput, phoneError, "Enter a valid 10-digit phone number.");
    return false;
  }
  showValid(phoneInput, phoneError);
  return true;
}

function validateSubject() {
  const value = subjectInput.value;
  if (value === "") {
    showError(subjectInput, subjectError, "Please choose a subject.");
    return false;
  }
  showValid(subjectInput, subjectError);
  return true;
}

function validateDestination() {
  const value = destinationInput.value.trim();
  if (value === "") {
    showError(destinationInput, destinationError, "Please tell us a destination.");
    return false;
  }
  showValid(destinationInput, destinationError);
  return true;
}

function validateMessage() {
  const value = messageInput.value.trim();
  if (value === "") {
    showError(messageInput, messageError, "Please write a message.");
    return false;
  }
  if (value.length < 10) {
    showError(messageInput, messageError, "Message must be at least 10 characters.");
    return false;
  }
  showValid(messageInput, messageError);
  return true;
}

fullNameInput.addEventListener("blur", validateFullName);
emailInput.addEventListener("blur", validateEmail);
phoneInput.addEventListener("blur", validatePhone);
subjectInput.addEventListener("change", validateSubject); // dropdowns use "change"
destinationInput.addEventListener("blur", validateDestination);
messageInput.addEventListener("blur", validateMessage);

fullContactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const isFullNameValid = validateFullName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isSubjectValid = validateSubject();
  const isDestinationValid = validateDestination();
  const isMessageValid = validateMessage();

  const isFormValid =
    isFullNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isSubjectValid &&
    isDestinationValid &&
    isMessageValid;

  if (isFormValid) {
    const submissionData = {
      fullName: fullNameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      subject: subjectInput.value,
      destination: destinationInput.value.trim(),
      message: messageInput.value.trim(),
      submittedAt: new Date().toLocaleString(),
    };

    localStorage.setItem("wanderlyContactSubmission", JSON.stringify(submissionData));
    window.location.href = "thank-you.html";
  }
});


/* ====================================================
   PART 3: FAQ ACCORDION
==================================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {
  const questionButton = item.querySelector(".faq-item__question");

  questionButton.addEventListener("click", function () {
    const isCurrentlyOpen = item.classList.contains("is-open");

    // Close every FAQ item first, so only one is open at a time.
    faqItems.forEach(function (otherItem) {
      otherItem.classList.remove("is-open");
    });

    if (!isCurrentlyOpen) {
      item.classList.add("is-open");
    }
  });
});