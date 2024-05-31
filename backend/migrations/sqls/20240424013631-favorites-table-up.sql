CREATE TABLE favorites
(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    novel_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (novel_id) REFERENCES novels (id)
);

INSERT INTO favorites (user_id, novel_id) VALUES
(1, 1),
(1, 2),
(1, 5),
(1, 7),
(1, 8),
(1, 11),
(1, 12),
(1, 18);
