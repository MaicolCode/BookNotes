import { createContext, useEffect, useState } from 'react'
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote
} from '../api/notes'

export const NotesContext = createContext()

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    viewNotes()
  }, [])

  const viewNotes = async () => {
    setNotes([])
    try {
      const res = await getNotes()
      if (res.ok) {
        const notes = await res.json()
        setNotes(notes)
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  const viewNote = async (id) => {
    try {
      if (id === undefined) return
      const res = await getNote(id)
      if (res.ok) {
        return res.json()
      } else {
        return false
      }
    } catch (error) {
      console.error(error)
    }
  }

  const addNote = async (note) => {
    setErrors([])
    try {
      const res = await createNote(note)
      if (res.ok) {
        viewNotes()
      } else {
        const error = await res.json()
        if (Array.isArray(error.errors)) {
          setErrors(error.errors)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeNote = async (id) => {
    setErrors([])
    try {
      const res = await deleteNote(id)
      if (res.ok) {
        viewNotes()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const modifyNote = async (id, note) => {
    setErrors([])
    try {
      const res = await updateNote(id, note)
      if (res.ok) {
        viewNotes()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        viewNotes,
        viewNote,
        addNote,
        removeNote,
        modifyNote,
        errors
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}
