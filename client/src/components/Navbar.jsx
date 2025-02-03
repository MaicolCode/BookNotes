import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import SignOutIcon from '../icons/SignOutIcon'
import PandaProfileIcon from '../icons/PandaProfileIcon'

export default function Navbar() {
  const { isAuthenticated, signOut } = useAuth()

  const navigate = useNavigate()

  const handleLogout = async () => {
    signOut()
    navigate('/')
  }

  return (
    <div className='flex justify-end gap-3 w-full py-2 px-5 bg-slate-50 rounded-lg shadow-[0_0_3px_0_rgba(1,1,1,0.2)]'>
      {isAuthenticated ? (
        <>
          <p className='flex justify-center items-center rounded-full p-1 bg-white shadow-[0_0_3px_0_rgba(1,1,1,0.2)] hover:shadow-[0_0_5px_0_rgba(185,188,197,0.6)] hover:translate-y-[-1px] transition-all duration-300 ease-in-out'>
            <PandaProfileIcon />
          </p>
          <Link
            onClick={handleLogout}
            aria-description='Logout'
            className='flex justify-center items-center rounded-full p-1 bg-white shadow-[0_0_3px_0_rgba(1,1,1,0.2)] hover:shadow-[0_0_5px_0_rgba(185,188,197,0.6)] hover:translate-y-[-1px] transition-all duration-300 ease-in-out'
          >
            <SignOutIcon />
          </Link>
        </>
      ) : (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </>
      )}
    </div>
  )
}
