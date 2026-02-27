// controllers/login-controller.js

const loginController = async (c) => {
    console.log('new login')
    return c.json({ status: 200, message: 'ok' });
};

export default loginController