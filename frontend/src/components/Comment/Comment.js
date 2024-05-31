import React from 'react';
import './Comment.css';

const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <p className="user">{comment.user_name}</p>
            <p className="text">{comment.content}</p>
        </div>
    );
};

export default Comment;
