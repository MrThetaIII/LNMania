import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Library.css';
import NovelCard from '../../components/NovelCard/NovelCard';

const LibraryPage = () => {
    const [favoriteNovels, setFavoriteNovels] = useState([]);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Fetch favorite novels
        axios.get('http://localhost:5000/api/novels/user/favorites', { headers: { 'authorization': token }})
            .then(response => {setFavoriteNovels(response.data);})
            .catch(error => console.log(error));

        // Fetch user collections
        axios.get('http://localhost:5000/api/novels/user/collections', { headers: { 'authorization': token }})
            .then(response => {
                // For each collection, fetch novels individually
                const collectionPromises = response.data.map(collection => {
                    return axios.get(`http://localhost:5000/api/novels/user/collections/${collection.id}`, { headers: { 'authorization': token }})
                        .then(response => {return {id: collection.id, name: collection.name, novels: response.data};})
                        .catch(error => console.log(error));
                });
                // Wait for all promises to resolve
                Promise.all(collectionPromises)
                    .then(collectionsData => {setCollections(collectionsData);})
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="library-page">
            <div className="favorite-novels">
                <h2>Favorite Novels</h2>
                <div className="novel-list">
                    {favoriteNovels.map(novel => (
                        <NovelCard key={novel.id} novel={novel} />
                    ))}
                </div>
            </div>
            <div className="collections">
                <h2>Collections</h2>
                {collections.map(collection => (
                    <div key={collection.id} className="collection">
                        <h3>{collection.name}</h3>
                        <div className="novel-list">
                            {collection.novels.map(novel => (
                                <NovelCard key={novel.id} novel={novel} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LibraryPage;
