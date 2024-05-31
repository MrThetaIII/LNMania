import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeleteAuthorSection.css';

const DeleteAuthorSection = () => {
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState('');

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

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`http://localhost:5000/api/novels/authors/remove/${selectedAuthor}`, { headers: { 'authorization': token }});
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="section">
            <h2>Delete an Author</h2>
            <div>
                <label>Select Author:</label>
                <select value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)}>
                    <option value="">Select Author</option>
                    {authors.map(author => (
                        <option key={author.id} value={author.id}>{author.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleDelete}>Delete Author</button>
        </div>
    );
};

export default DeleteAuthorSection;
