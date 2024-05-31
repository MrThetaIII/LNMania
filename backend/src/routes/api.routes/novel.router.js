const express = require('express');
const router = express.Router();
const novelController = require('../../controllers/novel.controller');
const authenticateToken = require('../../middleware/authentication');

// No authentication required routes
router.get('/all/alphabetically', novelController.getAllNovelsAlphabetically);
router.get('/all/by-date', novelController.getAllNovelsByDate);
router.get('/all/by-rating', novelController.getAllNovelsByRating);
router.get('/top', novelController.getTopNovels);
router.get('/search/:query', novelController.getNovelsByQuery);
router.get('/by-author/:authorId', novelController.getNovelsByAuthor);
router.get('/by-genre/:genreId', novelController.getNovelsByGenre);
router.get('/authors', novelController.getAllAuthors);
router.get('/genres', novelController.getAllGenres);
router.get('/:novelId', novelController.getNovelById);
router.get('/:novelId/genres', novelController.getGenresByNovel);
router.get('/:novelId/author', novelController.getAuthorByNovel);
router.get('/genres/:genreId', novelController.getGenreById);
router.get('/authors/:authorId', novelController.getAuthorById);

// Authentication required routes
router.use(authenticateToken);
router.get('/user/collections', novelController.getUserCollections);
router.post('/user/collections/add', novelController.addUserCollection);
router.delete('/user/collections/:collectionId', novelController.removeUserCollection);
router.get('/user/collections/novels', novelController.getNovelsInUserCollections);
router.get('/user/collections/:collectionId', novelController.getNovelsInCollectionById);
router.get('/user/favorites', novelController.getUserFavorites);
router.get('/user/favorites/check/:novelName', novelController.checkIfNovelInFavorites);
router.post('/user/favorites/add/:novelId', novelController.addNovelToFavorites);
router.post('/user/collections/:collectionId/add/:novelId', novelController.addNovelToCollection);
router.put('/user/novels/:novelId/mark-read', novelController.markNovelAsRead);
router.get('/user/novels/:novelId/is-read', novelController.checkIfNovelIsRead);
router.delete('/user/favorites/:novelId', novelController.removeNovelFromFavorites);
router.delete('/user/collections/:collectionId/remove/:novelId', novelController.removeNovelFromCollection);
router.get('/:novelId/user/collections', novelController.getNovelCollectionsByUser);
router.get('/:novelId/user/collections/:collectionId', novelController.isNovelInCollection);

// Admin authority required routes
router.use((req, res, next) => {
    if (req.user.userAuthority !== 'ADMIN') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
});

router.post('/novels/add', novelController.addNovel);
router.put('/novels/edit/:novelId', novelController.editNovel);
router.delete('/novels/remove/:novelId', novelController.removeNovel);
router.post('/authors/add', novelController.addAuthor);
router.put('/authors/edit/:authorId', novelController.editAuthor);
router.delete('/authors/remove/:authorId', novelController.removeAuthor);
router.post('/genres/add', novelController.addGenre);
router.put('/genres/edit/:genreId', novelController.editGenre);
router.delete('/genres/remove/:genreId', novelController.removeGenre);
router.post('/genres/:genreId/add/:novelId', novelController.addNovelToGenre);
router.delete('/genres/:genreId/remove/:novelId', novelController.removeNovelFromGenre);

module.exports = router;


// Functions regarding novels
//     * No authentication required routes
//         - getAllNovelsAlphabetically: Get all novels alphabetically
//         - getAllNovelsByDate: Get all novels by date
//         - getAllNovelsByRating: Get all novels by rating
//         - getNovelsByQuery: Get novels by query
//         - getNovelsByAuthor: Get novels by author
//         - getNovelsByGenre: Get novels by genre
//         - getAllAuthors: Get all authors
//         - getAllGenres: Get all genres
//         - getNovelById: Get a novel by ID
//         - getGenresByNovel: Get genres by novel
//         - getAuthorByNovel: Get author by novel
//         - getGenreById: Get a genre by ID
//         - getAuthorById: Get an author by ID
//     * Authentication required routes
//         - getUserCollections: Get user collections
//         - addUserCollection: Add a user collection
//         - removeUserCollection: Remove a user collection
//         - getNovelsInUserCollections: Get novels in user collections
//         - getNovelsInCollectionById: Get novels in a collection by ID
//         - getUserFavorites: Get user favorites
//         - checkIfNovelInFavorites: Check if a novel is in favorites
//         - addNovelToFavorites: Add a novel to favorites
//         - addNovelToCollection: Add a novel to a collection
//         - markNovelAsRead: Mark a novel as read
//         - checkIfNovelIsRead: Check if a novel is read
//         - removeNovelFromFavorites: Remove a novel from favorites
//         - removeNovelFromCollection: Remove a novel from a collection
//     * Admin authority required routes
//         - addNovel: Add a novel
//         - editNovel: Edit a novel
//         - removeNovel: Remove a novel
//         - addAuthor: Add an author
//         - editAuthor: Edit an author
//         - removeAuthor: Remove an author
//         - addGenre: Add a genre
//         - editGenre: Edit a genre
//         - removeGenre: Remove a genre
//         - addNovelToGenre: Add a novel to a genre
//         - removeNovelFromGenre: Remove a novel from a genre