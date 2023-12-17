export function isValidEmail(email) {
    if( email === "")return false;
    // Regular expression for a basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isStrongPassword(password) {
    if( password === "")return  false;
    // Check if the password has at least 8 characters and contains a mix of letters, numbers, and symbols
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
}

export function isValidLinkExpression(link) {
    // Regular expression to match a simple URL format
    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?|localhost(:\d{1,5})?)?(\/[^\s]*)?$/;
    // Test if the link matches the regex
    return urlRegex.test(link);
}