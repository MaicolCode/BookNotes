import { useContext } from 'react'
import { NotesContext } from '../context/NotesContext'

export const useNotes = () => {
  const { notes, viewNote, viewNotes, addNote, removeNote, modifyNote, errors } =
    useContext(NotesContext)
  return { notes, viewNote, viewNotes, addNote, removeNote, modifyNote, errors }
}
