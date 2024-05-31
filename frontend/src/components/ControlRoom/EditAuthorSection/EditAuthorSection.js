import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditAuthorSection.css';

const EditAuthorSection = () => {
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [formData, setFormData] = useState({
        name: ''
    });

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/novels/authors');
                setAuthors(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAuthors();
    }, []);

    const handleAuthorChange = (event) => {
        const authorId = event.target.value;
        setSelectedAuthor(authorId);
        const selectedAuthorData = authors.find(author => author.id === authorId);
        if (selectedAuthorData) {
            setFormData({
                name: selectedAuthorData.name
            });
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditAuthor = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:5000/api/novels/authors/edit/${selectedAuthor}`, formData, { headers: { 'authorization': token }});
            console.log('Author edited successfully');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="section">
            <h2>Edit an Author</h2>
            <div>
                <label>Select Author:</label>
                <select value={selectedAuthor} onChange={handleAuthorChange}>
                    <option value="">Select Author</option>
                    {authors.map(author => (
                        <option key={author.id} value={author.id}>{author.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <button onClick={handleEditAuthor}>Edit Author</button>
        </div>
    );
};

export default EditAuthorSection;
