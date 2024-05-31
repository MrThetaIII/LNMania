import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import './AddNovelSection.css';

const AddNovelSection = () => {
    const [name, setName] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [abstract, setAbstract] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/novels/authors')
            .then(response => setAuthors(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            const coverImagePreview = document.getElementById('cover-image-preview');
            coverImagePreview.innerHTML = '';
            const img = document.createElement('img');
            img.src = reader.result;   
            coverImagePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
        
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:5000/api/novels/novels/add', {name, authorId, abstract, publicationDate, coverImage}, { headers: { 'authorization': token } });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="section">
            <h2>Add a Novel</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => {setName(e.target.value); setCoverImage(`${e.target.value}/${e.target.value}.png`)}} required />
                </div>
                <div>
                    <label>Author:</label>
                    <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} required>
                        <option value="">Select Author</option>
                        {authors.map(author => (<option key={author.id} value={author.id}>{author.name}</option>))}
                    </select>
                </div>
                <div>
                    <label>Abstract:</label>
                    <textarea value={abstract} onChange={(e) => setAbstract(e.target.value)} required></textarea>
                </div>
                <div>
                    <label>Publication Date:</label>
                    <input type="date" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} required />
                </div>
                <div>
                    <label>Cover Image:</label>
                    <Dropzone onDrop={handleDrop} multiple={false}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className="dropzone">
                                <input {...getInputProps()} />
                                <p>Drag and drop or click to select an image</p>
                            </div>
                        )}
                    </Dropzone>
                </div>
                <div id="cover-image-preview" />
                <button type="submit">Add Novel</button>
            </form>
        </div>
    );
};

export default AddNovelSection;
