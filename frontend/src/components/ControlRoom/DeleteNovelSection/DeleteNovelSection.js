import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeleteNovelSection.css';

const DeleteNovelSection = () => {
    const [novels, setNovels] = useState([]);
    const [selectedNovel, setSelectedNovel] = useState('');

    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/novels/all/alphabetically');
                setNovels(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNovels();
    }, []);

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`http://localhost:5000/api/novels/novels/remove/${selectedNovel}`, { headers: { 'authorization': token }});
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="section">
            <h2>Delete a Novel</h2>
            <div>
                <label>Select Novel:</label>
                <select value={selectedNovel} onChange={(e) => setSelectedNovel(e.target.value)}>
                    <option value="">Select Novel</option>
                    {novels.map(novel => (
                        <option key={novel.id} value={novel.id}>{novel.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleDelete}>Delete Novel</button>
        </div>
    );
};

export default DeleteNovelSection;
