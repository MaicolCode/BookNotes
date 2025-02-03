import { Router } from 'express'
import {
  loginUser,
  logoutUser,
  profileUser,
  registerUser,
  validateToken
} from '../controllers/auth.controller.js'
import { validateAuth } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'

const route = new Router()

route.post('/register', validateSchema(registerSchema), registerUser)
route.post('/login', validateSchema(loginSchema), loginUser)
route.post('/logout', logoutUser)
route.get('/auth/validate-token', validateToken)
route.get('/profile', validateAuth, profileUser)

export default route
