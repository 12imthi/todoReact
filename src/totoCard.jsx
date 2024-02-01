import React, { useState } from 'react';

function TotoCard({ id, name, description, onEdit, onDelete, onStatus, status }) {
    const [editMode, setEditMode] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedDescription, setEditedDescription] = useState(description);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        // console.log('Updated ID:', id);
        // console.log('Updated Name:', editedName);
        // console.log('Updated Description:', editedDescription);
        onEdit(id, editedName, editedDescription);
        setEditMode(false);
    };

    const handleDeleteClick = () => {

        onDelete(id)

    }

    const handleStatus = (event) => {
        console.log('New status value:', event.target.value);
        const newStatus = event.target.value
        onStatus(id, newStatus);
    };


    const handleCancelClick = () => {
        setEditMode(false);
        // setEditedName(name);
        // setEditedDescription(description);
    };

    const handleNameChange = (event) => {
        setEditedName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setEditedDescription(event.target.value);
    };



    return (
        <div className='col-lg-3 col-md-4 col-sm-6'>
            <div className="card m-2">
                <div className="card-body">

                    {editMode ? (
                        <>
                            <input type="text" value={editedName} onChange={handleNameChange} />
                            <input type="text" value={editedDescription} onChange={handleDescriptionChange} />
                        </>
                    ) : (
                        <>
                            <h5 className="card-title"> <span className='text-info'>Name:</span> {name} </h5>
                            <p className="card-text"> <span className='text-info'>Description:</span> {description} </p>
                        </>
                    )}

                    <div className='row'>
                        <label className="col-form-label">Status </label>
                        <select value={status} onChange={handleStatus} className="form-select mb-2">
                            <option value="Complete">Complete</option>
                            <option value="Not Complete">Not Complete</option>
                        </select>
                    </div>
                    <div className='d-flex justify-content-end mt-3'>
                        {editMode ? (
                            <>
                                <button className="btn btn-success me-2" onClick={handleSaveClick}>Update</button>
                                <button className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button>
                            </>
                        ) : (
                            <button className="btn btn-primary me-2" onClick={handleEditClick}>Edit</button>
                        )}
                        <button className="btn btn-danger" onClick={handleDeleteClick}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TotoCard;
