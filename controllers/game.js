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
const { request } = require("express");

exports.createGame = (req, res) => {
	const user = req.profile;
	const userRating = req.profile.rating;
	const totalTime = req.body.totalTime;
	const totalQuestions = req.body.totalQuestions;
	const thresholdScore = req.body.thresholdScore;
	const questionRating =
		(userRating / 100) * 100 > 0 ? (userRating / 100) * 100 : 100;
	console.log("QUESTION RATING", questionRating);
	var questions = [];

	Question.aggregate([
		{ $match: { rating: { $lte: questionRating } } },
		{ $sample: { size: totalQuestions } },
	]).exec((err, nQuestions) => {
		if (err || !questions) {
			console.log("ERROR CREATE GAME", err);
			return getErrorMessageInJson(res, 400, "Cannot create a game");
		}
		questions = nQuestions;
		console.log("QUESTIONS ", questions);

		const game = {
			user: user._id,
			totalTime: totalTime,
			totalQuestions: totalQuestions,
			totalPoints: totalQuestions * 2,
			questions: questions,
			thresholdScore: thresholdScore,
		};

		Game.create(game, (err, newGame) => {
			if (err || !newGame) {
				console.log("ERROR IN GAME CREATE", err);
				return getErrorMessageInJson(res, 400, "Cannot create a game");
			}

			User.findOneAndUpdate(
				{ _id: user._id },
				{ $push: { games: newGame._id } },
				{ new: true },
				(err, newUser) => {
					if (err || !newUser) {
						return getErrorMesaageInJson(res, 400, "Cannot create a game");
					}
					newGame
						.populate("questions")
						.execPopulate()
						.then(() => sendResponse(res, newGame));
				}
			);
		});
	});
};

exports.updateGame = (req, res) => {
	const game = req.body;
	const gameId = req.game._id;

	Game.findByIdAndUpdate(
		{ _id: gameId },
		{
			$set: {
				correctQuestions: game.correctQuestions,
				scoredPoints: game.scoredPoints,
				completedTime: game.completedTime,
				resigned: game.resigned,
				rating: game.rating,
			},
		},
		{ new: true },
		(err, newGame) => {
			if (err || !newGame) {
				console.log("ERROR IN GAME UPDATE", err);
				return getErrorMessageInJson(res, 400, "Cannot update a game");
			}
			User.findOneAndUpdate(
				{ _id: req.profile._id },
				{ $set: { rating: game.rating } },
				{ new: true },
				(error, newUser) => {
					if (error) {
						console.error("ERROR IN UPDATING USER UPDATING GAME", error);
						return getErrorMesaageInJson(
							res,
							400,
							"Error in updating user info"
						);
					}
					if (!newUser)
						return getErrorMesaageInJson(res, 400, "Cannot update the user");

					newGame.execPopulate().then(() => sendResponse(res, newGame));
				}
			);
		}
	);
};
