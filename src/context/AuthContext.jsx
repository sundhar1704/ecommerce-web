import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('groco_current_user')) || null
    } catch {
      return null
    }
  })

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem('groco_users')) || []
    } catch {
      return []
    }
  }

  const signup = ({ name, dob, email, password }) => {
    const users = getUsers()
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase())
    if (exists) {
      return { success: false, message: 'This email already exists.' }
    }
    const newUser = { name, dob, email, password }
    localStorage.setItem('groco_users', JSON.stringify([...users, newUser]))
    return { success: true }
  }

  const login = (email, password) => {
    const users = getUsers()
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!user) {
      return { success: false, message: 'No account found with this email.' }
    }
    if (user.password !== password) {
      return { success: false, message: 'Wrong password.' }
    }
    setCurrentUser(user)
    localStorage.setItem('groco_current_user', JSON.stringify(user))
    return { success: true }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('groco_current_user')
  }

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}