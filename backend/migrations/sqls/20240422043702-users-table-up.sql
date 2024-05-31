CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    authority VARCHAR(255) NOT NULL DEFAULT 'USER' CHECK (authority IN ('USER', 'ADMIN'))
);

INSERT INTO USERS (name, email, password, authority) VALUES 
('Admin', 'admin@admin.admin', '$2b$11$TjzABTAdyIGXlM8Ejgeh.OCJaahKojC0P35.ydljQVPpCegV5mVgC', 'ADMIN');
-- password: Admin