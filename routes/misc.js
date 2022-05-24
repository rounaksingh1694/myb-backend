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

const { getAllAvatars } = require("../controllers/misc");

router.get("/avatars/get", getAllAvatars);

module.exports = router;
