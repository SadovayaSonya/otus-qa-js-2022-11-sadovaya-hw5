export default function randomPassword() {
    let password = '';
    const digits = '0123456789';
    const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const specialCharacters = '!@#$%^&*()';

    password = addSymbol(digits) + addSymbol(capitalLetters) + addSymbol(lowercaseLetters) + addSymbol(specialCharacters);
    return password;
};

function addSymbol(characters) {
    let i = 0;
    let result = '';
    while (i < 3) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        i++;
    }
    return result;
};
