import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import CenteredContainer from './CenteredContainer'

// UpdateProfile Component
export default function UpdateProfile() {
    // References for Form and Authentication Context
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    
    // Error and Loading State
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    // React Router hook for Navigation
    const navigate = useNavigate()

    // Form Submission Function
    function handleSubmit(e) {
        e.preventDefault()

        // Check if passwords match
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        // Promises array to store the email and password updates
        const promises = []
        setLoading(true)
        setError('')

        // Check if email has to be updated
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        // Check if password has to be updated
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        // Execute promises
        Promise.all(promises)
        .then(() => {
            // If successful, route to Login page
            navigate('/login')
        }).catch(() => {
            // If failure, display message
            setError('Failed to update account')
        }).finally(() => {
            // Set Loading State to false
            setLoading(false)
        })
    }

  return (
    // Render the Centered Container
    <CenteredContainer>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                {/* If error, display error message */}
                {error && <Alert variant="danger">{error}</Alert>}
                {/* Update Form for email and password */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
                    </Form.Group>
                    {/* Submission Button */}
                    <Button disabled={loading} className="w-100 mt-1 mb-1" type="submit">
                        Update
                    </Button>
                    {/* Button to go back to Root Folder*/}
                    <Button as={Link} to="/" className="w-100" variant="secondary">
                        Back
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        {/* Route to user page if user already has an account */}
        <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/user">Cancel</Link>
        </div>
    </CenteredContainer>
  )
}
