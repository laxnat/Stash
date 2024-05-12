import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { database } from '../../firebase'
import { useAuth } from "../../contexts/AuthContext"
import { ROOT_FOLDER } from '../../hooks/useFolder'

// Add Folder Component
export default function AddFolderButton({ currentFolder }) {
  // Open/Close Modals and folder name States 
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  // Get currentUser from Authentication Context
  const { currentUser } = useAuth()

  // Opne Modal Function
  function openModal() {
    setOpen(true)
  }

  // Close Modal Function
  function closeModal() {
    setOpen(false)
  }

  // Form Submission Function
  function handleSubmit(e) {
    e.preventDefault()

    // Check if the current folder exists
    if (currentFolder == null) {
      return
    }

    // Create path for the created folder
    const path = [...currentFolder.path]
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id })
    }

    // Create a folder in the database
    database.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.getCurrentTimestamp(),
    })

    // Remove folder name input and close the modal
    setName("")
    closeModal()
  }

  return (
    <>
    {/* Open Modal Button */}
    <Button onClick={openModal} variant="outline-success" size="lg" style={{ borderColor: '#3399ff' }}>
        <FontAwesomeIcon icon={faFolderPlus} style={{ color: '#3399ff' }}/>
    </Button>
    {/* Add Folder Modal */}
    <Modal show={open} onHide={closeModal}>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Folder Name</Form.Label>
            {/* Input for Folder Name */}
            <Form.Control 
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {/* Close Modal Button */}
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          {/* Submit and add folder button */}
          <Button variant="success" type="submit">
            Add Folder
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
    </>
  )
}
