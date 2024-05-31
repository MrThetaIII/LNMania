CREATE TABLE comments
(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    novel_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (novel_id) REFERENCES novels (id)
);

INSERT INTO comments (user_id, novel_id, content) VALUES
(1, 1, 'I love this book!'),
(1, 2, 'I love this book!'),
(1, 3, 'I love this book!'),
(1, 4, 'I love this book!'),
(1, 5, 'I love this book!'),
(1, 6, 'I love this book!'),
(1, 7, 'I love this book!'),
(1, 8, 'I love this book!'),
(1, 9, 'I love this book!'),
(1, 10, 'I love this book!'),
(1, 11, 'I love this book!'),
(1, 12, 'I love this book!'),
(1, 13, 'I love this book!'),
(1, 14, 'I love this book!'),
(1, 15, 'I love this book!'),
(1, 16, 'I love this book!'),
(1, 17, 'I love this book!'),
(1, 18, 'I love this book!');
