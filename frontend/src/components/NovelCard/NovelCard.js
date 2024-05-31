import React from 'react';
import { Link } from 'react-router-dom';
import './NovelCard.css';

const NovelCard = ({ novel }) => {
    return (
        <div className="novel-card">
            <Link to={`/novel/${novel.id}`}>
                <img src={`./Novels/${novel.cover_image}`} alt={novel.name} />
                <h2>{String(novel.name).length>50 ? `${String(novel.name).slice(0, 50)} ...` : novel.name}</h2>
                <p>Rating: {String(novel.average_rating).slice(0,3)}</p>
            </Link>
        </div>
    );
};

export default NovelCard;
