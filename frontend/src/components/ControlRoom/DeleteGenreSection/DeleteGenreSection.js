import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeleteGenreSection.css';

const DeleteGenreSection = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/novels/genres');
                setGenres(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGenres();
    }, []);

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`http://localhost:5000/api/novels/genres/remove/${selectedGenre}`, { headers: { 'authorization': token } });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="section">
            <h2>Delete a Genre</h2>
            <div>
                <label>Select Genre:</label>
                <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                    <option value="">Select Genre</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleDelete}>Delete Genre</button>
        </div>
    );
};

export default DeleteGenreSection;
