import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditGenreSection.css';

const EditGenreSection = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [formData, setFormData] = useState({
        name: ''
    });

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

    const handleGenreChange = (event) => {
        const genreId = event.target.value;
        setSelectedGenre(genreId);
        const selectedGenreData = genres.find(genre => genre.id === genreId);
        if (selectedGenreData) {
            setFormData({
                name: selectedGenreData.name
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

    const handleEditGenre = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:5000/api/novels/genres/edit/${selectedGenre}`, formData, { headers: { 'authorization': token } });
            console.log('Genre edited successfully');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="section">
            <h2>Edit a Genre</h2>
            <div>
                <label>Select Genre:</label>
                <select value={selectedGenre} onChange={handleGenreChange}>
                    <option value="">Select Genre</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <button onClick={handleEditGenre}>Edit Genre</button>
        </div>
    );
};

export default EditGenreSection;
