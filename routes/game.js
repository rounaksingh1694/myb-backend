const express = require("express");
const router = express.Router();
const { check, expressValidator } = require("express-validator");
const { update } = require("lodash");

const {
	isSignedIn,
	isAuthenticated,
	isAdmin,
	getUserById,
	getGameById,
} = require("../controllers/base");

router.param("userId", getUserById);
router.param("gameId", getGameById);

const { createGame, updateGame } = require("../controllers/game");

router.post("/create/:userId", isSignedIn, isAuthenticated, createGame);
router.post("/update/:userId/:gameId", isSignedIn, isAuthenticated, updateGame);

module.exports = router;
