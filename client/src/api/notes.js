const API_URL = 'http://localhost:3000'

export const getNotes = async () => {
  const res = await fetch(`${API_URL}/api/notes`, {
    credentials: 'include'
  })
  return res
}

export const getNote = async (id) => {
  const res = await fetch(`${API_URL}/api/notes/${id}`, {
    credentials: 'include'
  })
  return res
}

export const createNote = async (note) => {
  const res = await fetch(`${API_URL}/api/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    credentials: 'include',
    body: JSON.stringify(note)
  })
  return res
}

export const updateNote = async (id, note) => {
  const res = await fetch(`${API_URL}/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    credentials: 'include',
    body: JSON.stringify(note)
  })
  return res
}

export const deleteNote = async (id) => {
  const res = await fetch(`${API_URL}/api/notes/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  return res
}
