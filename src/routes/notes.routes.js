import { Router } from 'express'
import { validateAuth } from '../middlewares/validateToken.js'
import {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote
} from '../controllers/notes.controller.js'
import { validateSchema } from '../middlewares/validator.js'
import { createNoteSchema } from '../schemas/notes.schema.js'

const route = new Router()

route.get('/notes', validateAuth, getNotes)

route.get('/notes/:id', validateAuth, getNote)
route.post('/notes', validateAuth, validateSchema(createNoteSchema), createNote)
route.delete('/notes/:id', validateAuth, deleteNote)
route.put('/notes/:id', validateAuth, updateNote)

export default route
