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

const {
	getUserDetails,
	getUserAvatar,
	getUserGames,
	getLeaderboard,
} = require("../controllers/user");

router.get("/get/:userId", isSignedIn, isAuthenticated, getUserDetails);
router.get("/avatar/:userId", isSignedIn, isAuthenticated, getUserAvatar);
router.get("/games/:userId", isSignedIn, isAuthenticated, getUserGames);
router.get("/leaderboard/:userId", isSignedIn, isAuthenticated, getLeaderboard);

module.exports = router;
