import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='w-[600px] h-[500px] flex flex-col gap-2 items-center justify-center border p-3 rounded-2xl shadow-[4px_6px_9px_1px_rgba(1,1,1,0.2)] text-slate-800 text-md'>
        <img
          src='./Panda-Sleep.png'
          alt='Panda Sleeping for error'
          width={300}
          height={300}
        />
        <h1 className='text-3xl font-bold'>Oops!</h1>
        <p className='text-md text-slate-800'>
          The page you are looking for does not exist. Please try to be more
          careful.
        </p>

        <p className='text-md text-slate-800'>
          If you think this is a mistake, please contact us.
        </p>
        <p className='text-md text-slate-800 mt-10'>
          Go to{' '}
          <Link to='/notes' className='text-blue-500 underline'>
            BookNotes
          </Link>
        </p>
      </div>
    </div>
  )
}
