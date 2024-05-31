CREATE TABLE novels_genres
(
    novel_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (novel_id, genre_id),
    FOREIGN KEY (novel_id) REFERENCES novels (id),
    FOREIGN KEY (genre_id) REFERENCES genres (id)
);

INSERT INTO novels_genres (novel_id, genre_id) VALUES 
(1, 1), (1, 4), (1, 21),
(2, 1), (2, 4), (2, 3), (2, 21),
(3, 3), (3, 18), (3, 21),
(4, 1), (4, 4), (4, 21),
(5, 1), (5, 4), (5, 21),
(6, 4), (6, 21),
(7, 4), (7, 18), (7, 21),
(8, 1), (8, 4), (8, 21),
(9, 4), (9, 21),
(10, 1), (10, 4), (10, 21),
(11, 7), (11, 20),
(12, 1), (12, 4), (12, 21),
(13, 1), (13, 4), (13, 21),
(14, 1), (14, 4), (14, 19),
(15, 4), (15, 21),
(16, 4), (16, 17), (16, 21),
(17, 1), (17, 4), (17, 21),
(18, 1), (18, 4), (18, 18), (18, 21);