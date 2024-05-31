CREATE TABLE genres
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO genres (name) VALUES 
('Reincarnation'),
('Fantasy'),
('Adventure'),
('Magic'),
('Romance'),
('Slice of Life'),
('Action'),
('Comedy'),
('Drama'),
('Mystery'),
('Horror'),
('Psychological'),
('Thriller'),
('Sci-Fi'),
('Historical'),
('Supernatural'),
('School'),
('Martial Arts'),
('Chinese Novel'),
('Korean Novel'),
('Japanese Novel');
