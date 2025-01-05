const btn = document.querySelector('.btn');
const passwordHTML = document.querySelector('.password-text');
const inputLength = document.querySelector('.char-length');
const lowerCaseOption = document.querySelector('.lower-case');
const upperCaseOption = document.querySelector('.upper-case');
const numberOption = document.querySelector('.number-case');
const symbolOption = document.querySelector('.symbol-case');
const copyBtn = document.querySelector('.copy-btn');

function generatePassword(length, includeLowerCase, includeUpperCase, includeNumber, includeSymbol) {
    const lowerCaseChar = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChar = "0123456789";
    const symbolChar = "!@#$%^&*()_-+=<>?/{}[]~";

    let allowedChars = "";
    let password = "";

    allowedChars += includeLowerCase ? lowerCaseChar : "";
    allowedChars += includeUpperCase ? upperCaseChar : "";
    allowedChars += includeNumber ? numberChar : "";
    allowedChars += includeSymbol ? symbolChar : "";

    if (length < 1 && allowedChars.length === 0) {
        return `(You must type password length and select set of characters)`;
    } else if (length < 1) {
        return `(Password length must be at least 1 character)`;
    } else if (allowedChars.length === 0) {
        return `(You must select at least 1 set of characters to generate the password)`;
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    return password;
}


function passwordGeneration() {
    const passwordLength = Number(inputLength.value);
    let includeLowerCase = lowerCaseOption.checked;
    let includeUpperCase = upperCaseOption.checked;
    let includeNumber = numberOption.checked;
    let includeSymbol = symbolOption.checked;

    const password = generatePassword(passwordLength, includeLowerCase, includeUpperCase, includeNumber, includeSymbol);

    if (password) {
        passwordHTML.textContent = password;
        passwordHTML.style.display = 'block';
        copyBtn.style.display = 'inline-block';
    } else {
        passwordHTML.style.display = 'none';
        copyBtn.style.display = 'none';
    }

    if (passwordLength < 1 || (!includeLowerCase && !includeUpperCase && !includeNumber && !includeSymbol)) {
        copyBtn.style.display = 'none';
    }
}


function passwordCopy() {
    const passwordText = passwordHTML.textContent;
    const messageElement = document.createElement('div');

    if (passwordText) {
        navigator.clipboard.writeText(passwordText) 
            .then(() => {
                messageElement.textContent = "Password copied to clipboard!";
                messageElement.style.color = "green";
                messageElement.style.marginTop = "10px";
                messageElement.style.transition = "opacity 0.5s ease";
                messageElement.style.opacity = "1";

                copyBtn.parentNode.appendChild(messageElement);

                setTimeout(() => {
                    messageElement.style.opacity = "0";
                    setTimeout(() => messageElement.remove(), 500);
                }, 3000);
            })
            .catch((error) => {
                console.error("Failed to copy password:", error);
            });
    }
}

btn.addEventListener('click', passwordGeneration);

inputLength.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        passwordGeneration();
    }
});


copyBtn.addEventListener('click', passwordCopy);



