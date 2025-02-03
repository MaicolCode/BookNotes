const API_URL = 'http://localhost:3000'

export const registerFetch = async (user) => {
  const res = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    credentials: 'include',
    body: JSON.stringify(user)
  })

  return res
}

export const loginFetch = async (user) => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    credentials: 'include',
    body: JSON.stringify(user)
  })

  return res
}

export const validateToken = async (token) => {
  const res = await fetch(`${API_URL}/api/auth/validate-token`, {
    credentials: 'include'
  })

  return res
}

export const logoutFetch = async () => {
  const res = await fetch(`${API_URL}/api/logout`, {
    method: 'POST',
    credentials: 'include'
  })

  return res
}
