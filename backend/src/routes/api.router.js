const review_router = require('./api.routes/review.router');
const novel_router = require('./api.routes/novel.router');
const user_router = require('./api.routes/user.router');

const { Router } = require('express');

const api_router = Router();

api_router.use('/reviews', review_router);
api_router.use('/novels', novel_router);
api_router.use('/users', user_router);

module.exports = api_router;