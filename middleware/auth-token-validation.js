const secretKey = process.env.GOOGLE_SECRET_KEY;
const isRecaptchaEnabled = process.env.GOOGLE_SECRET === 'true';

const authTokenValidation = async (token) => {
    if (!isRecaptchaEnabled) {
        return { success: true, message: "Recaptcha is Disabled" };
    }

    if (!token) {
        return { success: false, message: "No token provided" };
    }

    const response = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${secretKey}&response=${token}`,
        }
    );

    const data = await response.json();

    return data;
};

export default authTokenValidation;
