import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, TextField } from '@mui/material';
import { Edit, Save, Delete, Add } from '@mui/icons-material';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Contents = () => {
    const [data, setData] = useState([]);
    const [editingRowId, setEditingRowId] = useState(null);
    const [newRow, setNewRow] = useState({ _id: '', title: '', text: '' });
    const [titleError, setTitleError] = useState(false);
    const [textError, setTextError] = useState(false);

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

    const handleEditClick = (id, title, text) => {
        setEditingRowId(id);
      setNewRow({ _id: id, title, text });
      setTitleError(false);
      setTextError(false);
  };

    const handleSaveClick = async (id) => {
        if (editingRowId === id) {
        if (!validateFields()) {
            return;
        }

        try {
            if (id === 'new') {
                await axios.post('/api/contents', newRow);
            } else {
                const updatedData = data.map((item) => {
              if (item._id === id) {
                  return { ...item, title: newRow.title, text: newRow.text };
              }
              return item;
          });
              await axios.put(`/api/contents/${id}`, newRow);
              setData(updatedData);
          }
          setEditingRowId(null);
              setNewRow({ _id: '', title: '', text: '' });
              fetchData(); // Refresh the data after saving
          } catch (error) {
              console.error('Error saving content:', error);
          }
      }
  };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`/api/contents/${id}`);
            const updatedData = data.filter((item) => item._id !== id);
            setData(updatedData);
        } catch (error) {
            console.error('Error deleting content:', error);
        }
    };

    const handleTitleChange = (event) => {
        setNewRow((prevRow) => ({ ...prevRow, title: event.target.value }));
      setTitleError(false);
  };

    const handleTextChange = (value) => {
        setNewRow((prevRow) => ({ ...prevRow, text: value }));
        setTextError(false);
    };

    const handleAddClick = () => {
        setEditingRowId('new');
        setNewRow({ _id: '', title: '', text: '' });
        setTitleError(false);
        setTextError(false);
    };

    const validateFields = () => {
        let valid = true;

        if (newRow.title.trim() === '') {
            setTitleError(true);
            valid = false;
        }

        if (newRow.text.trim() === '') {
            setTextError(true);
            valid = false;
        }

        if (newRow.title.length > 250) {
            setTitleError(true);
            valid = false;
        }

        if (newRow.text.length > 3000) {
            setTextError(true);
            valid = false;
        }

        return valid;
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
                              <TextField
                                  value={newRow.title}
                                  onChange={handleTitleChange}
                                  error={titleError}
                                  helperText={titleError && 'Title is required and should be maximum 250 characters'}
                              />
                          </TableCell>
                          <TableCell>
                              <ReactQuill
                                  value={newRow.text || ''}
                                  onChange={handleTextChange}
                                  theme="snow"
                                  modules={{
                                      toolbar: false
                                  }}
                                  style={{ minHeight: '100px' }}
                                  className={textError ? 'react-quill-error' : ''}
                              />
                              {textError && <p className="error-message">Text is required and should be maximum 3000 characters</p>}
                          </TableCell>
                          <TableCell>
                              <IconButton color="primary" onClick={() => handleSaveClick('new')}>
                                  <Save />
                              </IconButton>
                          </TableCell>
                      </TableRow>
                  )}
                  {data.map((item) => (
              <TableRow key={item._id}>
                  <TableCell></TableCell>
                  <TableCell>
                      {editingRowId === item._id ? (
                          <TextField
                              value={newRow.title}
                              onChange={handleTitleChange}
                              error={titleError}
                              helperText={titleError && 'Title is required and should be maximum 250 characters'}
                          />
                      ) : (
                          item.title
                      )}
                  </TableCell>
                  <TableCell>
                      {editingRowId === item._id ? (
                          <ReactQuill
                              value={newRow.text || ''}
                              onChange={handleTextChange}
                              theme="snow"
                              modules={{
                                  toolbar: false
                              }}
                              style={{ minHeight: '100px' }}
                              className={textError ? 'react-quill-error' : ''}
                          />
                      ) : (
                          item.text
                      )}
                      {textError && <p className="error-message">Text is required and should be maximum 3000 characters</p>}
                  </TableCell>
                  <TableCell>
                      {editingRowId === item._id ? (
                          <IconButton color="primary" onClick={() => handleSaveClick(item._id)}>
                              <Save />
                          </IconButton>
                      ) : (
                          <IconButton
                              color="primary"
                              onClick={() => handleEditClick(item._id, item.title, item.text)}
                          >
                              <Edit />
                          </IconButton>
                      )}
                      <IconButton color="secondary" onClick={() => handleDeleteClick(item._id)}>
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