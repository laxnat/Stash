import React, { useContext, useState, useEffect } from 'react'
import "firebase/auth"
import { auth } from '../firebase'

//context for authentication
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

//Authentication provider component that has
//sign up, login logout, reset password and update email, and password functionalities
export function AuthProvider({ children }) {
    //State holding current user and loading status
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut(null)
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    // The hook for handling authentication state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])
    //current user information from authentication context
    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
    // provides the authentication context
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}