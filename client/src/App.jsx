import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from './context/AuthContext'
import NotesPage from './pages/NotesPage'
import ProtectedRoute from './ProtectedRoute'
import ProfilePage from './pages/ProfilePage'
import { NotesProvider } from './context/NotesContext'
import ErrorPage from './pages/ErrorPage'

function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <h1> Home </h1>
                  <Link to={'/notes'}>Note</Link>
                </>
              }
            />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/notes/*' element={<NotesPage />} />
              <Route path='/profile' element={<ProfilePage />} />
            </Route>

            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </NotesProvider>
    </AuthProvider>
  )
}

export default App
