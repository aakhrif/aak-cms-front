import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, TextField } from '@mui/material';
import { Edit, Save, Delete, Add } from '@mui/icons-material';
import axios from 'axios';

const Contents = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/contents');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching contents:', error);
        }
    };

    const [editingRowId, setEditingRowId] = useState(null);
    const [newRow, setNewRow] = useState({ title: '', text: '' });

    const handleEditClick = (id) => {
        setEditingRowId(id);
    };

    const handleSaveClick = async (id) => {
        if (editingRowId === id) {
            try {
                if (id === 'new') {
                    await axios.post('/api/contents', newRow);
                } else {
                    const updatedData = data.map((item) => {
                        if (item.id === id) {
                            return { ...item, title: newRow.title, text: newRow.text };
                        }
                        return item;
                    });
                    await axios.put(`/api/contents/${id}`, newRow);
                    setData(updatedData);
                }
                setEditingRowId(null);
                setNewRow({ title: '', text: '' });
                fetchData(); // Refresh the data after saving
            } catch (error) {
                console.error('Error saving content:', error);
            }
        }
    };

    const handleTitleChange = (event) => {
        setNewRow((prevRow) => ({ ...prevRow, title: event.target.value }));
    };

    const handleTextChange = (event) => {
        setNewRow((prevRow) => ({ ...prevRow, text: event.target.value }));
    };

    const handleAddClick = () => {
        setEditingRowId('new');
    };

    return (
        <TableContainer>
            <Table className="table-with-border">
                <TableHead className="table-head">
                    <TableRow>
                      <TableCell>
                          <IconButton color="primary" onClick={handleAddClick}>
                              <Add />
                          </IconButton>
                      </TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Text</TableCell>
                      <TableCell>Actions</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {editingRowId === 'new' && (
                      <TableRow>
                          <TableCell></TableCell>
                          <TableCell>
                              <TextField value={newRow.title} onChange={handleTitleChange} />
                          </TableCell>
                          <TableCell>
                              <TextField value={newRow.text} onChange={handleTextChange} />
                          </TableCell>
                          <TableCell>
                              <IconButton color="primary" onClick={() => handleSaveClick('new')}>
                                  <Save />
                              </IconButton>
                          </TableCell>
                      </TableRow>
                  )}
                  {data.map((item) => (
                      <TableRow key={item.id}>
                  <TableCell></TableCell>
                  <TableCell>
                      {editingRowId === item.id ? (
                          <TextField value={newRow.title} onChange={handleTitleChange} />
                      ) : (
                          item.title
                      )}
                  </TableCell>
                  <TableCell>
                      {editingRowId === item.id ? (
                          <TextField value={newRow.text} onChange={handleTextChange} />
                      ) : (
                          item.text
                      )}
                  </TableCell>
                  <TableCell>
                      {editingRowId === item.id ? (
                          <IconButton color="primary" onClick={() => handleSaveClick(item.id)}>
                              <Save />
                          </IconButton>
                      ) : (
                          <IconButton color="primary" onClick={() => handleEditClick(item.id)}>
                              <Edit />
                          </IconButton>
                      )}
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