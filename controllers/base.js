const {
	check,
	expressValidator,
	validationResult,
} = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const User = require("../models/user");
const Game = require("../models/game");
const Question = require("../models/question");

// Custom Middlewares
exports.isSignedIn = expressJwt({
	secret: process.env.SECRET,
	requestProperty: "auth",
	algorithms: ["HS256"],
});

exports.isAuthenticated = (req, res, next) => {
	let isAuthenticated =
		req.profile && req.auth && req.profile._id == req.auth._id;
	console.log("AUTHORIZATION", req.profile, req.auth);
	if (!isAuthenticated) {
		return this.getErrorMessageInJson(res, 400, "Access denied");
	}
	next();
};

exports.isAdmin = (req, res, next) => {
	let isAdmin = req.profile.role === 1;
	if (!isAdmin) {
		return this.getErrorMessageInJson(res, 400, "Access denied NOT an ADMIN");
	}
	next();
};

exports.getErrorMessageInJson = (res, statusCode, errorMessage) => {
	return res.status(statusCode).json({ error: errorMessage });
};

const generateAccessToken = (userId) => {
	return jwt.sign({ _id: userId }, process.env.SECRET);
};

exports.sendResponse = (res, json) => {
	return res.status(200).json(json);
};

exports.sendUserResponse = (res, user) => {
	const accessToken = generateAccessToken(user._id);
	const newUser = user;
	newUser.encryptedPassword = undefined;
	newUser.salt = undefined;
	newUser.__v = undefined;
	newUser.createdAt = undefined;
	newUser.updatedAt = undefined;
	return res.status(200).json({
		accessToken: accessToken,
		user: newUser,
	});
};

// Params
exports.getUserById = (req, res, next, userId) => {
	User.findById(userId).exec((error, user) => {
		if (error || !user) {
			return this.getErrorMessageInJson(res, 400, "User does not exist");
		}
		user
			.populate("games")
			.execPopulate()
			.then(() => {
				console.log("USERBY ID", user);
				req.profile = user;
				next();
			});
	});
};

exports.getGameById = (req, res, next, gameId) => {
	Game.findById(gameId).exec((error, game) => {
		if (error || !game) {
			return this.getErrorMessageInJson(res, 400, "Cannot get gameById");
		}
		game
			.populate("user")
			.populate("questions")
			.populate("CorrectQuestions")
			.execPopulate()
			.then(() => {
				console.log("GAME BY ID", game);
				req.game = game;
				next();
			});
	});
};

exports.getQuestionById = (req, res, next, questionId) => {
	Question.findById(questionId).exec((error, question) => {
		if (error || !question) {
			return this.getErrorMessageInJson(res, 400, "question does not exist");
		}
		question.execPopulate().then(() => {
			console.log("question BY ID", question);
			req.question = question;
			next();
		});
	});
};

// Constant variables
