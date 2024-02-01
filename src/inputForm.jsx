import React from 'react'
import { useState } from 'react';
function InputForm({ onSubmit }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

  

    const handleClick = () => {

        onSubmit({ name, description });
        console.log({ name, description });
        setName('');
        setDescription('');
    };

    return (
        <div className='p-3 mt-4 mb-4 bg-secondary text-white d-flex justify-content-evenly align-items-center'>
            <div className='col-lg-4 col-md-4 col-sm-12'>
                <input type='text' className='form-control' placeholder='ToDo Name' value={name} onChange={handleNameChange} required />
            </div>
            <div className='col-lg-4 col-md-4 c ol-sm-12'>
                <input type='text' className='form-control' placeholder='ToDo Description' value={description} onChange={handleDescriptionChange} required />
            </div>
            <div className='col-lg-2 col-md-2 col-sm-6'>
                <button type='button' className='btn btn-primary w-100' onClick={handleClick} >Add ToDo</button>
            </div>
        </div>
    )
}

export default InputForm