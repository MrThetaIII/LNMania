import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './NovelPage.css';
import Comment from '../../components/Comment/Comment';

import UserContext from '../../Contexts/UserContext';

const NovelPage = () => {
    const [novel, setNovel] = useState(null);
    const [genres, setGenres] = useState([]);
    const [author, setAuthor] = useState(null);
    const [userRating, setUserRating] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [isRead, setIsRead] = useState(false);
    const [isInCollection, setIsInCollection] = useState(false);

    const { user, setUser } = useContext(UserContext);

    const novelId = useParams().id;

    const getComments = useCallback(() => {
        axios.get(`http://localhost:5000/api/reviews/novel/${novelId}/comments`)
            .then(response => setComments(response.data))
            .catch(error => console.log(error));
    }, [novelId]);

    const getIfNovelIsInCollection = useCallback(() => {
        const token = localStorage.getItem('token');
        const collectionsButton = document.getElementById('collectionsButton');
        const collectionMenu = document.getElementById('collectionMenu');
        if (collectionMenu.value === '') {
            collectionsButton.classList.add('invisible');
            return;
        }
        axios.get(`http://localhost:5000/api/novels/${collectionMenu.value}/user/collections/${novelId}`, { headers: { 'authorization': token } })
            .then(response => {setIsInCollection(response.data.isInCollection); collectionsButton.innerText = response.data.isInCollection ? "Remove from Collection" : "Add to Collection";})
            .then(() => {collectionsButton.classList.remove('invisible');})
            .catch(error => console.log(error));
    }, [novelId]);


    useEffect(() => {
        const token = localStorage.getItem('token');
    
        axios.get('http://localhost:5000/api/users/info', { headers: { 'authorization': token } })
            .then(response => setUser(response.data))
            .catch(error => console.log(error));
    
        axios.get(`http://localhost:5000/api/novels/${novelId}`)
            .then(response => {
                setNovel(response.data);
                axios.get(`http://localhost:5000/api/novels/user/favorites/check/${response.data.name}`, { headers: { 'authorization': token } })
                    .then(response => setIsFavorite(response.data))
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    
        axios.get(`http://localhost:5000/api/novels/${novelId}/genres`)
            .then(response => setGenres(response.data))
            .catch(error => console.log(error));
    
        axios.get(`http://localhost:5000/api/novels/${novelId}/author`)
            .then(response => setAuthor(response.data))
            .catch(error => console.log(error));
    
        axios.get(`http://localhost:5000/api/reviews/novel/${novelId}/user/rating`, { headers: { 'authorization': token } })
            .then(response => setUserRating(response.data))
            .catch(error => console.log(error));
    
        axios.get(`http://localhost:5000/api/novels/user/novels/${novelId}/is-read`, { headers: { 'authorization': token } })
            .then(response => setIsRead(response.data))
            .catch(error => console.log(error));
    
        axios.get(`http://localhost:5000/api/novels/user/collections`, { headers: { 'authorization': token } })
            .then(response => setCollections(response.data))
            .catch(error => console.log(error));
    
        getComments();
    }, [getComments, novelId, setUser]);



    const handleComment = (comment) => {
        const token = localStorage.getItem('token');
        axios.post(`http://localhost:5000/api/reviews/novel/${novelId}/comment`, { comment }, {headers: { 'authorization': token }})
            .then(getComments)
            .catch(error => console.log(error));
    };

    const handleRating = (rating) => {
        const token = localStorage.getItem('token');
        axios.post(`http://localhost:5000/api/reviews/novel/${novelId}/rate`, { rating }, {headers: { 'authorization': token }})
            .then(response => {setUserRating(response.data); window.location.reload();})
            .catch(error => console.log(error));
    };

    const handleFavorite = () => {
        const token = localStorage.getItem('token');
        if (isFavorite) {
            axios.delete(`http://localhost:5000/api/novels/user/favorites/${novelId}`, {headers: { 'authorization': token }})
                .then(response => setIsFavorite(false))
                .catch(error => console.log(error));
        } else {
            axios.post(`http://localhost:5000/api/novels/user/favorites/add/${novelId}`, null, {headers: { 'authorization': token }})
                .then(response => setIsFavorite(true))
                .catch(error => console.log(error));
        }
    };

    const handleAddToCollection = () => {
        const token = localStorage.getItem('token');
        if (isInCollection) {
            axios.delete(`http://localhost:5000/api/novels/user/collections/${selectedCollection}/remove/${novelId}`, {headers: { 'authorization': token }})
                .then(() => getIfNovelIsInCollection())
                .catch(error => console.log(error));
        } else {
            axios.post(`http://localhost:5000/api/novels/user/collections/${selectedCollection}/add/${novelId}`, null, {headers: { 'authorization': token }})
                .then(() => getIfNovelIsInCollection())
                .catch(error => console.log(error));
        }
    };

    const handleMarkAsRead = () => {
        const token = localStorage.getItem('token');
        if (!isRead) {
            axios.put(`http://localhost:5000/api/novels/user/novels/${novelId}/mark-read`, null, {headers: { 'authorization': token }})
                .then(response => setIsRead(true))
                .catch(error => console.log(error));
        }
    };

    const handleAddCollection = () => {
        const token = localStorage.getItem('token');
        const collectionName = document.getElementById('collectionName').value;
        axios.post(`http://localhost:5000/api/novels/user/collections/add`, { name: collectionName }, {headers: { 'authorization': token }})
            .then(response => setCollections([...collections, response.data]))
            .catch(error => console.log(error));
    }

    return (
        <div className="novel-page">
            {novel && (
                <div className="novel-info">
                    <img src={`/Novels/${novel.cover_image}`} alt={novel.name} className="novel-cover" />
                    <div className="novel-details">
                        <h1>{novel.name}</h1>
                        <p>{novel.abstract}</p>
                        <div className="genres">
                            {genres.map(genre => (
                                <span key={genre.id} className="genre">{genre.name}</span>
                            ))}
                        </div>
                        <p><strong>Author:</strong> {author && author.name}</p>
                        <p><strong>Publication Date:</strong> {new Date(novel.publication_date).toLocaleDateString()}</p>
                        <p><strong>Rating:</strong> {String(novel.average_rating).substring(0,3)}</p>
                        {user && (
                            <div>
                                {userRating ? (
                                    <p><strong>Your Rating:</strong> {userRating.rating}</p>
                                ) : (
                                    <div>
                                        <p>Rate this novel:</p>
                                        <div className="rating-options">
                                            {[1, 2, 3, 4, 5].map(rating => (
                                                <button key={rating} onClick={() => handleRating(rating)}>{rating}</button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="controls">
                                    <button onClick={handleFavorite}>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</button>
                                    <select id='collectionMenu' onChange={(e) => {setSelectedCollection(e.target.value); getIfNovelIsInCollection();}}>
                                        <option value="">Select Collection</option>
                                        {collections.map(collection => (
                                            <option key={collection.id} value={collection.id}>{collection.name}</option>
                                        ))}
                                    </select>
                                    <button onClick={handleAddToCollection} id='collectionsButton' className='invisible'></button>
                                    <button onClick={handleMarkAsRead}>{isRead ? "You read that" : "Mark as Read"}</button>
                                </div>
                                <div className="controls">
                                    <input type="text" id="collectionName" placeholder="Collection Name" />
                                    <button onClick={handleAddCollection}>Add Collection</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="comments-section">
                <h2>Comments</h2>
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
                {user && (
                    <div className="add-comment">
                        <textarea placeholder="Add your comment..." onChange={(e) => setCommentText(e.target.value)}></textarea>
                        <button onClick={() => handleComment(commentText)}>Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NovelPage;