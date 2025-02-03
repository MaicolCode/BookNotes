import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function RegisterPage() {
  const { isAuthenticated, signUp, errors, messageError } = useAuth()

  const navigate = useNavigate()

  const [hiddenMessage, setHiddenMessage] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/login')
  }, [isAuthenticated])

  useEffect(() => {
    if (messageError) setHiddenMessage(true)
  }, [messageError])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    }

    signUp(user)
  }

  if (errors.length > 0) {
    errors.forEach((error) => toast.error(error))
  }

  return (
    <section className='h-screen w-screen flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center h-auto w-[500px] p-10 shadow-[4px_6px_9px_1px_rgba(1,1,1,0.2)] text-slate-800 text-md rounded-md'>
        <h1 className='text-xl font-bold '>Register an account in</h1>
        <h2 className='text-3xl font-bold mb-5'>Book Notes</h2>
        {hiddenMessage && (
          <p className='p-2 w-full rounded-md border bg-red-500 text-white my-5 text-sm'>
            {messageError}
          </p>
        )}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            name='username'
            className='p-2 w-full rounded-md border'
            placeholder='Username'
          />
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            className='p-2 w-full rounded-md border'
            placeholder='Email'
            onChange={() => setHiddenMessage(false)}
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            className='p-2 w-full rounded-md border '
            placeholder='Password'
          />
          <p className='flex gap-3 justify-center text-md text-slate-800'>
            Alredy have an account?{' '}
            <Link to='/login' className='text-blue-500 underline'>
              Login
            </Link>
          </p>
          <button
            type='submit'
            className='bg-slate-500 hover:bg-slate-700 mt-10 text-white font-medium py-2 px-4 rounded-md'
          >
            Register account
          </button>
        </form>
        <Toaster expand={true} position='top-right' />
      </div>
    </section>
  )
}

export default RegisterPage
