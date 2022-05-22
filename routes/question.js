const express = require("express");
const router = express.Router();
const { check, expressValidator } = require("express-validator");

const {
	isSignedIn,
	isAuthenticated,
	isAdmin,
	getUserById,
	getGameById,
} = require("../controllers/base");

router.param("userId", getUserById);

const { createQuestion } = require("../controllers/question");

router.post("/create/:userId", isSignedIn, isAuthenticated, createQuestion);

module.exports = router;
