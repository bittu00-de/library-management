function generatePassword(name, email, phone) {
    return `${name}-${email}-${phone}`;
}

module.exports = generatePassword;