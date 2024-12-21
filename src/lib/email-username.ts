const emailToUsername = (email: string): string => {
    const name = email.split("@")[0];
    const username = name.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""); // removes characters except alphabets / number

    return username;
}

export default emailToUsername;