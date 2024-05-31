const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');
const authenticateToken = require('../../middleware/authentication');

// Require no authentication
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Require authentication
router.use(authenticateToken);

router.get('/info', UserController.getCurrentUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;


// Functions regarding users
//     * No authentication required routes
//         - register: Register a new user
//         - login: Log in a user
//         - logout: Log out a user
//     * Authentication required routes
//         - getCurrentUser: Get the current user
//     * Admin authority required routes
//         - getAllUsers: Get all users
//         - getUserById: Get a user by ID
//         - updateUser: Update a user
//         - deleteUser: Delete a user