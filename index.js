document.addEventListener('DOMContentLoaded', function() {
    // Load existing entries from localStorage when the page is loaded
    loadEntries();

    document.getElementById('registration-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const termsAccepted = document.getElementById('terms').checked ? 'Yes' : 'No';

        // Validate email
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Validate age (between 18 and 55)
        const age = calculateAge(new Date(dob));
        if (age < 18 || age > 55) {
            alert("Age must be between 18 and 55.");
            return;
        }

        // Create entry object
        const entry = {
            name,
            email,
            password,
            dob,
            termsAccepted
        };

        // Save entry to localStorage
        saveEntry(entry);

        // Add entry to the table immediately
        addEntryToTable(entry);

        // Reset the form
        document.getElementById('registration-form').reset();
    });
});

// Validate email using regex
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Calculate age from date of birth
function calculateAge(dob) {
    const diff = Date.now() - dob.getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    return age;
}

// Save entry to localStorage
function saveEntry(entry) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
}

// Load entries from localStorage and add them to the table
function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.forEach(addEntryToTable);
}

// Add a new entry to the table
function addEntryToTable(entry) {
    const tableBody = document.getElementById('table-body');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.termsAccepted}</td>
    `;

    tableBody.appendChild(newRow);
}
