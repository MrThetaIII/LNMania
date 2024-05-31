const express = require('express');
const router = express.Router();
const reviewController = require('../../controllers/review.controller');
const authenticateToken = require('../../middleware/authentication');

// No authentication required routes
router.get('/novel/:novelId/comments', reviewController.getCommentsByNovel);
router.get('/novel/:novelId/ratings', reviewController.getRatingsByNovel);
router.get('/novel/:novelId/rating', reviewController.getAverageRatingByNovel);

// Authentication required routes
router.use(authenticateToken);
router.post('/novel/:novelId/comment', reviewController.addComment);
router.post('/novel/:novelId/rate', reviewController.setRating);
router.put('/comment/:commentId', reviewController.editComment);
router.delete('/comment/:commentId', reviewController.removeComment);
router.delete('/rating/:novelId', reviewController.removeRating);
router.get('/user/comments/novels', reviewController.getNovelsWithCommentsByUser);
router.get('/user/ratings/novels', reviewController.getNovelsWithRatingsByUser);
router.get('/novel/:novelId/user/rating', reviewController.getRatingByUser);

// Admin authority required routes
router.use((req, res, next) => {
    if (req.user.userAuthority !== 'ADMIN') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
});

router.get('/comments', reviewController.getAllComments);
router.get('/ratings', reviewController.getAllRatings);
router.delete('/comments/remove/:commentId', reviewController.removeCommentAdmin);
router.delete('/ratings/remove/:ratingId', reviewController.removeRatingAdmin);
router.get('/user/:userId/comments', reviewController.getCommentsByUser);
router.get('/user/:userId/ratings', reviewController.getRatingsByUser);

module.exports = router;

// Functions regarding reviews
//     * No authentication required routes
//         - getCommentsByNovel: Get comments by novel
//         - getRatingsByNovel: Get ratings by novel
//         - getAverageRatingByNovel: Get average rating by novel
//     * Authentication required routes
//         - addComment: Add a comment
//         - setRating: Set a rating
//         - editComment: Edit a comment
//         - removeComment: Remove a comment
//         - removeRating: Remove a rating
//         - getNovelsWithCommentsByUser: Get novels with comments by user
//         - getNovelsWithRatingsByUser: Get novels with ratings by user
//     * Admin authority required routes
//         - getAllComments: Get all comments
//         - getAllRatings: Get all ratings
//         - removeCommentAdmin: Remove a comment as an admin
//         - removeRatingAdmin: Remove a rating as an admin
//         - getCommentsByUser: Get comments by user
//         - getRatingsByUser: Get ratings by user