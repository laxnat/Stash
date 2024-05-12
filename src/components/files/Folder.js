import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

// Folder Component
export default function Folder({ folder }) {
  return (
    <Button 
    // Link to folder's path
        to={{
            pathname: `/folder/${folder.id}`,
            state: { folder: folder },
        }}
        variant="outline-dark" 
        className="text-truncate w-100" 
        as={Link}
        style={{ padding: '0.5rem' }}
    >
      {/* Folder Icon and Name */}
      <FontAwesomeIcon icon={faFolder} className="mr-2" style={{ marginRight: '0.5rem' }} />
      { folder.name }
    </Button>
  )
}
