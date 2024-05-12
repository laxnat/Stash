import React, { useState } from 'react'
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import CenteredContainer from './CenteredContainer'

// Profile Component
export default function Profile() {
  // Error State
  const [error, setError] = useState("")
  // Get currentUser and logout function from the Authentication Context
  const { currentUser, logout } = useAuth()
  // React Router hook for Navigation
  const navigate = useNavigate()

  // Handle Logout Function
  async function handleLogout() {
    setError('')

    try {
      // Call logout from Authentication Context
      await logout()
      // Route to login page if successful
      navigate('/login')
    } catch {
      // If failure, then display message
      setError('Failed to log out')
    }
  }

  return (
    // Render the Centered Container
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {/* If error, display error message */}
          {error && <Alert variant="danger">{error}</Alert>}
          {/* Display the current user's email */}
          <strong>Email: </strong> {currentUser.email}
          {/* Route to update profile page */}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      {/* Logout Button */}
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
      </div>
    </CenteredContainer>
  )
}
