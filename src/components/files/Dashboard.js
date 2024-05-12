import React from 'react'
import { Container } from 'react-bootstrap'
import { useFolder } from '../../hooks/useFolder'
import AddFolderButton from './AddFolderButton'
import AddFileButton from './AddFileButton'
import Folder from './Folder'
import File from './File'
import Navbar from "./Navbar"
import { useParams } from 'react-router-dom'
import FolderBreadcrumbs from './FolderBreadcrumbs'

// Dashboard Component
export default function Dashboard() {
  // Get folderId from URL params
  const { folderId } = useParams()
  
  // Get folder, child folders, and child files using hook
  const { folder, childFolders, childFiles } = useFolder(folderId)

  return (
    <>
    {/* Navbar Component */}
        <Navbar />
        {/* Main Container */}
        <Container fluid>
          <div className='d-flex align-items-center'>
            {/* Folder Breadcrumbs */}
            <FolderBreadcrumbs currentFolder={folder} />
            {/* Add File Button */}
            <AddFileButton currentFolder={folder} />
            {/* Add Folder Button */}
            <AddFolderButton currentFolder={folder} />
          </div>

          {/* Folders Section */}
          {/* Render child folders if any */}
          {childFolders.length > 0 && (
            <div>
              <h2>Folders</h2>
              {/* Render child folders */}
              <div className="d-flex flex-wrap">
              {childFolders.map(childFolder => (
                <div 
                  key={childFolder.id} 
                  style={{ maxWidth: '250px' }} 
                  className="p-2"
                >
                  <Folder folder={childFolder} />
                </div>
              ))}
            </div>
            </div>
          )}

          {/* Files Section */}
          {/* Render line if child folders and files exist */}
          {childFolders.length > 0 && childFiles.length > 0 && <hr />}
          {/* Render child folders if any */}
          {childFiles.length > 0 && (
            <div>
              <h2>Files</h2>
              {/* Render child files */}
              <div className="d-flex flex-wrap">
                {childFiles.map(childFile => (
                  <div 
                    key={childFile.id} 
                    style={{ maxWidth: '250px' }} 
                    className="p-2"
                  >
                    <File file={childFile} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
    </>
  )
}
