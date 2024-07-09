const labels = [
    `first-name-label`,
    `last-name-label`,
    `username-label`,
    `email-label`,
    `password-label`,
    `confirm-password-label`
];

const inputsArr = [
    `first-name`,
    `last-name`,
    `username`,
    `email`,
    `password`,
    `confirm-password`
];

for (let i = 0; i < labels.length; i++) {
    let label = document.getElementById(labels[i]);
    let input = document.getElementById(inputsArr[i]);
    label.addEventListener(`click`, () => {
        input.focus();
    });
}

//Allegedly good practice to wait until all DOM content is loaded before starting with scripts.
document.addEventListener(`DOMContentLoaded`, () => {
    const button = document.querySelector(`.finished-button`);
    const form = document.querySelector(`.register-form`);
    const inputs = form.querySelectorAll(`.required`);
    
    const validateInput = (input) => {
        let isValid = false;

        if (input.id === `password`) {
            if (input.value.length >= 8) {
                isValid = true;
            }
            //Validates the confirm-password field when a change is done to the password field.
            const confirmPassword = document.querySelector(`#confirm-password`)
            if (confirmPassword.value !== input.value){
                confirmPassword.classList.add(`invalid`);
                confirmPassword.classList.remove(`valid`);
            } else if (confirmPassword.value === input.value && confirmPassword.value.length >= 8) {
                confirmPassword.classList.remove(`invalid`);
                confirmPassword.classList.add(`valid`);
            }
        } else if (input.id === `confirm-password`) {
            const pw = document.querySelector(`#password`).value;
            isValid = input.value === pw && input.value.length >= 8;
        } else if (input.id === `email`) {
            //Validation copied from ChatGPT. The regex should validate that the input is in the correct format
            // as in text@text.text
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        } else {
            isValid = input.value.trim() !== '';
        }

        if (isValid) {
            input.classList.remove(`invalid`);
            input.classList.add(`valid`);
        } else {
            input.classList.add(`invalid`);
            input.classList.remove(`valid`);
        }

        const allValid = Array.from(inputs).every(input => input.classList.contains(`valid`));
        button.disabled = !allValid;
    }

    inputs.forEach(input => {
        input.addEventListener(`input`, () => validateInput(input));
    });
});

document.querySelector(`.register-form`).addEventListener(`submit`, (event) => {
    event.preventDefault();

    const firstname = document.querySelector(`#first-name`);
    const lastname = document.querySelector(`#last-name`);
    const username = document.querySelector(`#username`);
    const email = document.querySelector(`#email`);
    const password = document.querySelector(`#password`);
    const news = document.querySelector(`#news`);

    const nameValue = `${firstname.value} ${lastname.value}`;
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const newsValue = news.checked;

    const registrationData = {
        name: nameValue,
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
        wantsNews: newsValue
    }

    console.log(registrationData);
})



