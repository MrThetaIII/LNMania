import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';
import NovelCard from '../../components/NovelCard/NovelCard';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [genreId, setGenreId] = useState('');
    const [novels, setNovels] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        // Fetch authors
        axios.get('http://localhost:5000/api/novels/authors')
            .then(response => setAuthors(response.data))
            .catch(error => console.log(error));

        // Fetch genres
        axios.get('http://localhost:5000/api/novels/genres')
            .then(response => setGenres(response.data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (searchQuery !== '') {
            axios.get(`http://localhost:5000/api/novels/search/${searchQuery}`)
                .then(response => setNovels(response.data))
                .catch(error => console.log(error));
        } else if (authorId !== '') {
            axios.get(`http://localhost:5000/api/novels/by-author/${authorId}`)
                .then(response => setNovels(response.data))
                .catch(error => console.log(error));
        } else if (genreId !== '') {
            axios.get(`http://localhost:5000/api/novels/by-genre/${genreId}`)
                .then(response => setNovels(response.data))
                .catch(error => console.log(error));
        } else {
            // Clear novels if no search criteria selected
            setNovels([]);
        }
    }, [searchQuery, authorId, genreId]);

    return (
        <div className="search-page">
            <div className="search-filters">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
                    <option value="">Search by author</option>
                    {authors.map(author => (
                        <option value={author.id} key={author.id}>{author.name}</option>
                    ))}
                </select>
                <select value={genreId} onChange={(e) => setGenreId(e.target.value)}>
                    <option value="">Search by genre</option>
                    {genres.map(genre => (
                        <option value={genre.id} key={genre.id}>{genre.name}</option>
                    ))}
                </select>
            </div>
            <div className="novel-list">
                {novels.map(novel => (
                    <NovelCard key={novel.id} novel={novel} />
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
