import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../libs/jwt.js'
import { TOKEN_SECRET } from '../config.js'

export const registerUser = async (req, res) => {
  const { username, password, email } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    return res.status(400).json({ message: 'Email already exists' })
  }

  try {
    const passwordMatch = await bcrypt.hash(password, 10) // Hasheamos la contraseña con bcrypt

    const newUser = new User({ username, password: passwordMatch, email })
    const savedUser = await newUser.save()

    const token = await createAccessToken({ id: savedUser._id })

    res.cookie('token', token)

    res.json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      token
    })
  } catch (error) {
    console.log(error)
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const userFound = await User.findOne({ email })

    if (!userFound) {
      return res
        .status(404)
        .json({ message: 'User not found, register first.' })
    }

    const isMatch = await bcrypt.compare(password, userFound.password)

    if (!isMatch) {
      return res.status(401).json({ message: 'User or password incorrect.' })
    }

    const token = await createAccessToken({ id: userFound._id })

    res.cookie('token', token)

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      token
    })
  } catch (error) {
    res.status(500).json({ message: 'Error of authentication.' })
  }
}

export const logoutUser = (req, res) => {
  res.cookie('token', '', { expires: new Date(0) })
  res.sendStatus(200)
}

export const validateToken = async (req, res) => {
  const cookies = req.cookies
  const { token } = cookies

  if (!token) return res.status(401).json({ message: 'No token provided' })

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err)
      return res.status(401).json({ message: 'Invalid token or expired token' })

    const userFound = await User.findById(user.id)

    if (!userFound) return res.status(404).json({ message: 'User not found' })

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })
  })
}

export const profileUser = async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if (!userFound) return res.status(404).json({ message: 'User not found' })

  res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  })
}
