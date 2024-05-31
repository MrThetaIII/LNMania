const client = require('../database.client');

class NovelModel {

    async getAllNovelsByRating() {
        const connection = await client.connect();
        try {
            const query = `
                SELECT novels.*, 
                       COALESCE(AVG(rating), 0) AS average_rating, 
                       COUNT(rating) AS rating_count 
                FROM novels 
                LEFT JOIN ratings ON novels.id = ratings.novel_id 
                GROUP BY novels.id 
                ORDER BY average_rating DESC`;
            const result = await connection.query(query);
            return result.rows;
        } finally {
            connection.release();
        }
    }

    async getTopNovels(){
        const connection = await client.connect();
        try {
            const query = `
                SELECT novels.*, 
                       COALESCE(AVG(rating), 0) AS average_rating, 
                       COUNT(rating) AS rating_count 
                FROM novels 
                LEFT JOIN ratings ON novels.id = ratings.novel_id 
                GROUP BY novels.id 
                ORDER BY average_rating DESC 
                LIMIT 5`;
            const result = await connection.query(query);
            return result.rows;
        } finally {
            connection.release();
        }
    }

    async getAllNovelsAlphabetically() {
        const connection = await client.connect();
        try {
            const query = `
                SELECT novels.*, 
                       COALESCE(AVG(rating), 0) AS average_rating, 
                       COUNT(rating) AS rating_count 
                FROM novels 
                LEFT JOIN ratings ON novels.id = ratings.novel_id 
                GROUP BY novels.id 
                ORDER BY name`;
            const result = await connection.query(query);
            return result.rows;
        } finally {
            connection.release();
        }
    }
    
    async getAllNovelsByDate() {
        const connection = await client.connect();
        try {
            const query = `
                SELECT novels.*, 
                       COALESCE(AVG(rating), 0) AS average_rating, 
                       COUNT(rating) AS rating_count 
                FROM novels 
                LEFT JOIN ratings ON novels.id = ratings.novel_id 
                GROUP BY novels.id 
                ORDER BY publication_date`;
            const result = await connection.query(query);
            return result.rows;
        } finally {
            connection.release();
        }
    }
    
    async getNovelsByQuery(query_) {
        const connection = await client.connect();
        try {
            const queryString = `%${query_}%`;
            const query = `
                SELECT novels.*, 
                       COALESCE(AVG(rating), 0) AS average_rating, 
                       COUNT(rating) AS rating_count 
                FROM novels 
                LEFT JOIN ratings ON novels.id = ratings.novel_id 
                WHERE LOWER(name) LIKE LOWER($1) 
                GROUP BY novels.id`;
            const result = await connection.query(query, [queryString]);
            return result.rows;
        } finally {
            connection.release();
        }
    }
    
    async getNovelsByAuthor(authorId) {
        const connection = await client.connect();
        try {
            const query = `
                SELECT novels.*, 
                       COALESCE(AVG(rating), 0) AS average_rating, 
                       COUNT(rating) AS rating_count 
                FROM novels 
                LEFT JOIN ratings ON novels.id = ratings.novel_id 
                WHERE author_id = $1 
                GROUP BY novels.id`;
            const result = await connection.query(query, [authorId]);
            return result.rows;
        } finally {
            connection.release();
        }
    }
    
    async getNovelsByGenre(genreId) {
        const connection = await client.connect();
        try {
            const query = `
                SELECT novels.*, 
                       COALESCE(AVG(rating), 0) AS average_rating, 
                       COUNT(rating) AS rating_count 
                FROM novels 
                LEFT JOIN ratings ON novels.id = ratings.novel_id 
                JOIN novels_genres ON novels.id = novels_genres.novel_id 
                WHERE novels_genres.genre_id = $1 
                GROUP BY novels.id`;
            const result = await connection.query(query, [genreId]);
            return result.rows;
        } finally {
            connection.release();
        }
    }
    
    async getNovelsInUserCollections(userId) {
        const connection = await client.connect();
        try {
            const query = `
                SELECT novels.*, 
                       COALESCE(AVG(rating), 0) AS average_rating, 
                       COUNT(rating) AS rating_count 
                FROM novels 
                LEFT JOIN ratings ON novels.id = ratings.novel_id 
                JOIN library ON novels.id = library.novel_id 
                WHERE library.user_id = $1 
                GROUP BY novels.id`;
            const result = await connection.query(query, [userId]);
            return result.rows;
        } finally {
            connection.release();
        }
    }
    
    async getNovelsInCollectionById(userId, collectionId) {
        const connection = await client.connect();
        try {
            const query = `
                SELECT novels.*, 
                       COALESCE(AVG(rating), 0) AS average_rating, 
                       COUNT(rating) AS rating_count 
                FROM novels 
                LEFT JOIN ratings ON novels.id = ratings.novel_id 
                JOIN library ON novels.id = library.novel_id 
                JOIN collections ON library.collection_id = collections.id 
                WHERE collections.user_id = $1 AND collections.id = $2 
                GROUP BY novels.id`;
            const result = await connection.query(query, [userId, collectionId]);
            return result.rows;
        } finally {
            connection.release();
        }
    }
    
    async getUserFavorites(userId) {
        const connection = await client.connect();
        try {
            const query = `
                SELECT novels.*, 
                       COALESCE(AVG(rating), 0) AS average_rating, 
                       COUNT(rating) AS rating_count 
                FROM novels 
                LEFT JOIN ratings ON novels.id = ratings.novel_id 
                JOIN favorites ON novels.id = favorites.novel_id 
                WHERE favorites.user_id = $1 
                GROUP BY novels.id`;
            const result = await connection.query(query, [userId]);
            return result.rows;
        } finally {
            connection.release();
        }
    }
    
    async getUserCollections(userId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT * FROM collections WHERE user_id = $1';
            const result = await connection.query(query, [userId]);
            return result.rows;
        } finally {
            connection.release();
        }
    }

    async addUserCollection(userId, name) {
        const connection = await client.connect();
        try {
            const query = 'INSERT INTO collections (user_id, name) VALUES ($1, $2) RETURNING *';
            const result = await connection.query(query, [userId, name]);
            return result.rows[0];
        } finally {
            connection.release();
        }
    }

    async removeUserCollection(userId, collectionId) {
        const connection = await client.connect();
        try {
            const query = 'DELETE FROM collections WHERE user_id = $1 AND id = $2';
            await connection.query(query, [userId, collectionId]);
        } finally {
            connection.release();
        }
    }

    async checkIfNovelInFavorites(userId, novelName) {
        const connection = await client.connect();
        try {
            const query = 'SELECT EXISTS(SELECT 1 FROM novels JOIN favorites ON novels.id = favorites.novel_id WHERE favorites.user_id = $1 AND LOWER(novels.name) = LOWER($2))';
            const result = await connection.query(query, [userId, novelName]);
            return result.rows[0].exists;
        } finally {
            connection.release();
        }
    }

    async getNovelCollectionsByUser(userId, novelId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT collections.* FROM collections JOIN library ON collections.id = library.collection_id WHERE library.user_id = $1 AND library.novel_id = $2';
            const result = await connection.query(query, [userId, novelId]);
            return result.rows;
        } finally {
            connection.release();
        }
    }

    async addNovelToFavorites(userId, novelId) {
        const connection = await client.connect();
        try {
            const query = 'INSERT INTO favorites (user_id, novel_id) VALUES ($1, $2)';
            await connection.query(query, [userId, novelId]);
        } finally {
            connection.release();
        }
    }

    async addNovelToCollection(userId, collectionId, novelId) {
        const connection = await client.connect();
        try {
            const query = 'INSERT INTO library (user_id, novel_id, collection_id) VALUES ($1, $2, $3)';
            await connection.query(query, [userId, novelId, collectionId]);
        } finally {
            connection.release();
        }
    }

    async markNovelAsRead(userId, novelId) {
        const connection = await client.connect();
        try {
            const query = 'UPDATE library SET have_been_read = TRUE WHERE user_id = $1 AND novel_id = $2';
            await connection.query(query, [userId, novelId]);
        } finally {
            connection.release();
        }
    }

    async checkIfNovelIsRead(userId, novelId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT have_been_read FROM library WHERE user_id = $1 AND novel_id = $2';
            const result = await connection.query(query, [userId, novelId]);
            return result.rows.length > 0;
        } finally {
            connection.release();
        }
    }

    async isNovelInCollection(userId, collectionId, novelId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT * FROM library WHERE user_id = $1 AND collection_id = $2 AND novel_id = $3';
            const result = await connection.query(query, [userId, collectionId, novelId]);
            console.log(result.rows);
            return result.rows.length > 0;
        } finally {
            connection.release();
        }
    }

    async removeNovelFromFavorites(userId, novelId) {
        const connection = await client.connect();
        try {
            const query = 'DELETE FROM favorites WHERE user_id = $1 AND novel_id = $2';
            await connection.query(query, [userId, novelId]);
        } finally {
            connection.release();
        }
    }

    async removeNovelFromCollection(userId, collectionId, novelId) {
        const connection = await client.connect();
        try {
            const query = 'DELETE FROM library WHERE user_id = $1 AND collection_id = $2 AND novel_id = $3';
            await connection.query(query, [userId, collectionId, novelId]);
        } finally {
            connection.release();
        }
    }

    async addNovel(novelData) {
        const connection = await client.connect();
        try {
            const { name, authorId, abstract, coverImage, publicationDate } = novelData;
            const query = 'INSERT INTO novels (name, author_id, abstract, cover_image, publication_date) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const values = [name, authorId, abstract, coverImage, publicationDate];
            const result = await connection.query(query, values);
            return result.rows[0];
        } finally {
            connection.release();
        }
    }

    async editNovel(novelId, novelData) {
        const connection = await client.connect();
        try {
            const { name, authorId, abstract, coverImage, publicationDate } = novelData;
            const query = 'UPDATE novels SET name = $1, author_id = $2, abstract = $3, cover_image = $4, publication_date = $5 WHERE id = $6 RETURNING *';
            const values = [name, authorId, abstract, coverImage, publicationDate, novelId];
            const result = await connection.query(query, values);
            return result.rows[0];
        } finally {
            connection.release();
        }
    }

    async removeNovel(novelId) {
        const connection = await client.connect();
        try {
            await connection.query('BEGIN');
            await connection.query('DELETE FROM ratings WHERE novel_id = $1', [novelId]);
            await connection.query('DELETE FROM favorites WHERE novel_id = $1', [novelId]);
            await connection.query('DELETE FROM library WHERE novel_id = $1', [novelId]);
            await connection.query('DELETE FROM novels_genres WHERE novel_id = $1', [novelId]);
            await connection.query('DELETE FROM novels WHERE id = $1', [novelId]);
            await connection.query('COMMIT');
        } catch (error) {
            await connection.query('ROLLBACK');
            throw error;
        } finally {
            connection.release();
        }
    }

    async getAllAuthors() {
        const connection = await client.connect();
        try {
            const query = 'SELECT * FROM authors';
            const result = await connection.query(query);
            return result.rows;
        } finally {
            connection.release();
        }
    }

    async addAuthor(authorName) {
        const connection = await client.connect();
        try {
            const query = 'INSERT INTO authors (name) VALUES ($1) RETURNING *';
            const result = await connection.query(query, [authorName]);
            return result.rows[0];
        }
        finally {
            connection.release();
        }
    }

    async editAuthor(authorId, authorName) {
        const connection = await client.connect();
        try {
            const query = 'UPDATE authors SET name = $1 WHERE id = $2 RETURNING *';
            const result = await connection.query(query, [authorName, authorId]);
            return result.rows[0];
        } finally {
            connection.release();
        }
    }

    async removeAuthor(authorId) {
        const connection = await client.connect();
        try {
            await connection.query('BEGIN');
            await connection.query('DELETE FROM novels WHERE author_id = $1', [authorId]);
            await connection.query('DELETE FROM authors WHERE id = $1', [authorId]);
            await connection.query('COMMIT');
        } catch (error) {
            await connection.query('ROLLBACK');
            throw error;
        } finally {
            connection.release();
        }
    }

    async getAllGenres() {
        const connection = await client.connect();
        try {
            const query = 'SELECT * FROM genres';
            const result = await connection.query(query);
            return result.rows;
        } finally {
            connection.release();
        }
    }

    async addGenre(genreName) {
        const connection = await client.connect();
        try {
            const query = 'INSERT INTO genres (name) VALUES ($1) RETURNING *';
            const result = await connection.query(query, [genreName]);
            return result.rows[0];
        }
        finally {
            connection.release();
        }
    }

    async editGenre(genreId, genreName) {
        const connection = await client.connect();
        try {
            const query = 'UPDATE genres SET name = $1 WHERE id = $2 RETURNING *';
            const result = await connection.query(query, [genreName, genreId]);
            return result.rows[0];
        } finally {
            connection.release();
        }
    }

    async removeGenre(genreId) {
        const connection = await client.connect();
        try {
            await connection.query('BEGIN');
            await connection.query('DELETE FROM novels_genres WHERE genre_id = $1', [genreId]);
            await connection.query('DELETE FROM genres WHERE id = $1', [genreId]);
            await connection.query('COMMIT');
        } catch (error) {
            await connection.query('ROLLBACK');
            throw error;
        } finally {
            connection.release();
        }
    }

    async addNovelToGenre(genreId, novelId) {
        const connection = await client.connect();
        try {
            const query = 'INSERT INTO novels_genres (novel_id, genre_id) VALUES ($1, $2)';
            await connection.query(query, [novelId, genreId]);
        } finally {
            connection.release();
        }
    }

    async removeNovelFromGenre(genreId, novelId) {
        const connection = await client.connect();
        try {
            const query = 'DELETE FROM novels_genres WHERE genre_id = $1 AND novel_id = $2';
            await connection.query(query, [genreId, novelId]);
        } finally {
            connection.release();
        }
    }

    async getNovelById(novelId) {
        const connection = await client.connect();
        try {
            const query = `
                SELECT novels.*, 
                    COALESCE(AVG(rating), 0) AS average_rating, 
                    COUNT(rating) AS rating_count 
                FROM novels 
                LEFT JOIN ratings ON novels.id = ratings.novel_id 
                GROUP BY novels.id
                HAVING novels.id = $1`;
            const result = await connection.query(query, [novelId]);
            return result.rows[0];
        } finally {
            connection.release();
        }
    }

    async getGenresByNovel(novelId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT genres.* FROM genres JOIN novels_genres ON genres.id = novels_genres.genre_id WHERE novels_genres.novel_id = $1';
            const result = await connection.query(query, [novelId]);
            return result.rows;
        } finally {
            connection.release();
        }
    }

    async getAuthorByNovel(novelId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT authors.* FROM authors JOIN novels ON authors.id = novels.author_id WHERE novels.id = $1';
            const result = await connection.query(query, [novelId]);
            return result.rows[0];
        } finally {
            connection.release();
        }
    }

    async getGenreById(genreId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT * FROM genres WHERE id = $1';
            const result = await connection.query(query, [genreId]);
            return result.rows[0];
        } finally {
            connection.release();
        }
    }

    async getAuthorById(authorId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT * FROM authors WHERE id = $1';
            const result = await connection.query(query, [authorId]);
            return result.rows[0];
        } finally {
            connection.release();
        }
    }

    async checkGenreExists(genreId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT EXISTS(SELECT 1 FROM genres WHERE id = $1)';
            const result = await connection.query(query, [genreId]);
            return result.rows[0].exists;
        } finally {
            connection.release();
        }
    }

    async checkAuthorExists(authorId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT EXISTS(SELECT 1 FROM authors WHERE id = $1)';
            const result = await connection.query(query, [authorId]);
            return result.rows[0].exists;
        } finally {
            connection.release();
        }
    }
}

module.exports = new NovelModel();
