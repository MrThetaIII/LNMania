import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NovelCard from '../../components/NovelCard/NovelCard';
import './MainPage.css';

const MainPage = () => {
    const [novels, setNovels] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/novels/top')
            .then(response => setNovels(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="main-page">
            <h1>Top Rated Novels</h1>
            <div className="novel-list">
                {novels.map(novel => (
                    <NovelCard key={novel.id} novel={novel} />
                ))}
            </div>
        </div>
    );
};

export default MainPage;
