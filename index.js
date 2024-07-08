const button = document.querySelector(`.finished-button`);
const form = document.querySelector(`.register-form`);
const inputs = form.querySelectorAll(`.required`);

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

document.addEventListener(`DOMContentLoaded`, () => {

    const validateInput = (input) => {
        let isValid = false;

        if (input.id === `password`) {
            if (input.value.length >= 8) {
                isValid = true;
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

console.log(inputs[0])

form.addEventListener(`submit`, (event) => {
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

    const user = {
        name: nameValue,
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
        wantsNews: newsValue
    }

    console.log(user);
})


