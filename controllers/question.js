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
	sendResponse,
} = require("../controllers/base");

exports.createQuestion = (req, res) => {
	const question = {
		question: req.body.question,
		options: req.body.options,
		correctOption: req.body.correctOption,
		rating: req.body.rating,
	};
	Question.create(question, (error, newQuestion) => {
		if (error || !newQuestion) {
			return getErrorMesaageInJson(res, 400, "Cannot create new question");
		} else {
			sendResponse(res, newQuestion);
		}
	});
};
