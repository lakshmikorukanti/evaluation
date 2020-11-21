import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
const Edit = ({ handleAdd, data, handleProfile }) => {
    const [ name, setName ] = useState('');
    const [ quantity, setQuantity ] = useState('');
    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value);
        } else {
            setQuantity(e.target.value);
        }
    };
    return (
        <div>
            <TextField
                id="outlined-password-input"
                label="name"
                name="name"
                value={name}
                type="text"
                autoComplete="current-password"
                variant="outlined"
                onChange={handleChange}
            />
            <TextField
                id="outlined-password-input"
                label="quantity"
                name="quantity"
                value={quantity}
                type="text"
                autoComplete="current-password"
                variant="outlined"
                onChange={handleChange}
            />
            <button onClick={() => handleAdd(name, quantity)}>Add</button>
        </div>
    );
};

export default Edit;
