import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

// Private Route Component
export default function PrivateRoute({ component: Component, ...rest }) {
  // Get currentUser from the Authentication Context  
  const { currentUser } = useAuth()

  // Render Outlet if the currentUser exists, if not then navigate to the login page
  return currentUser ? <Outlet /> : <Navigate to='login' />
}
