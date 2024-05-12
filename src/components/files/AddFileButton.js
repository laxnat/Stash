import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState} from 'react'
import ReactDOM from 'react-dom'
import { useAuth } from '../../contexts/AuthContext'
import { storage, database } from '../../firebase'
import { ROOT_FOLDER } from '../../hooks/useFolder'
import { v4 as uuidV4 } from 'uuid'
import { ProgressBar, Toast } from 'react-bootstrap'

// Add Files Component
export default function AddFileButton({ currentFolder }) {
    // Uploading State
    const [ uploadingFiles, setUploadingFiles ] = useState([]);
    // Get currentUser from Authentication Context
    const { currentUser } = useAuth()

    // File Upload Function
    function handleUpload(e) {
        const file = e.target.files[0]
        if (currentFolder == null || file == null) {
            return
        }

        // Generate unique file id
        const id = uuidV4()
        setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles,
            { id: id, name: file.name, progress: 0, error: false}
        ])

        // Define the file path based on current folder
        const filePath = 
            currentFolder === ROOT_FOLDER 
            ? `${currentFolder.path.join('/')}/${file.name}`
            : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`

        // Upload file to Firebase Storage
        const uploadTask = storage
            .ref(`/files/${currentUser.uid}/${filePath}`)
            .put(file)

        // Listen for upload progress, possible errors, and upload completion
        uploadTask.on(
            "state_changed", 
            snapshot => {
                const progress = snapshot.bytesTransferred / snapshot.totalBytes
                console.log('progess:', progress)
                // Update progress of the uploading file
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadFile => {
                        if (uploadFile.id === id) {
                            return { ...uploadFile, progress: progress}
                        }

                        return uploadFile
                    })
                })
            }, 
            () => {
                // Upload Error Handling
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadFile => {
                        if (uploadFile.id === id) {
                            return { ...uploadFile, error: true }
                        } 
                        return uploadFile
                    })
                })
            }, 
            () => {
                // Upload Completion Handling
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.filter(uploadFile => {
                        return uploadFile.id !== id
                    })
                })

                // Retrieve download URL of the uploaded file and store it in the database
                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    database.files
                        .where("name", '==', file.name)
                        .where("userId", "==", currentUser.uid)
                        .where("folderId", "==", currentFolder.id)
                        .get()
                        .then(existingFiles => {
                            const existingFile = existingFiles.docs[0]
                            if (existingFile) {
                                existingFile.ref.update( { url: url})
                            } else {
                                database.files.add({
                                    url: url,
                                    name: file.name,
                                    createdAt: database.getCurrentTimestamp(),
                                    folderId: currentFolder.id,
                                    userId: currentUser.uid,
                                })
                            }
                        })
                })
            }
        )
    }
  return (
    <>
    {/* File Upload Button */}
    <label className="btn btn-outline-success btn-lg m-2" style={{ borderColor: '#3399ff' }}>
        <FontAwesomeIcon icon={faFileUpload} style={{ color: '#3399ff' }}/>
        <input 
            type="file" 
            onChange={handleUpload} 
            style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />
    </label>
    {/* Toasts to display the upload progress */}
    {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
            <div
            style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                maxWidth: '250px'
            }}>
                {uploadingFiles.map(file => (
                    <Toast key={file.id} onClose={() => {
                        // If toast is closed, remove file from the upload list
                        setUploadingFiles(prevUploadingFiles => {
                            return prevUploadingFiles.filter(uploadFile => {
                                return uploadFile.id !== file.id
                            })
                        })
                    }}>
                        <Toast.Header 
                            closeButton={true}
                            className="text-truncate w-100 d-block"
                        >
                            {file.name}
                        </Toast.Header>
                        <Toast.Body>
                            {/* Styling for Progress Bar */}
                            <ProgressBar 
                                animated={!file.error}
                                variant={file.error ? 'danger' : "primary"}
                                now={file.error ? 100 : file.progress * 100 }
                                label={
                                    file.error 
                                        ? "Error" 
                                        : `${Math.round(file.progress * 100)}%`
                                }
                            />
                        </Toast.Body>
                    </Toast>
                ))}
            </div>,
            document.body
        )}
    </>
  )
}
