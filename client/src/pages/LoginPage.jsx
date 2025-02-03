import { Link, useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const { isAuthenticated, signIn, errors, messageError } = useAuth()

  const navigate = useNavigate()

  const [hiddenMessage, setHiddenMessage] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  useEffect(() => {
    if (messageError) setHiddenMessage(true)
  }, [messageError])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
      email: e.target.email.value,
      password: e.target.password.value
    }

    signIn(user)
  }

  if (errors.length > 0) {
    errors.forEach((error) => toast.error(error))
  }

  return (
    <section className='h-screen w-screen flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center h-auto w-[500px] p-10 shadow-[4px_6px_9px_1px_rgba(1,1,1,0.2)] text-slate-800 text-md rounded-md'>
        <h1 className='text-xl font-bold'>Login an user in </h1>
        <h2 className='text-3xl font-bold mb-5'>Book Notes</h2>
        {hiddenMessage && (
          <p className='p-2 w-full rounded-md border bg-red-500 text-white my-5 text-sm'>
            {messageError}
          </p>
        )}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            name='email'
            placeholder='Email'
            className='w-full p-2 border rounded-md'
            onChange={() => setHiddenMessage(false)}
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='w-full p-2 border rounded-md'
            onChange={() => setHiddenMessage(false)}
          />

          <p className='flex gap-3 justify-center text-md text-slate-800'>
            Don't have an account?{' '}
            <Link to='/register' className='text-blue-500 underline'>
              Sing up
            </Link>
          </p>
          <button
            type='submit'
            className='bg-slate-500 hover:bg-slate-700 mt-10 text-white font-medium py-2 px-4 rounded-md'
          >
            Login
          </button>
        </form>
        <Toaster expand={true} position='top-right' />
      </div>
    </section>
  )
}
