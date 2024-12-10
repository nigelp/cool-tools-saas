import React, { createContext, useContext, useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBJ2SCqlg2cTWDSiUnTKJ3EcG3643ydi9k",
  authDomain: "cool-tools-3b4c9.firebaseapp.com",
  projectId: "cool-tools-3b4c9",
  storageBucket: "cool-tools-3b4c9.firebasestorage.app",
  messagingSenderId: "532601495033",
  appId: "1:532601495033:web:c6886d6aa4542cb48b3128"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function updateProfile(profile) {
    return firebaseUpdateProfile(auth.currentUser, profile)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
