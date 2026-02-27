// controllers/login-controller.js

const getUserController = async (c) => {
    console.log('this is it');
    const response = 'this is it'
    return response;
    /* const { id } = req.query;
    try {
        const user = await User.findOne({ where: { id } });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    } */
}

export default getUserController;