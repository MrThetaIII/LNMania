import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AssignNovelToGenreSection.css';

const AssignNovelToGenreSection = () => {
    const [novels, setNovels] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedNovel, setSelectedNovel] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/novels/all/alphabetically');
                setNovels(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchGenres = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/novels/genres');
                setGenres(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNovels();
        fetchGenres();
    }, []);

    const handleAssign = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`http://localhost:5000/api/novels/genres/${selectedGenre}/add/${selectedNovel}`, {}, { headers: { 'authorization': token } });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="section">
            <h2>Assign Novel to Genre</h2>
            <div>
                <label>Select Novel:</label>
                <select value={selectedNovel} onChange={(e) => setSelectedNovel(e.target.value)}>
                    <option value="">Select Novel</option>
                    {novels.map(novel => (
                        <option key={novel.id} value={novel.id}>{novel.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Select Genre:</label>
                <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                    <option value="">Select Genre</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleAssign}>Assign Novel</button>
        </div>
    );
};

export default AssignNovelToGenreSection;
