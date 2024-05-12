import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import CenteredContainer from './CenteredContainer'

// User Login Component
export default function Login() {
    // References for Form and Authentication Context
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()

    // Error and Loading States
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    // React Router Hook for Navigation
    const navigate = useNavigate()

    // Form Submissions
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            // If successful, navigate to the home page
            navigate('/')
        } catch {
            // If not, display failure message
            setError('Failed to sign in')
        }

        // Reset Loading State
        setLoading(false)

        // Call Login
        login(emailRef.current.value, passwordRef.current.value)
    }

  return (
    // Render the Centered Container
    <CenteredContainer>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                {/* If error, display error message */}
                {error && <Alert variant="danger">{error}</Alert>}
                {/* Form for email and password submission */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disasbled={loading} className="w-100" type="submit">
                        Log In
                    </Button>
                </Form>
                {/* Routing to Forgot Password Page */}
                <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </Card.Body>
        </Card>
        {/* Routing to Sign Up page */}
        <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
        </div>
    </CenteredContainer>
  )
}
