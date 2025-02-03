import Note from '../models/note.model.js'

export const getNotes = async (req, res) => {
  console.log(req.user)
  const notes = await Note.find({ user: req.user.id }).populate('user')

  res
    .status(200)
    .json(
      notes.filter(
        (note) =>
          new Date(note.date).toLocaleDateString() ===
          new Date().toLocaleDateString()
      )
    )
}

export const getNote = async (req, res) => {
  const { id } = req.params
  try {
    const note = await Note.findById(id).populate('user')

    if (!note) {
      res.status(404).json({ message: 'Note not found' })
    }

    res.status(200).json(note)
  } catch (error) {
    res.status(500).json({ message: 'Error' })
  }
}

export const createNote = async (req, res) => {
  const { title, content, date } = req.body
  try {
    const note = await Note.create({ title, content, date, user: req.user.id })
    const savedNote = await note.save()

    res.status(201).json(savedNote)
  } catch (error) {
    res.status(400).json({ message: 'Error creating note' })
  }
}

export const deleteNote = async (req, res) => {
  const { id } = req.params
  const note = await Note.findByIdAndDelete(id)

  if (!note) {
    res.status(404).json({ message: 'Note not found' })
  }

  res.status(200).json({ message: 'Note deleted' })
}

export const updateNote = async (req, res) => {
  const { id } = req.params

  const note = await Note.findByIdAndUpdate(id, req.body, {
    new: true
  }).populate('user')

  if (!note) {
    res.status(404).json({ message: 'Note not found' })
  }

  res.json(note)
}
