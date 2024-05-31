CREATE TABLE collections
(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO collections (user_id, name) VALUES
(1, 'Best reincarnations'),
(1, 'Cosy and Quiet');