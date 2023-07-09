import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Save, Delete } from '@mui/icons-material';

const Contents = () => {
    const data = [
        { id: 1, title: 'Example Title', text: 'Example Text' }
    ];

    return (
        <TableContainer>
            <Table className="table-with-border">
                <TableHead className="table-head">
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Text</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.text}</TableCell>
                            <TableCell>
                                <IconButton color="primary">
                                    <Edit />
                                </IconButton>
                                <IconButton color="primary">
                                    <Save />
                                </IconButton>
                                <IconButton color="secondary">
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Contents;