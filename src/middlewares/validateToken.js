import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const validateAuth = (req, res, next) => {
  const cookies = req.cookies

  const { token } = cookies

  if (!token) return res.status(401).json({ message: 'No token provided' })

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(401).json({ message: 'Invalid token or expired token' })
    req.user = user
    next()
  })
}
