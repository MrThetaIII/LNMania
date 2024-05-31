const UserModel = require("../database/models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

model = new UserModel();

const UserController = {
	register: async (req, res) => {
		try {
			const { name, email, password } = req.body;

			const existingUser = await model.findOne({ email });
			if (existingUser) {
				return res.status(400).json({ message: "User already exists" });
			}

			const hashedPassword = await bcrypt.hash(
				`${password}${process.env.PEPPER}`,
				parseInt(process.env.SALT)
			);

			model.save({ name, email, password: hashedPassword });

			res.status(201).json({ message: "User registered successfully" });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	},

	login: async (req, res) => {
		try {
			const { email, password } = req.body;

			const user = await model.findOne({ email });
			if (!user) {
				return res.status(401).json({ message: "Invalid credentials" });
			}

			const isPasswordValid = await bcrypt.compare(
				`${password}${process.env.PEPPER}`,
				user.password
			);
			if (!isPasswordValid) {
				return res.status(401).json({ message: "Invalid credentials" });
			}

			const token = jwt.sign(
				{ userId: user.id, userAuthority: user.authority, userName: user.name },
				process.env.JWT_SECRET,
				{ expiresIn: "7d" }
			);
			// console.log({
			// 	userId: user.id,
			// 	userAuthority: user.authority,
			// 	userName: user.name,
			// });
			res.status(200).json({ token });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	},

	getAllUsers: async (req, res) => {
		try {
			const userAuthority = req.user.userAuthority;
			if (userAuthority !== "ADMIN") {
				return res.status(403).json({ message: "Forbidden" });
			}

			const users = await model.find();
			res.status(200).json(users);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	},

	getUserById: async (req, res) => {
		try {
			const userAuthority = req.user.userAuthority;
			if (userAuthority !== "ADMIN") {
				return res.status(403).json({ message: "Forbidden" });
			}

			const userId = req.params.id;
			const user = await model.findById(userId);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			res.status(200).json(user);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	},

	getCurrentUser: async (req, res) => {
		try {
			const userId = req.user.userId;
			const user = await model.findById(userId);
			res.status(200).json({
				name: user.name,
				email: user.email,
				authority: user.authority,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	},

	updateUser: async (req, res) => {
		try {
			const userAuthority = req.user.userAuthority;
			if (userAuthority !== "ADMIN") {
				return res.status(403).json({ message: "Forbidden" });
			}

			const { name, email, password } = req.body;
			const hashedPassword = await bcrypt.hash(
				`${password}${process.env.PEPPER}`,
				parseInt(process.env.SALT)
			);

			await model.findByIdAndUpdate(req.params.id, {
				name,
				email,
				password: hashedPassword,
			});

			res.status(200).json({ message: "User updated successfully" });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	},

	deleteUser: async (req, res) => {
		try {
			const userAuthority = req.user.userAuthority;
			if (userAuthority !== "ADMIN") {
				return res.status(403).json({ message: "Forbidden" });
			}

			await model.findByIdAndDelete(req.params.id);
			res.status(200).json({ message: "User deleted successfully" });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	},
};

module.exports = UserController;
