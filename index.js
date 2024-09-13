const dob = document.getElementById('dob');
dob.addEventListener('input', () => valid(dob));
const email = document.getElementById('email');
email.addEventListener('input', () => validate(email));
const submit=document.getElementById('submit');
submit.addEventListener('click', ()=> validate(email));
submit.addEventListener('click', ()=> valid(dob));
function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
function validate(element)
{
    if(element.validity.typeMismatch)
    {
        element.setCustomValidity("Please enter the valid email");

    }
    else{
        element.setCustomValidity("");
    }
    
}
function valid(dobinput)
{
    const dobValue = dobinput.value;
    const age=calculateAge(dobValue)
    if (age < 18 || age > 55) {
        dob.setCustomValidity("You must be between 18 and 55 years old.");
    }
     else {
        dob.setCustomValidity("");
    }
}
const userForm = document.getElementById("user-form");

const retrievEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};

let userEntries = retrievEntries();

const displayEntries = () => {
    const entries = retrievEntries();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class="table-auto w-full"><tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Password</th>
        <th class="px-4 py-2">DOB</th>
        <th class="px-4 py-2">Accepted Terms?</th>
    </tr>${tableEntries}</table>`;
    
    let details = document.getElementById("user-entries");
    details.innerHTML = table;
};

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;

    const entry = {
        name,
        email,
        password,
        dob: dob,
        acceptedTermsAndConditions
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();

function validate(element) {
    if (element.validity.typeMismatch) {
        element.setCustomValidity("Please enter a valid email address.");
        element.reportValidity();
    } else {
        element.setCustomValidity("");
    }
}
