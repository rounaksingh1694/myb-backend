const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");

const questionSchema = new Schema(
	{
		question: {
			type: String,
			required: true,
			trim: true,
		},
		options: [
			{
				type: String,
				required: true,
				trim: true,
			},
		],
		correctOption: {
			type: Number,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
