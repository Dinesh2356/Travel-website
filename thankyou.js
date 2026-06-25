/* =====================================================
   THANK YOU PAGE SCRIPT
   Beginner note: this page's whole job is to read the
   data that contact.js saved into localStorage, and
   display it as a table. If there's no data (e.g. someone
   typed this URL directly without filling the form first),
   we show a friendly "no submission found" message instead.
===================================================== */

// Grab the saved text from localStorage using the SAME key name
// that contact.js used when saving it ("wanderlyContactSubmission").
const savedDataText = localStorage.getItem("wanderlyContactSubmission");

// TEMPORARY DEBUG LINE — remove this once everything works.
// Open your browser console (press F12, click "Console" tab) and
// reload this page. You'll see exactly what was found (or null).
console.log("Saved data from localStorage:", savedDataText);

const tableBody = document.getElementById("detailsTableBody");
const table = document.getElementById("detailsTable");
const emptyMessage = document.getElementById("emptyMessage");
const thanksName = document.getElementById("thanksName");

if (savedDataText) {
  // The data was saved as a JSON text string, so we convert it back
  // into a real JavaScript object using JSON.parse() (the opposite
  // of JSON.stringify(), which contact.js used to save it).
  const data = JSON.parse(savedDataText);

  // Greet the user by name at the top of the page.
  thanksName.textContent = data.fullName;

  // This list controls which fields show up as table rows, and in
  // what order — and gives each one a friendly label.
  const rows = [
    { label: "Full Name", value: data.fullName },
    { label: "Email", value: data.email },
    { label: "Phone Number", value: data.phone },
    { label: "Subject", value: data.subject },
    { label: "Destination", value: data.destination },
    { label: "Message", value: data.message },
    { label: "Submitted On", value: data.submittedAt },
  ];

  // Build one <tr> (table row) for each item in the list above,
  // and add it into the table body.
  rows.forEach(function (row) {
    const tr = document.createElement("tr");

    const labelCell = document.createElement("td");
    labelCell.textContent = row.label;

    const valueCell = document.createElement("td");
    valueCell.textContent = row.value;

    tr.appendChild(labelCell);
    tr.appendChild(valueCell);
    tableBody.appendChild(tr);
  });

} else {
  // No data found — hide the (empty) table and show the fallback message instead.
  table.style.display = "none";
  emptyMessage.style.display = "block";
  thanksName.textContent = "there";
}