const NovelModel = require('../database/models/novel.model');

class NovelController {
    async getAllNovelsAlphabetically(req, res) {
        try {
            const novels = await NovelModel.getAllNovelsAlphabetically();
            res.json(novels);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllNovelsByDate(req, res) {
        try {
            const novels = await NovelModel.getAllNovelsByDate();
            res.json(novels);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllNovelsByRating(req, res) {
        try {
            const novels = await NovelModel.getAllNovelsByRating();
            res.json(novels);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getTopNovels(req, res) {
        try {
            const novels = await NovelModel.getTopNovels();
            res.json(novels);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getNovelsByQuery(req, res) {
        const query = req.params.query;
        try {
            const novels = await NovelModel.getNovelsByQuery(query);
            res.json(novels);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getNovelsByAuthor(req, res) {
        const authorId = req.params.authorId;
        try {
            const novels = await NovelModel.getNovelsByAuthor(authorId);
            res.json(novels);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getNovelsByGenre(req, res) {
        const genreId = req.params.genreId;
        try {
            const novels = await NovelModel.getNovelsByGenre(genreId);
            res.json(novels);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserCollections(req, res) {
        const userId = req.user.userId;
        try {
            const collections = await NovelModel.getUserCollections(userId);
            res.json(collections);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addUserCollection(req, res) {
        const userId = req.user.userId;
        const { name } = req.body;
        try {
            const collection = await NovelModel.addUserCollection(userId, name);
            res.status(201).json(collection);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeUserCollection(req, res) {
        const userId = req.user.userId;
        const collectionId = req.params.collectionId;
        try {
            await NovelModel.removeUserCollection(userId, collectionId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getNovelsInUserCollections(req, res) {
        const userId = req.user.userId;
        try {
            const novels = await NovelModel.getNovelsInUserCollections(userId);
            res.json(novels);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getNovelsInCollectionById(req, res) {
        const userId = req.user.userId;
        const collectionId = req.params.collectionId;
        try {
            const novels = await NovelModel.getNovelsInCollectionById(userId, collectionId);
            res.json(novels);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserFavorites(req, res) {
        const userId = req.user.userId;
        try {
            const favorites = await NovelModel.getUserFavorites(userId);
            res.json(favorites);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getNovelCollectionsByUser(req, res) {
        const novelId = req.params.novelId;
        const userId = req.user.userId;
        try {
            const collections = await NovelModel.getNovelCollectionsByUser(novelId, userId);
            res.json(collections);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async checkIfNovelInFavorites(req, res) {
        const userId = req.user.userId;
        const novelName = req.params.novelName;
        try {
            const isInFavorites = await NovelModel.checkIfNovelInFavorites(userId, novelName);
            res.json({ isInFavorites });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addNovelToFavorites(req, res) {
        const userId = req.user.userId;
        const novelId = req.params.novelId;
        try {
            await NovelModel.addNovelToFavorites(userId, novelId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addNovelToCollection(req, res) {
        const userId = req.user.userId;
        const collectionId = req.params.collectionId;
        const novelId = req.params.novelId;
        try {
            await NovelModel.addNovelToCollection(userId, collectionId, novelId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async markNovelAsRead(req, res) {
        const userId = req.user.userId;
        const novelId = req.params.novelId;
        try {
            await NovelModel.markNovelAsRead(userId, novelId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async checkIfNovelIsRead(req, res) {
        const userId = req.user.userId;
        const novelId = req.params.novelId;
        try {
            const isRead = await NovelModel.checkIfNovelIsRead(userId, novelId);
            res.json({ isRead });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async isNovelInCollection(req, res) {
        const userId = req.user.userId;
        const novelId = req.params.novelId;
        const collectionId = req.params.collectionId;
        try {
            const isInCollection = await NovelModel.isNovelInCollection(userId, novelId, collectionId);
            res.json({ isInCollection });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeNovelFromFavorites(req, res) {
        const userId = req.user.userId;
        const novelId = req.params.novelId;
        try {
            await NovelModel.removeNovelFromFavorites(userId, novelId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeNovelFromCollection(req, res) {
        const userId = req.user.userId;
        const collectionId = req.params.collectionId;
        const novelId = req.params.novelId;
        try {
            await NovelModel.removeNovelFromCollection(userId, collectionId, novelId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addNovel(req, res) {
        try {
            if (!req.body.name || !req.body.authorId || !req.body.abstract || !req.body.publicationDate) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            const authorExists = await NovelModel.checkAuthorExists(req.body.authorId);
            if (!authorExists) {
                return res.status(404).json({ message: 'Author not found' });
            }
            const novel = await NovelModel.addNovel(req.body);
            res.status(201).json(novel);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async editNovel(req, res) {
        const novelId = req.params.novelId;
        const { name, authorId, abstract, coverImage, publicationDate } = req.body;
        try {
            const authorExists = await NovelModel.checkAuthorExists(authorId);
            if (!authorExists) {
                return res.status(404).json({ message: 'Author not found' });
            }
            const novel = await NovelModel.editNovel(novelId, { name, authorId, abstract, coverImage, publicationDate });
            res.json(novel);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeNovel(req, res) {
        const novelId = req.params.novelId;
        try {
            await NovelModel.removeNovel(novelId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllAuthors(req, res) {
        try {
            const authors = await NovelModel.getAllAuthors();
            res.json(authors);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addAuthor(req, res) {
        const { name } = req.body;
        try {
            const author = await NovelModel.addAuthor(name);
            res.status(201).json(author);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async editAuthor(req, res) {
        const authorId = req.params.authorId;
        const { name } = req.body;
        try {
            const author = await NovelModel.editAuthor(authorId, name);
            res.json(author);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeAuthor(req, res) {
        const authorId = req.params.authorId;
        try {
            await NovelModel.removeAuthor(authorId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllGenres(req, res) {
        try {
            const genres = await NovelModel.getAllGenres();
            res.json(genres);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addGenre(req, res) {
        const { name } = req.body;
        try {
            const genre = await NovelModel.addGenre(name);
            res.status(201).json(genre);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async editGenre(req, res) {
        const genreId = req.params.genreId;
        const { name } = req.body;
        try {
            const genre = await NovelModel.editGenre(genreId, name);
            res.json(genre);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeGenre(req, res) {
        const genreId = req.params.genreId;
        try {
            await NovelModel.removeGenre(genreId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addNovelToGenre(req, res) {
        const genreId = req.params.genreId;
        const novelId = req.params.novelId;
        try {
            await NovelModel.addNovelToGenre(genreId, novelId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeNovelFromGenre(req, res) {
        const genreId = req.params.genreId;
        const novelId = req.params.novelId;
        try {
            await NovelModel.removeNovelFromGenre(genreId, novelId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getNovelById(req, res) {
        const novelId = req.params.novelId;
        try {
            const novel = await NovelModel.getNovelById(novelId);
            res.json(novel);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getGenresByNovel(req, res) {
        const novelId = req.params.novelId;
        try {
            const genres = await NovelModel.getGenresByNovel(novelId);
            res.json(genres);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAuthorByNovel(req, res) {
        const novelId = req.params.novelId;
        try {
            const author = await NovelModel.getAuthorByNovel(novelId);
            res.json(author);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getGenreById(req, res) {
        const genreId = req.params.genreId;
        try {
            const genre = await NovelModel.getGenreById(genreId);
            res.json(genre);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAuthorById(req, res) {
        const authorId = req.params.authorId;
        try {
            const author = await NovelModel.getAuthorById(authorId);
            res.json(author);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new NovelController();
