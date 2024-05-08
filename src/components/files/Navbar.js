import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../../images/stashimg.png'
export default function NavbarComponent() {
  return (
    <Navbar expand="sm" className="justify-content-between">
        <Navbar.Brand as={Link} to="/" style={{ marginLeft: '0.5rem', fontFamily: 'Arial', fontSize: '50px' }} >
          <img
            src={logo}
            width="auto"
            height="100px"
            className="d-inline-block align-top"
            alt="Stashed Logo"
          />
        </Navbar.Brand>
        <Nav className="ml-auto">
            <Nav.Link as={Link} to="/user" style={{ fontSize: '24px' }} >
                Profile
            </Nav.Link>
        </Nav>
    </Navbar>
  )
}
