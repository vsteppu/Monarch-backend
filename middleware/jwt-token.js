import jwt from 'jsonwebtoken'

export const setJWT = async (c) => {
    const { email } = await c.req.json();
    const jwtSecret = c.env.JWT_SECRET;
    console.log('jwtSecret: ', jwtSecret);

    const token = jwt.sign(
        email,
        c.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
    console.log('Generated JWT: ', token);
    
    c.cookie(
        'token',
        token, 
        {
            httpOnly: true,       // cant be accessed with JS
            secure: true,         // only through HTTPS
            sameSite: 'strict',   // prevent sending through sites
            maxAge: 60 * 1000,    // 1 hour
        }
    )

    return c.json({ 
        success: true,
        message: 'User logged in',
        token
    })
}

// route protejată
export const getJWT = (c) => {
    const token = c.req.cookie('token')

    if (!token) {
        c.status(401)
        return c.json({ message: 'Unauthorized' })
    }

    try {
        const user = jwt.verify(token, c.env.JWT_SECRET)
        return c.json({ user })
    } catch {
        c.status(401)
        c.json({ message: 'Invalid token' })
    }
}
