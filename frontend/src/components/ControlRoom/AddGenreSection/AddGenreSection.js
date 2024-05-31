import React, { useState } from 'react';
import axios from 'axios';
import'./AddGenreSection.css';

const AddGenreSection = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:5000/api/novels/genres/add', { name }, { headers: { 'authorization': token } });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="section">
            <h2>Add a Genre</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <button type="submit">Add Genre</button>
            </form>
        </div>
    );
};

export default AddGenreSection;
