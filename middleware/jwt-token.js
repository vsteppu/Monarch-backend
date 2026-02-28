import jwt from 'jsonwebtoken'
import { env } from "cloudflare:workers";
import { setCookie } from 'hono/cookie'

export const setJWT = async (c) => {
    const { email } = await c.req.json();
    try {
        const token = jwt.sign( { email }, env.JWT_SECRET, { expiresIn: '1h' } );

        setCookie( c, 'token', token, {
            httpOnly: true,       // cant be accessed with JS
            secure: true,         // only through HTTPS
            sameSite: 'strict',   // prevent sending through sites
            maxAge: 60 * 1000,    // 1 hour
        })

        return token;
    } catch (err) {
        console.error('Error setting JWT: ', err);
    }
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
