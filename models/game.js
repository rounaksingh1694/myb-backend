const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");

const gameSchema = new Schema(
	{
		user: {
			type: ObjectId,
			ref: "User",
		},
		totalTime: {
			type: Number,
			required: true,
		},
		completedTime: {
			type: Number,
			default: 0,
		},
		totalPoints: {
			type: Number,
			required: true,
		},
		scoredPoints: {
			type: Number,
			default: 0,
		},
		questions: [
			{
				type: ObjectId,
				ref: "Question",
			},
		],
		totalQuestions: {
			type: Number,
			required: true,
		},
		correctQuestions: [
			{
				type: ObjectId,
				ref: "Question",
			},
		],
		thresholdScore: {
			type: Number,
			required: true,
		},
		resigned: {
			type: Boolean,
			default: false,
		},
		rating: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
