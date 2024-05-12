import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from "react-router-dom"
import CenteredContainer from './CenteredContainer'

// Forgot Password Component
export default function ForgotPassword() {
    // References for Form and Authentication Context
    const emailRef = useRef()
    const { resetPassword } = useAuth()

    // Error, Message, and Loading States
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    // Form Submission
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            // Reset message and set loading state to true
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            // If sucessful, this message is displayed
            setMessage('Check your inbox for further instructions')
        } catch {
            // If failed, this message is displayed
            setError('Failed to reset password')
        }

        // Reset loading state
        setLoading(false)

    }

  return (
    // Render the centered container
    <CenteredContainer>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Password Reset</h2>
                {/* Display error message if there is an error */}
                {error && <Alert variant="danger">{error}</Alert>}
                {/* Display success message if successful */}
                {message && <Alert variant="success">{message}</Alert>}
                {/* Form to submit email and password reset */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Button disasbled={loading} className="w-100" type="submit">
                        Reset Password
                    </Button>
                </Form>
                {/* Route to Login page */}
                <div className="w-100 text-center mt-3">
                    <Link to="/login">Login</Link>
                </div>
            </Card.Body>
        </Card>
        {/* Route to Sign Up Page */}
        <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
        </div>
    </CenteredContainer>
  )
}
