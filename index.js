document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked ? 'Yes' : 'No';

    // Create a new table row
    const tableBody = document.getElementById('table-body');
    const newRow = document.createElement('tr');

    // Create and append table cells
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>${dob}</td>
        <td>${termsAccepted}</td>
    `;

    tableBody.appendChild(newRow);

    // Optionally, clear the form after submission
    document.getElementById('registration-form').reset();
});
