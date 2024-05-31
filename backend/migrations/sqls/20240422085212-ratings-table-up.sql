CREATE TABLE ratings
(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    novel_id INT NOT NULL,
    rating INT NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (novel_id) REFERENCES novels (id)
);

INSERT INTO ratings (user_id, novel_id, rating) VALUES
(1, 1, 4),
(1, 2, 4),
(1, 3, 4),
(1, 4, 3),
(1, 5, 4),
(1, 6, 2),
(1, 7, 4),
(1, 8, 5),
(1, 9, 3),
(1, 10, 3),
(1, 11, 5),
(1, 12, 5),
(1, 13, 3),
(1, 14, 3),
(1, 15, 5),
(1, 16, 4),
(1, 17, 2),
(1, 18, 5);