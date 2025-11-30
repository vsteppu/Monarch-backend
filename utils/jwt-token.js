import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import expressJWT from 'express-jwt'

// login
export const setJWT = (req, res) => {
  const { email } = req.body
  const token = jwt.sign({ email }, 'secret_key', { expiresIn: '1h' })

  res.cookie('token', token, {
    httpOnly: true,       // cant be accessed with JS
    secure: true,         // only through HTTPS
    sameSite: 'strict',   // prevent sending through sites
    maxAge: 60 * 1000,      // 1 hour
  })

  res.json({ success: true, message: 'User logged in' })
}

// route protejată
const getJWT = (req, res) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const user = jwt.verify(token, 'secret_key')
    res.json({ user })
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}
