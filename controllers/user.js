const User = require("../models/user");
const Game = require("../models/game");
const Question = require("../models/question");

const {
	isSignedIn,
	isAuthenticated,
	getErrorMessageInJson,
	sendUserResponse,
	sendResponse,
} = require("../controllers/base");

exports.getUserDetails = (req, res) => {
	User.findOne({ _id: req.profile._id }, (err, user) => {
		if (!user) {
			return getErrorMessageInJson(res, 400, "No user present");
		}
		if (err) {
			return getErrorMessageInJson(res, 400, "Cannot get user");
		}
		user
			.populate("games")
			.execPopulate()
			.then(() => {
				const { _id, avatar, name, username, rating, games } = user;
				sendResponse(res, {
					user: {
						_id,
						avatar,
						name,
						username,
						rating,
						games,
					},
				});
			});
	});
};

exports.getUserGames = (req, res) => {
	User.findOne({ _id: req.profile._id }, (err, user) => {
		if (!user) {
			return getErrorMessageInJson(res, 400, "No user present");
		}
		if (err) {
			return getErrorMessageInJson(res, 400, "Cannot get user");
		}
		user
			.populate("games")
			.execPopulate()
			.then(() => {
				const { _id, avatar, name, username, rating, games } = user;
				sendResponse(res, {
					_id,
					games,
				});
			});
	});
};

exports.getUserAvatar = (req, res) => {
	sendResponse(res, {
		_id: req.profile._id,
		avatar: req.profile.avatar,
	});
};

exports.getLeaderboard = (req, res) => {
	User.find()
		.sort({ rating: -1 })
		.select("_id name username rating totalGames")
		.exec((err, users) => {
			if (!users) {
				return getErrorMessageInJson(res, 400, "No user present");
			}
			if (err) {
				return getErrorMessageInJson(res, 400, "Cannot get users");
			}
			console.log("USERS", users);
			sendResponse(res, users);
		});
};
