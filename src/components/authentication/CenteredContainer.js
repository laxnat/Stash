import React from 'react'
import { Container } from 'react-bootstrap'

// Centered Container Component for Stylization
export default function CenteredContainer({ children }) {
  return (
    // React Bootstrap Container Layout and Classes
    <Container 
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh "}}
    >
      <div className="w-100" style={{ maxWidth: "400px"}}>
        {/* Children components */}
      {children}
      </div>
    </Container>
  )
}
