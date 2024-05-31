import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditNovelSection.css';

const EditNovelSection = () => {
    const [novels, setNovels] = useState([]);
    const [selectedNovel, setSelectedNovel] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        authorId: '',
        abstract: '',
        coverImage: '',
        publicationDate: ''
    });

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

    const handleNovelChange = (event) => {
        const novelId = event.target.value;
        setSelectedNovel(novelId);
        const selectedNovelData = novels.find(novel => novel.id === novelId);
        if (selectedNovelData) {
            setFormData({
                name: selectedNovelData.name,
                authorId: selectedNovelData.author_id,
                abstract: selectedNovelData.abstract,
                coverImage: selectedNovelData.cover_image,
                publicationDate: new Date(selectedNovelData.publication_date).toISOString().split('T')[0]
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

    const handleEditNovel = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:5000/api/novels/novels/edit/${selectedNovel}`, formData, { headers: { 'authorization': token } });
            console.log('Novel edited successfully');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="section">
            <h2>Edit a Novel</h2>
            <div>
                <label>Select Novel:</label>
                <select value={selectedNovel} onChange={handleNovelChange}>
                    <option value="">Select Novel</option>
                    {novels.map(novel => (
                        <option key={novel.id} value={novel.id}>{novel.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div>
                <label>Author ID:</label>
                <input type="text" name="authorId" value={formData.authorId} onChange={handleInputChange} />
            </div>
            <div>
                <label>Abstract:</label>
                <textarea name="abstract" value={formData.abstract} onChange={handleInputChange}></textarea>
            </div>
            <div>
                <label>Cover Image:</label>
                <input type="text" name="coverImage" value={formData.coverImage} onChange={handleInputChange} />
            </div>
            <div>
                <label>Publication Date:</label>
                <input type="date" name="publicationDate" value={formData.publicationDate} onChange={handleInputChange} />
            </div>
            <button onClick={handleEditNovel}>Edit Novel</button>
        </div>
    );
};

export default EditNovelSection;
