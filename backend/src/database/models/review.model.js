const client = require('../database.client');

class ReviewModel {

    async getCommentsByNovel(novelId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT comments.*, users.name AS user_name FROM comments JOIN users ON comments.user_id = users.id WHERE novel_id = $1';
            const { rows } = await connection.query(query, [novelId]);
            return rows;
        } finally {
            connection.release();
        }
    }

    async getRatingsByNovel(novelId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT ratings.*, users.name AS user_name FROM ratings JOIN users ON ratings.user_id = users.id WHERE novel_id = $1';
            const { rows } = await connection.query(query, [novelId]);
            return rows;
        } finally {
            connection.release();
        }
    }

    async getCommentsByUser(userId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT comments.*, novels.name AS user_name FROM comments JOIN novels ON comments.novel_id = novels.id WHERE user_id = $1';
            const { rows } = await connection.query(query, [userId]);
            return rows;
        } finally {
            connection.release();
        }
    }

    async getRatingsByUser(userId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT ratings.*, novels.name AS user_name FROM ratings JOIN novels ON ratings.novel_id = novels.id WHERE user_id = $1';
            const { rows } = await connection.query(query, [userId]);
            return rows;
        } finally {
            connection.release();
        }
    }

    async getAverageRatingByNovel(novelId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT AVG(rating) FROM ratings WHERE novel_id = $1';
            const { rows } = await connection.query(query, [novelId]);
            return rows[0];
        } finally {
            connection.release();
        }
    }

    async addComment(novelId, userId, comment) {
        const connection = await client.connect();
        try {
            const query = 'INSERT INTO comments (novel_id, user_id, content) VALUES ($1, $2, $3)';
            await connection.query(query, [novelId, userId, comment]);
        } finally {
            connection.release();
        }
    }

    async setRating(novelId, userId, rating) {
        const connection = await client.connect();
        try {
            const query = 'INSERT INTO ratings (novel_id, user_id, rating) VALUES ($1, $2, $3)';
            await connection.query(query, [novelId, userId, rating]);
        } finally {
            connection.release();
        }
    }

    async editComment(commentId, comment, userId) {
        const connection = await client.connect();
        try {
            const query = 'UPDATE comments SET comment = $1 WHERE id = $2 AND user_id = $3';
            await connection.query(query, [comment, commentId]);
        } finally {
            connection.release();
        }
    }

    async removeComment(commentId) {
        const connection = await client.connect();
        try {
            const query = 'DELETE FROM comments WHERE id = $1';
            await connection.query(query, [commentId]);
        } finally {
            connection.release();
        }
    }

    async removeRating(ratingId) {
        const connection = await client.connect();
        try {
            const query = 'DELETE FROM ratings WHERE id = $1';
            await connection.query(query, [ratingId]);
        } finally {
            connection.release();
        }
    }

    async getNovelsWithCommentsByUser(userId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT * FROM novels WHERE id IN (SELECT novel_id FROM comments WHERE user_id = $1)';
            const { rows } = await connection.query(query, [userId]);
            return rows;
        } finally {
            connection.release();
        }
    }

    async getNovelsWithRatingsByUser(userId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT * FROM novels WHERE id IN (SELECT novel_id FROM ratings WHERE user_id = $1)';
            const { rows } = await connection.query(query, [userId]);
            return rows;
        } finally {
            connection.release();
        }
    }

    async getAllComments() {
        const connection = await client.connect();
        try {
            const query = 'SELECT *, users.name FROM comments JOIN users ON comments.user_id = users.id';
            const { rows } = await connection.query(query);
            return rows;
        } finally {
            connection.release();
        }
    }

    async getAllRatings() {
        const connection = await client.connect();
        try {
            const query = 'SELECT * FROM ratings';
            const { rows } = await connection.query(query);
            return rows;
        } finally {
            connection.release();
        }
    }

    async removeComment(commentId, userId) {
        const connection = await client.connect();
        try {
            const query = 'DELETE FROM comments WHERE id = $1 AND user_id = $2';
            await connection.query(query, [commentId, userId]);
        } finally {
            connection.release();
        }
    }

    async removeRating(novelId, userId) {
        const connection = await client.connect();
        try {
            const query = 'DELETE FROM ratings WHERE novel_id = $1 AND user_id = $2';
            await connection.query(query, [novelId, userId]);
        } finally {
            connection.release();
        }
    }

    async getRatingByUser(novelId, userId) {
        const connection = await client.connect();
        try {
            const query = 'SELECT * FROM ratings WHERE novel_id = $1 AND user_id = $2';
            const { rows } = await connection.query(query, [novelId, userId]);
            return rows[0];
        } finally {
            connection.release();
        }
    }
}

module.exports = new ReviewModel();