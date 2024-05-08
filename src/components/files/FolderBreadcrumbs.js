import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { ROOT_FOLDER } from '../../hooks/useFolder'
import { Link } from 'react-router-dom'

export default function FolderBreadcrumbs({ currentFolder}) {
    // Check if currentFolder and its path property exist
    if (!currentFolder || !currentFolder.path) {
        return null; // Return null or any default component if data is not available
    }

    // Extract the folder path array from the currentFolder object
    const { path } = currentFolder;
  return (
    <Breadcrumb 
        className="flex-grow-1"
        listProps={{ className: "bg-white pl-0 m-0", style: { fontSize: '20px', padding: '10px'} }}
    >
        <Breadcrumb.Item
            linkAs={Link}
            linkProps={{
                to: {
                    pathname: '/',
                    state: {folder: ROOT_FOLDER },
                }
            }}
        >
            Root
        </Breadcrumb.Item>
        {path.map((folder, index) => (
            <Breadcrumb.Item
                key={folder.id}
                linkAs={Link}
                linkProps={{
                    to: {
                        pathname: `/folder/${folder.id}`,
                        state: { folder: { ...folder, path: path.slice(0, index + 1) } },
                    },
                }}
                className="text-truncate d-line-block"
                style={{ maxWidth: "150px" }}
            >
                {folder.name}
            </Breadcrumb.Item>
        ))}
        {currentFolder && (
            <Breadcrumb.Item 
                className="text-truncate d-line-block"
                style={{ maxWidth: "200px" }}
                active
            >
                {currentFolder.name}
            </Breadcrumb.Item>
        )}
    </Breadcrumb>
  )
}
