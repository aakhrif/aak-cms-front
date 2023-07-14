import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const Dynamics = () => {
    const [name, setName] = useState('');
    const [fields, setFields] = useState([]);
    const [fieldInput, setFieldInput] = useState('');

    const handleAddField = () => {
        if (fieldInput.trim() !== '') {
            setFields([...fields, fieldInput]);
            setFieldInput('');
        }
    };

    const handleRemoveField = (index) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        // Perform the POST request to the backend endpoint
        // with the name and fields data
        const data = {
            name,
            fields,
        };

        // Replace with your actual API endpoint URL
        const apiUrl = '/api/dynamics';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message); // Server response message
                // Clear the input fields
                setName('');
                setFields([]);
            })
            .catch((error) => {
                console.error('Error creating dynamic files:', error);
            });
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Dynamics
            </Typography>

            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Fields"
                value={fieldInput}
                onChange={(e) => setFieldInput(e.target.value)}
                fullWidth
                margin="normal"
                helperText="Press Enter to add a field"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleAddField();
                    }
                }}
            />

            <Button variant="outlined" onClick={handleAddField} disabled={fieldInput.trim() === ''}>
                Add Field
            </Button>

            <ul>
                {fields.map((field, index) => (
                    <li key={index}>
                        {field}
                        <Button variant="outlined" onClick={() => handleRemoveField(index)}>
                            Remove
                        </Button>
                    </li>
                ))}
            </ul>

            <Button variant="contained" onClick={handleSubmit} disabled={name.trim() === '' || fields.length === 0}>
                Generate Files
            </Button>
        </div>
    );
};

export default Dynamics;