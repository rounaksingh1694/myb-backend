const User = require("../models/user");
const Game = require("../models/game");
const Question = require("../models/question");
const {
	check,
	expressValidator,
	validationResult,
} = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const {
	isSignedIn,
	isAuthenticated,
	getErrorMessageInJson,
	FOLLOW_FIELDS_TO_POPULATE,
	sendUserResponse,
} = require("../controllers/base");

exports.signUp = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("ERRORSSS", errors);
		return res.status(401).json({
			error: errors.array()[0].msg,
			parameter: errors.array()[0].param,
		});
	}

	const user = new User(req.body);

	user.save((error, user) => {
		if (error || !user) {
			console.error("ERROR SIGN UP", error);
			return getErrorMessageInJson(res, 400, "This username already exists.");
		}
		sendUserResponse(res, user);
	});
};

exports.signIn = (req, res) => {
	const { username, password } = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("ERRORSSS", errors);
		return res.status(401).json({
			error: errors.array()[0].msg,
			parameter: errors.array()[0].param,
		});
	}

	User.findOne({ username }, (error, user) => {
		if (error || !user) {
			return getErrorMessageInJson(res, 400, "User does not exist");
		}

		if (!user.authenticate(password)) {
			return getErrorMessageInJson(res, 400, "Username & password don't match");
		}

		sendUserResponse(res, user);
	});
};

exports.signOut = (req, res) => {
	res.status(200).json({
		message: "Sign out successfull",
	});
};
