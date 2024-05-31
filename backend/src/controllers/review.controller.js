const ReviewModel = require('../database/models/review.model');

class ReviewController{
    async getCommentsByNovel(req, res){
        try {
            const { novelId } = req.params;
            const comments = await ReviewModel.getCommentsByNovel(novelId);
            res.json(comments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getRatingsByNovel(req, res){
        try {
            const { novelId } = req.params;
            const ratings = await ReviewModel.getRatingsByNovel(novelId);
            res.json(ratings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCommentsByUser(req, res){
        try {
            const { userId } = req.params;
            const comments = await ReviewModel.getCommentsByUser(userId);
            res.json(comments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getRatingsByUser(req, res){
        try {
            const { userId } = req.params;
            const ratings = await ReviewModel.getRatingsByUser(userId);
            res.json(ratings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAverageRatingByNovel(req, res){
        try {
            const { novelId } = req.params;
            const averageRating = await ReviewModel.getAverageRatingByNovel(novelId);
            res.json(averageRating);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addComment(req, res){
        try {
            const { novelId } = req.params;
            const { comment } = req.body;
            const userId = req.user.userId;
            await ReviewModel.addComment(novelId, userId, comment);
            res.json({ message: 'Comment added successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async setRating(req, res){
        try {
            const { novelId } = req.params;
            const { rating } = req.body;
            const userId = req.user.userId;
            await ReviewModel.setRating(novelId, userId, rating);
            res.json({ message: 'Rating set successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async editComment(req, res){
        try {
            const { commentId } = req.params;
            const { comment } = req.body;
            const userId = req.user.userId;
            await ReviewModel.editComment(commentId, comment, userId);
            res.json({ message: 'Comment edited successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeComment(req, res){
        try {
            const { commentId } = req.params;
            const userId = req.user.userId;
            await ReviewModel.removeComment(commentId, userId);
            res.json({ message: 'Comment removed successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeRating(req, res){
        try {
            const { novelId } = req.params;
            const userId = req.user.userId;
            await ReviewModel.removeRating(novelId, userId);
            res.json({ message: 'Rating removed successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getNovelsWithCommentsByUser(req, res){
        try {
            const userId = req.user.userId;
            const novels = await ReviewModel.getNovelsWithCommentsByUser(userId);
            res.json(novels);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getNovelsWithRatingsByUser(req, res){
        try {
            const userId = req.user.userId;
            const novels = await ReviewModel.getNovelsWithRatingsByUser(userId);
            res.json(novels);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllComments(req, res){
        try {
            const comments = await ReviewModel.getAllComments();
            res.json(comments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllRatings(req, res){
        try {
            const ratings = await ReviewModel.getAllRatings();
            res.json(ratings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeCommentAdmin(req, res){
        try {
            const { commentId } = req.params;
            await ReviewModel.removeComment(commentId);
            res.json({ message: 'Comment removed successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeRatingAdmin(req, res){
        try {
            const { ratingId } = req.params;
            await ReviewModel.removeRating(ratingId);
            res.json({ message: 'Rating removed successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getRatingByUser(req, res){
        try {
            const { novelId } = req.params;
            const userId = req.user.userId;
            const rating = await ReviewModel.getRatingByUser(novelId, userId);
            res.json(rating);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ReviewController();