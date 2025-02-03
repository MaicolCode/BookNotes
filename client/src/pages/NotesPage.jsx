import { Link, Outlet, Route, Routes } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNotes } from '../hooks/useNotes'
import NotesFormPage from './NotesFormPage'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'

export default function NotesPage() {
  const { notes, removeNote, viewNotes } = useNotes()
  const { user } = useAuth()

  useEffect(() => {
    viewNotes()
  }, [])

  const handleDelete = async (id) => {
    removeNote(id)
  }

  return (
    <section className='h-full w-full p-4 text-slate-800 text-md'>
      <section className='h-full  overflow-auto p-3 shadow-[4px_6px_9px_1px_rgba(1,1,1,0.2)] rounded-md flex   flex-col gap-3 '>
        <Navbar />
        <div className='flex gap-3 w-full h-full'>
          <div>
            <h1 className='text-2xl font-bold mt-5'>
              <span className='text-4xl underline'> Note Book</span> of{' '}
              {user.username}
            </h1>
            <div className='flex flex-col gap-3 mt-5 w-[340px] p-2 rounded-md shadow-[0_0_5px_0_rgba(1,1,1,0.2)]'>
              <Link to='/notes/add-notes' className='text-blue-500 underline'>
                Add a new note
              </Link>
              {notes.length === 0 ? (
                <span>No notes yet</span>
              ) : (
                notes.map((note) => (
                  <div
                    key={note._id}
                    className='text-sm flex flex-col gap-3 w-auto py-3 px-2 rounded-lg shadow-[3px_3px_5px_1px_rgba(1,1,1,0.2)]  cursor-pointer hover:bg-slate-50 hover:shadow-[3px_3px_5px_0_rgba(1,1,1,0.2)] transition delay-100 ease-in-out'
                  >
                    <div className='flex flex-col gap-1 '>
                      <div className='flex gap-2 w-full text-xs'>
                        <div className='flex gap-2'>
                          <Link
                            onClick={() => handleDelete(note._id)}
                            className='text-red-500  p-1 bg-slate-700 rounded-md'
                          >
                            Delete
                          </Link>

                          <Link
                            to={`/notes/view-notes/${note._id}`}
                            className='text-slate-200 p-1 bg-slate-700 rounded-md'
                          >
                            Update
                          </Link>
                        </div>
                        <aside className='flex justify-end gap-2 w-full text-xs'>
                          <span className=' font-medium text-slate-600'>
                            Date:
                          </span>
                          <span>
                            {new Date(note.createdAt).toLocaleDateString(
                              'es-ES'
                            )}
                          </span>
                        </aside>
                      </div>
                      <p
                        type='text'
                        placeholder='Title'
                        name='title'
                        className='p-2'
                      >
                        <strong>Note of day:</strong> <span>{note.title}</span>
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className='w-full  rounded-md shadow-[0_0_5px_0_rgba(1,1,1,0.2)] p-5'>
            <Routes>
              <Route
                index
                element={
                  <div className='flex flex-col gap-4 w-full h-full items-center justify-center opacity-80'>
                    <h1 className='text-2xl font-bold mt-5'>Your Note Book</h1>
                    <div className='w-[60%] flex flex-col gap-2 '>
                      <p>Welcome to your note book {user.username}</p>
                      <p>
                        Here you will have a medium in which you can store and
                        save the most precious notes of your day to day, this is
                        a page in which you are free to save your ideas,
                        thoughts or some other topic that you would like to keep
                        ❤
                      </p>

                      <span className='mt-10'>
                        Having said all that have a happy day and I hope the
                        best for you.
                      </span>
                    </div>
                  </div>
                }
              />
              <Route path='/add-notes' element={<NotesFormPage />} />
              <Route path='/view-notes/:id' element={<NotesFormPage />} />
              <Route path='*' element={<h1>404 Not Found</h1>} />
            </Routes>
            <Outlet />
          </div>
        </div>
      </section>
    </section>
  )
}
