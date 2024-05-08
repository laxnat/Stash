import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function File({ file }) {
  const createdDate = new Date(file.createdAt.toDate()).toLocaleDateString('en-US');

  return (
    <div className='d-flex align-items-center flex-column' style={{ width: '200px' }}>
      <div>
      <a href={file.url} target="_blank" className="btn btn-outline-dark text-truncate" style={{ width: '100%' }}>
        <div>
          <FontAwesomeIcon icon={faFile} className="mr-2" style={{ marginRight: '0.5rem' }} />
          {file.name}
        </div>
      </a>
      <span className="ml-auto text-muted">Created: {createdDate}</span>
      </div>
    </div>
  )
}
