import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import CenteredContainer from './CenteredContainer'

// Signup Component
export default function Signup() {
    // References for Form and Authentication Context
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()

    // Error and Loading States
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    // React Router hook for Navigation
    const navigate = useNavigate()

    // Form Submission
    async function handleSubmit(e) {
        e.preventDefault()

        // Check if passwords match
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            // Call signup function from Authentication Context
            await signup(emailRef.current.value, passwordRef.current.value)
            // Route to home page if successful
            navigate('/')
        } catch {
            // Failure message if failed
            setError('Failed to create an account')
        }

        // Set loading to false
        setLoading(false)

        // Call Signup
        signup(emailRef.current.value, passwordRef.current.value)
    }

  return (
    // Render the Centered Container
    <CenteredContainer>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {/* If error, display error message */}
                {error && <Alert variant="danger">{error}</Alert>}
                {/* Submission Form for email, password, and password confirmation */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button disasbled={loading} className="w-100" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        {/* Route to Login page */}
        <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
        </div>
    </CenteredContainer>
  )
}
