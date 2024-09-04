document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const dataTable = document.getElementById('dataTable');

    // Load existing data from local storage
    const savedData = JSON.parse(localStorage.getItem('formData')) || [];
    savedData.forEach(addDataToTable);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const termsAccepted = document.getElementById('terms').checked;

        // Validation for age between 18 and 55
        const age = calculateAge(dob);
        if (age < 18 || age > 55) {
            alert('You must be between 18 and 55 years old.');
            return;
        }

        const formData = { name, email, password, dob, termsAccepted };

        // Save data to local storage
        savedData.push(formData);
        localStorage.setItem('formData', JSON.stringify(savedData));

        // Add data to table
        addDataToTable(formData);

        // Reset the form
        form.reset();
    });

    function calculateAge(dob) {
        const birthDate = new Date(dob);
        const diff = Date.now() - birthDate.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function addDataToTable(data) {
        const row = dataTable.insertRow();
        row.insertCell(0).innerText = data.name;
        row.insertCell(1).innerText = data.email;
        row.insertCell(2).innerText = data.password;
        row.insertCell(3).innerText = data.dob;
        row.insertCell(4).innerText = data.termsAccepted ? 'Yes' : 'No';
    }
});
