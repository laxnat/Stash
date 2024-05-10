import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function File({ file }) {
  if (!file || !file.createdAt) {
    return null; // Return null if file or createdAt is null or undefined
  }

  const createdDate = new Date(file.createdAt.toDate()).toLocaleDateString('en-US');

  return (
    <div className='d-flex align-items-left flex-column' style={{ width: '100%' }}>
      <div>
        <a href={file.url} target="_blank" className="btn btn-outline-dark text-truncate w-100" >
          <div className='text-truncate'>
            <FontAwesomeIcon icon={faFile} className="mr-2" style={{ marginRight: '0.5rem' }} />
            {file.name}
          </div>
        </a>
        <div className="text-center">
          <span className="text-muted">Created: {createdDate}</span>
        </div>
      </div>
    </div>
  )
}
