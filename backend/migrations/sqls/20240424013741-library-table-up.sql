CREATE TABLE library
(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    novel_id INT NOT NULL,
    collection_id INT NOT NULL,
    have_been_read BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (novel_id) REFERENCES novels (id),
    FOREIGN KEY (collection_id) REFERENCES collections (id)
);

INSERT INTO library (user_id, novel_id, collection_id, have_been_read) VALUES
(1, 1, 1, TRUE),
(1, 2, 1, TRUE),
(1, 5, 1, TRUE),
(1, 7, 1, TRUE),
(1, 8, 1, TRUE),
(1, 11, 1, TRUE),
(1, 12, 1, TRUE),
(1, 14, 1, TRUE),
(1, 18, 1, TRUE),
(1, 1, 2, TRUE),
(1, 13, 2, TRUE),
(1, 15, 2, TRUE);
