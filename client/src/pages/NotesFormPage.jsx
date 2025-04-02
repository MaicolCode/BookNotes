import { toast, Toaster } from 'sonner'
import { useNotes } from '../hooks/useNotes'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
export default function NotesFormPage() {
  const { addNote, modifyNote, errors, viewNote } = useNotes()

  const params = useParams()
  const [note, setNote] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    if (params.id) {
      async function getNote() {
        const res = await viewNote(params.id)

        if (!res) {
          navigate('/error-pages')
        }

        setNote(res)
      }

      getNote()
    }

    return
  }, [params.id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const content = e.target.content.value

    addNote({ title, content })

    if (title.length > 0 && content.length > 0) {
      navigate('/notes')
      e.target.reset()
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const title = e.target.title.value
    const content = e.target.content.value

    modifyNote(params.id, { title, content })

    if (title.length > 0 && content.length > 0) {
      navigate(`/notes`)
      e.target.reset()
    }
  }

  if (errors.length > 0) {
    errors.forEach((error) => toast.error(error))
  }

  return (
    <section className='h-full w-full bg-opacity-10 text-slate-800'>
      <div
        className='w-full h-full overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-slate-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-slate-200'
      >
        <h1 className='text-3xl font-bold p-3 border-b'>
          {params.id ? 'Update a existing note' : 'Create a new note'}
        </h1>
        <form
          onSubmit={params.id ? handleUpdate : handleSubmit}
          className='flex flex-col gap-3 p-5 h-auto  '
        >
          <div className='w-full flex justify-end'>
            <button
              type='submit'
              className='bg-slate-500 hover:bg-slate-700 text-sm text-white font-medium py-2 px-4 rounded-md w-auto'
            >
              {params.id ? 'Update Note' : 'Create a Note'}
            </button>
          </div>
          <div className='flex flex-col gap-1'>
            <label
              htmlFor='title'
              className='text-sm font-medium text-slate-600'
            >
              Title of the note:
            </label>
            <input
              type='text'
              placeholder='Title'
              name='title'
              id='title'
              className='border rounded-md p-2'
              defaultValue={params.id ? note?.title : ''}
            />
          </div>
          <div className='flex flex-col gap-1 h-full'>
            <label
              htmlFor='content'
              className='text-sm font-medium text-slate-600'
            >
              Content of the note:
            </label>
            <textarea
              placeholder='Content'
              name='content'
              id='content'
              rows={15}
              className='border rounded-md p-2'
              defaultValue={params.id ? note?.content : ''}
            ></textarea>
          </div>
        </form>
        <Toaster expand={true} position='top-right' />
      </div>
    </section>
  )
}
